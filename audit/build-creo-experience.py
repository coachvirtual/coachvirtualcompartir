"""Map every source paragraph into the interactive CREO experience."""
from pathlib import Path
from PIL import Image
import xml.etree.ElementTree as ET
import zipfile,json,shutil,hashlib

root=Path(__file__).resolve().parent.parent
source=root/'Recursos Globales CREO 2026 COMPARTIR.docx'
if not source.exists():source=root/'assets/creo/recursos-globales-creo-2026.docx'
z=zipfile.ZipFile(source)
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
doc=ET.fromstring(z.read('word/document.xml'))
paragraphs=[''.join(t.text or '' for t in p.findall('.//w:t',ns)).strip() for p in doc.findall('.//w:body//w:p',ns)]
paragraphs=[p for p in paragraphs if p]
assert len(paragraphs)==82
fixes={'deberás ingresa al':'deberás ingresar al','las necesidades los agentes':'las necesidades de los agentes','preguntas escenciales':'preguntas esenciales','Las siguientes página muestran':'Las siguientes páginas muestran','por a vinculación':'por la vinculación','se alojan la la sección La voz de la experiencia.}':'se alojan en la sección La voz de la experiencia.'}
def text(n):
    raw=paragraphs[n-1]
    display=raw
    for old,new in fixes.items(): display=display.replace(old,new)
    return dict(id=n,text=display,original=raw)
used=[]
def take(*ids):
    used.extend(ids)
    return [text(n) for n in ids]
def step(title,ids,images):return dict(title=title,paragraphs=take(*ids),images=images)
def resource(key,title,ids,images,topics=(),steps=(),**extra):
    return dict(id=key,title=title,paragraphs=take(*ids),images=images,topics=take(*topics),steps=list(steps),**extra)

guide={'title':take(1)[0],'introduction':take(2)[0],'access':take(3,4),'overview':take(5,6),'chapters':[]}
guide['chapters']=[
 dict(id='evangelio',title=take(7)[0],name='Vivir el Evangelio hoy',short='Evangelio',photo=1,intro=take(8,9),images=[4],resources=[
  resource('catequesis','Catequesis de Comunión y Confirmación',[10],[5,6],steps=[step('Conocer',[11],[7]),step('Celebrar',[12],[8]),step('Vivir',[13],[])],choices=['Comunión','Confirmación'])]),
 dict(id='comunidad',title=take(14)[0],name='Acompañar a toda la comunidad educativa',short='Comunidad',photo=2,intro=take(15,16),images=[9,10],resources=[
  resource('celebrar-comunidad','Celebrar en comunidad',[17,24],[11,12],topics=range(18,24),tags=['Preescolar','Primaria','Bachillerato']),
  resource('ensenar','Enseñar en la escuela católica',[25,28],[13,14],topics=[26,27]),
  resource('libro','Un libro para todos',[29,34],[15,16],topics=range(30,34))]),
 dict(id='experiencia',title=take(35)[0],name='Transformar la experiencia educativa',short='Experiencia educativa',photo=3,intro=take(36,37),images=[17],resources=[
  resource('religion','Educación Religiosa Escolar',[38,39,40],[],steps=[step('Orientaciones docentes',[41],[18]),step('Inicio de la lección',[42,43,44,45],[19]),step('Contenido',[46],[20]),step('Índice de navegación',[47],[21])]),
  resource('plan-lector','Plan Lector CREO',[48,49],[22],tags=['6 a 8 años','9 a 11 años','12 a 14 años','15 a 17 años'])]),
 dict(id='vida',title=take(50)[0],name='Aprender para la vida',short='Aprender para la vida',photo=4,intro=take(51,56),topics=take(52,53,54,55),images=[23],resources=[
  resource('servicio','Aprendizaje y Servicio Solidario',[57,58],[24,25],steps=[step('Introducción',[59],[26]),step('Para iniciar',[60,61],[27]),step('Planificación',[62],[28]),step('Ejecución',[63],[29]),step('Evaluación',[64],[30]),step('Celebración',[65],[31])]),
  resource('comunidades','Comunidades infantiles y juveniles',[66,67],[32,33]),
  resource('retiros','Convivencias y retiros',[68,69],[34]),
  resource('itinerarios','Itinerarios de Vida Cristiana',[70,71,72,73],[35,36,37],tags=['Experimentar','Comprender','Discernir','Poner manos a la obra'])]),
 dict(id='familias',title=take(74)[0],name='Construir juntos con las familias',short='Familias',photo=5,intro=take(75,76),images=[38],resources=[
  resource('voz','La voz de la experiencia',[77,78],[39,40]),
  resource('escuela-familias','Escuela de familias',[79,80],[41,42]),
  resource('celebrar-familia','Celebrar en familia',[81],[43]),
  resource('quince-minutos','Quince minutos en familia',[82],[44])])]
assert sorted(used)==list(range(1,83)),{'missing':set(range(1,83))-set(used),'duplicates':len(used)-len(set(used))}
captions=json.loads((root/'audit/creo-image-captions.json').read_text(encoding='utf8'))
# These rectangles are applied as CSS viewports. The original pixels and all
# lettering remain untouched; browser chrome, taskbars and empty margins stay
# outside the rendered content, including in the large-image view.
crops={2:(20,85,1700,520),3:(40,150,1750,760),6:(4,70,1320,716),
 7:(151,186,1161,716),8:(321,186,960,716),18:(735,0,1234,215),
 19:(4,74,1360,716),20:(74,152,1285,716),21:(4,74,1360,716),
 26:(4,70,1320,716),27:(238,147,1074,716),28:(250,198,955,474),
 29:(250,198,955,474),30:(250,198,960,545),31:(237,185,1074,716),
 37:(22,7,1080,580)}
media={}
for n in range(2,45):
    with Image.open(root/f'assets/creo/image{n}.webp') as im:w,h=im.size
    rect=crops.get(n,(0,0,w,h))
    assert 0<=rect[0]<rect[2]<=w and 0<=rect[1]<rect[3]<=h,(n,rect,(w,h))
    media[n]={'src':f'assets/creo/image{n}.webp','width':w,'height':h,'crop':rect,'caption':captions[str(n)]}
guide['accessImages']=[2,3]
def all_images():
    result=list(guide['accessImages'])
    for c in guide['chapters']:
        result+=c['images']
        for r in c['resources']:
            result+=r['images']
            for s in r['steps']:result+=s['images']
    return result
assert sorted(all_images())==list(range(2,45))
(root/'js/creo-content.js').write_text('// Complete source mapping; generated by audit/build-creo-experience.py.\nconst CREO_CONTENT = '+json.dumps(guide,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf8')
(root/'js/creo-media.js').write_text('const CREO_MEDIA = '+json.dumps(media,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf8')
if source.resolve()!=(root/'assets/creo/recursos-globales-creo-2026.docx').resolve():
    shutil.copyfile(source,root/'assets/creo/recursos-globales-creo-2026.docx')
report={'source':source.name,'sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'sourceParagraphs':82,'mappedParagraphs':len(used),'uniqueParagraphs':len(set(used)),'allTextMapped':True,'contentImages':43,'imageIDs':all_images(),'cropRectangles':crops,'sourceText':[text(i) for i in range(1,83)]}
(root/'audit/creo-interactive-coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print('Mapped all 82 source paragraphs once, all 43 content images, 5 pillars, 14 resource groups (15 proposals), 13 guided steps.')
