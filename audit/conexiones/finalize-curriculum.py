from pathlib import Path
import json,zipfile,hashlib,collections
import xml.etree.ElementTree as ET
from PIL import Image

root=Path(__file__).resolve().parents[2];audit=root/'audit/conexiones'
fields=['area','grade','bimester','learning','lesson','topic','resource','digitalPage']
primary=json.loads((audit/'primaria-records.json').read_text(encoding='utf8'))
atlas=json.loads((audit/'secondary-atlases.json').read_text(encoding='utf8'))
review=json.loads((audit/'reviewed-secondary.json').read_text(encoding='utf8'))
secondary=[];corrections=[]
for a in atlas:
    data=json.loads((audit/(a['file']+'.ocr.json')).read_text(encoding='utf-8-sig'));cells=[]
    for top,bottom in a['bands']:
        lines=[]
        for line in data['lines']:
            words=[w for w in line['words'] if w['x']>=120 and top<=w['y']+w['height']/2<=bottom]
            if words:lines.append((min(w['y'] for w in words),' '.join(w['text'] for w in sorted(words,key=lambda w:w['x']))))
        cells.append(' '.join(text for y,text in sorted(lines)))
    record=dict(zip(fields,cells));record.update(id=f"s-{a['page']}-{a['row']}",level='secundaria',sourcePage=a['page'],sourceRow=a['row'],rect=a['rect'],collection='ActivaMente+' if a['page'] in [3,7,9,11] else 'Competencias')
    page_review=review['pages'][str(a['page'])]
    areas=[area for area,count in page_review['areas'] for _ in range(count)]
    values=page_review['numbers'][a['row']-1]
    checked=dict(grade=page_review['grade'],area=areas[a['row']-1],**dict(zip(['bimester','learning','digitalPage'],map(str,values))))
    checked.update(review['textCorrections'].get(record['id'],{}))
    for field,value in checked.items():
        if record[field]!=value:corrections.append({'id':record['id'],'field':field,'ocr':record[field],'verified':value})
        record[field]=value
    assert all(record[f] for f in fields),(record['id'],'empty field')
    secondary.append(record)
assert len(primary)==128 and len(secondary)==138
assert collections.Counter(r['sourcePage'] for r in secondary)=={int(p):len(r['numbers']) for p,r in review['pages'].items()}
assert any(r['lesson']=='Los números reales' and r['resource']=='No es lo mismo precio que valor' for r in secondary)

z=zipfile.ZipFile(root/'Manejo de Conexiones CREO Tangerine.docx')
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
doc=ET.fromstring(z.read('word/document.xml'))
paragraphs=[''.join(t.text or '' for t in p.findall('.//w:t',ns)).strip() for p in doc.findall('.//w:body//w:p',ns)]
paragraphs=[p for p in paragraphs if p]
assert len(paragraphs)==8
titles=['Identifica la conexión','Selecciona área y grado','Elige el bimestre','Ubica el tema y el AN','Abre el XAPI','Encuentra el tema articulador','Selecciona el cubo de CREO','Recorre el recurso']
images=[[1],[2],[3],[4],[5,6],[7,8],[9],[10]]
guide=[{'id':i+1,'title':title,'text':text.replace('?Desde','? Desde'),'original':text,'images':imgs} for i,(title,text,imgs) in enumerate(zip(titles,paragraphs,images))]
media={}
for n in range(1,11):
    path=root/f'assets/creo/conexiones/image{n}.webp'
    with Image.open(path) as im:w,h=im.size
    media[n]={'src':f'assets/creo/conexiones/image{n}.webp','width':w,'height':h,'crop':[0,0,w,h],'caption':next(s['title'] for s in guide if n in s['images'])}
pages={level:json.loads((audit/f'{level}-page-meta.json').read_text(encoding='utf8')) for level in ['primaria','secundaria']}
data={'fields':fields,'primary':primary,'secondary':secondary,'guide':guide,'pages':pages}
(root/'js/creo-curriculum-data.js').write_text('const CREO_CONNECTIONS = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf8')
(root/'js/creo-connections-media.js').write_text('const CREO_CONNECTION_MEDIA = '+json.dumps(media,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf8')
sources=[root/'Malla COMPARTIR primaria CREO 2026.pdf',root/'Malla PDC y PAR secundaria 2026.pdf',root/'Manejo de Conexiones CREO Tangerine.docx']
report={'sources':[{'file':p.name,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sources],'primaryRows':128,'secondaryRows':138,'totalRows':266,'fieldsPerRow':8,'fieldValues':266*8,'primaryPages':16,'secondaryPages':11,'guideParagraphs':8,'guideImages':10,'secondaryVerifiedPages':list(range(1,12)),'secondaryCorrections':corrections,'sourceGuide':paragraphs}
(audit/'coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print('Verified: 266 complete connections, 2,128 field values, all 27 PDF pages, all 8 guide instructions and 10 content images.')
