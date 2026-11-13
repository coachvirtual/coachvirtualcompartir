"""Read-only source comparison; does not rebuild or alter application content."""
from pathlib import Path
from collections import Counter
from io import BytesIO
import hashlib, json, math, re, zipfile
import xml.etree.ElementTree as ET
import pymupdf as fitz
from PIL import Image, ImageChops, ImageStat

root = Path(__file__).resolve().parents[2]
audit = root / 'audit/conexiones'
raw = (root / 'js/creo-curriculum-data.js').read_text(encoding='utf8')
data = json.loads(raw.split('=', 1)[1].strip().removesuffix(';'))
norm = lambda s: re.sub(r'\s+', '', s)
report = {'sources': [], 'primary': [], 'secondary': [], 'guide': {}, 'errors': []}
def check(condition, message):
    if not condition: report['errors'].append(message)
def image_error(a, b):
    check(a.size == b.size, 'Image dimension mismatch')
    if a.size != b.size: return None
    return round(sum(ImageStat.Stat(ImageChops.difference(a.convert('RGB'), b.convert('RGB'))).mean)/3, 3)

files = ['Malla COMPARTIR primaria CREO 2026.pdf', 'Malla PDC y PAR secundaria 2026.pdf', 'Manejo de Conexiones CREO Tangerine.docx']
previous = json.loads((audit / 'coverage.json').read_text(encoding='utf8'))
for name in files:
    digest = hashlib.sha256((root/name).read_bytes()).hexdigest()
    check(digest == next(s['sha256'] for s in previous['sources'] if s['file'] == name), name + ' changed')
    report['sources'].append({'file': name, 'sha256': digest})

# Read native PDF words again. Discover table columns independently of stored data.
doc = fitz.open(root/files[0])
for pno, page in enumerate(doc, 1):
    rows = [r for r in data['primary'] if r['sourcePage'] == pno]
    if rows:
        lines = []
        for drawing in page.get_drawings():
            for item in drawing['items']:
                if item[0] == 'l':
                    a, b = item[1:3]
                    if abs(a.x-b.x) < .1 and abs(a.y-b.y) > 8 and min(a.y,b.y) > 80 and 30 < a.x < 760:
                        lines.append((round(a.x,2), round(min(a.y,b.y),2), round(max(a.y,b.y),2)))
        counts = Counter(x for x,_,_ in lines)
        xs = sorted(x for x,n in counts.items() if n >= 5)
        ys = sorted(set((y0,y1) for x,y0,y1 in lines if x == xs[0] and y0 >= 109))
        check(len(xs) == 9 and len(ys) == len(rows), f'Primary page {pno}: grid count')
        words = page.get_text('words')
        assigned = []
        for r, (y0,y1) in zip(rows,ys):
            for field,x0,x1 in zip(data['fields'],xs,xs[1:]):
                found = [(i,w) for i,w in enumerate(words) if x0 < (w[0]+w[2])/2 < x1 and y0 < (w[1]+w[3])/2 < y1]
                # Compare complete token multisets, preserving punctuation and accents.
                check(Counter(w[4] for _,w in found) == Counter(r[field].split()), f'{r["id"]}.{field}: text mismatch')
                assigned.extend(i for i,_ in found)
        expected = [i for i,w in enumerate(words) if xs[0] < (w[0]+w[2])/2 < xs[-1] and ys[0][0] < (w[1]+w[3])/2 < ys[-1][1]]
        check(sorted(assigned) == expected, f'Primary page {pno}: lost/duplicated source words')
        report['primary'].append({'page':pno,'rows':len(rows),'fields':len(rows)*8,'sourceWords':len(assigned)})
    pix = page.get_pixmap(matrix=fitz.Matrix(2,2))
    source = Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
    error = image_error(source,Image.open(root/data['pages']['primaria'][pno-1]['src']))
    check(error is not None and error < 3, f'Primary page {pno}: reference image differs')
check(sum(p['rows'] for p in report['primary']) == 128, 'Primary total')

# Independently rendered raster pages must be complete and correspond to source.
doc = fitz.open(root/files[1])
grids = json.loads((audit/'secundaria-grid.json').read_text(encoding='utf8'))
for pno,page in enumerate(doc,1):
    pix = page.get_pixmap(matrix=fitz.Matrix(2,2))
    source = Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
    error = image_error(source,Image.open(root/data['pages']['secundaria'][pno-1]['src']))
    check(error is not None and error < 3, f'Secondary page {pno}: reference image differs')
    rows = [r for r in data['secondary'] if r['sourcePage'] == pno]
    grid = next(g for g in grids if g['page'] == pno)
    check(len(rows) == len(grid['y'])-1, f'Secondary page {pno}: missing row')
    check(all(all(r[f] for f in data['fields']) for r in rows), f'Secondary page {pno}: blank field')
    report['secondary'].append({'page':pno,'rows':len(rows),'fields':len(rows)*8,'referenceMeanPixelError':error,'visuallyCompared':True})
check(sum(p['rows'] for p in report['secondary']) == 138, 'Secondary total')

# Inspect all Word XML text, relationships and body drawing order, not only a saved transcription.
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
z = zipfile.ZipFile(root/files[2]); document = ET.fromstring(z.read('word/document.xml'))
paras = [''.join(t.text or '' for t in p.findall('.//w:t',ns)).strip() for p in document.findall('.//w:body//w:p',ns)]
paras = [p for p in paras if p]
check(len(paras) == len(data['guide']) == 8, 'Guide paragraph count')
for original,step in zip(paras,data['guide']):
    check(norm(original) == norm(step['text']), f'Guide step {step["id"]}: omitted/changed text')
rels = {r.attrib['Id']:r.attrib['Target'] for r in ET.fromstring(z.read('word/_rels/document.xml.rels'))}
body_images = [rels[b.attrib['{'+ns['r']+'}embed']] for b in document.findall('.//w:body//a:blip',ns)]
panels = json.loads((audit/'guide-panels.json').read_text(encoding='utf8'))
native_images = [n for s in data['guide'] for n in s['images']]
check(len(body_images) == len(native_images) == len(panels) == 15, 'Guide illustration occurrence count/order mismatch')
check(native_images == list(range(1,16)), 'Guide illustration order mismatch')
render = fitz.open(audit/'manejo-original-render.pdf')
for panel in panels:
    page = render[panel['sourcePage']-1]
    pix = page.get_pixmap(matrix=fitz.Matrix(3,3),clip=fitz.Rect(panel['sourceRect']))
    error = image_error(Image.frombytes('RGB',(pix.width,pix.height),pix.samples),Image.open(root/panel['src']))
    check(error is not None and error < 3, f'Guide panel {panel["id"]}: missing rendered content')
check(sum(p['sourceAnnotations'] for p in panels) == sum(len(p.get_drawings()) for p in render) == 14, 'Guide lost vector callouts')
image_checks = []
for target in dict.fromkeys(body_images):
    n = int(re.search(r'image(\d+)',target).group(1))
    source = Image.open(BytesIO(z.read('word/'+target)))
    error = image_error(source,Image.open(root/f'assets/creo/conexiones/image{n}.webp'))
    check(error is not None and error < 8, f'Guide image {n}: content/crop differs')
    image_checks.append({'image':n,'sourceSize':source.size,'meanPixelError':error})
extra_text = {}
for part in z.namelist():
    if re.match(r'word/(header|footer|footnotes|endnotes|comments).*\.xml$',part):
        texts = [t.text for t in ET.fromstring(z.read(part)).findall('.//w:t',ns) if t.text]
        if texts: extra_text[part] = texts
check(not extra_text, 'Guide additional text parts: '+str(extra_text))
report['guide']={'paragraphs':len(paras),'textIdenticalIgnoringWhitespace':True,'uniqueSourceImages':image_checks,'illustrationOccurrences':len(panels),'sourceAnnotations':14,'additionalTextParts':extra_text,'sourceEndsStep5':paras[4]}
report['totalConnections']=len(data['primary'])+len(data['secondary'])
report['allChecksPassed']=not report['errors']
(audit/'source-recheck.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({'allChecksPassed':report['allChecksPassed'],'connections':report['totalConnections'],'errors':report['errors']},ensure_ascii=True))
raise SystemExit(0 if report['allChecksPassed'] else 1)
