from pathlib import Path
import pymupdf as fitz
from PIL import Image,ImageOps,ImageDraw,ImageFont
from collections import Counter
import json,hashlib

root=Path(__file__).resolve().parents[2]
audit=root/'audit/conexiones'
assets=root/'assets/creo/conexiones'
assets.mkdir(exist_ok=True)
fields=['area','grade','bimester','learning','lesson','topic','resource','digitalPage']
doc=fitz.open(root/'Malla COMPARTIR primaria CREO 2026.pdf')
primary=[];page_meta=[]
for page_index,page in enumerate(doc):
    pix=page.get_pixmap(matrix=fitz.Matrix(2,2))
    image=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
    image.save(assets/f'primaria-page-{page_index+1}.webp','WEBP',quality=94)
    page_meta.append({'page':page_index+1,'src':f'assets/creo/conexiones/primaria-page-{page_index+1}.webp','width':pix.width,'height':pix.height})
    if page_index+1 not in [3,4,6,7,9,10,12,13,15,16]:continue
    lines=[]
    for d in page.get_drawings():
        for item in d['items']:
            if item[0]=='l':
                a,b=item[1:3]
                if abs(a.x-b.x)<.1 and 30<a.x<760 and abs(a.y-b.y)>8 and max(a.y,b.y)>109 and min(a.y,b.y)>80:
                    lines.append((round(a.x,2),round(min(a.y,b.y),2),round(max(a.y,b.y),2)))
    counts=Counter(x for x,y0,y1 in lines)
    xs=sorted(x for x,count in counts.items() if count>=5)
    # All eight table fields are bounded by these nine vertical grid lines.
    assert len(xs)==9,(page_index+1,xs,counts)
    ys=sorted(set((y0,y1) for x,y0,y1 in lines if x==xs[0] and y0>=109))
    words=page.get_text('words')
    assigned=[]
    for row_index,(y0,y1) in enumerate(ys):
        cells=[]
        for x0,x1 in zip(xs,xs[1:]):
            selected=[(i,w) for i,w in enumerate(words) if x0<(w[0]+w[2])/2<x1 and y0<(w[1]+w[3])/2<y1]
            ordered=sorted(selected,key=lambda item:(round(item[1][1]/2.5),item[1][0]))
            cells.append(' '.join(item[1][4] for item in ordered))
            assigned.extend(i for i,w in ordered)
        assert len(cells)==8 and all(cells),(page_index+1,row_index,cells)
        record=dict(zip(fields,cells));record.update(id=f'p-{page_index+1}-{row_index+1}',level='primaria',collection='Compartir Nueva edición',sourcePage=page_index+1,sourceRow=row_index+1,rect=[xs[0]*2,y0*2,xs[-1]*2,y1*2])
        primary.append(record)
    expected=[i for i,w in enumerate(words) if xs[0]<(w[0]+w[2])/2<xs[-1] and ys[0][0]<(w[1]+w[3])/2<ys[-1][1]]
    assert sorted(assigned)==expected,(page_index+1,'source words not mapped exactly once')
    print('Primaria',page_index+1,len(ys),'rows',len(assigned),'words')
(audit/'primaria-records.json').write_text(json.dumps(primary,ensure_ascii=False,indent=2),encoding='utf8')
(audit/'primaria-page-meta.json').write_text(json.dumps(page_meta,ensure_ascii=False,indent=2),encoding='utf8')

grids=json.loads((audit/'secundaria-grid.json').read_text(encoding='utf8'))
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',42)
secondary_meta=[];atlases=[]
for grid in grids:
    page=grid['page'];image=Image.open(audit/f'secundaria-{page}.png').convert('RGB')
    image.save(assets/f'secundaria-page-{page}.webp','WEBP',quality=95)
    secondary_meta.append({'page':page,'src':f'assets/creo/conexiones/secundaria-page-{page}.webp','width':image.width,'height':image.height})
    for row,(y0,y1) in enumerate(zip(grid['y'],grid['y'][1:]),1):
        parts=[]
        for x0,x1 in zip(grid['x'],grid['x'][1:]):
            cell=image.crop((x0+4,y0+4,x1-4,y1-4))
            box=ImageOps.grayscale(cell).point(lambda p:255 if p<180 else 0).getbbox()
            if box:cell=cell.crop(box)
            parts.append(cell.resize((cell.width*3,cell.height*3),Image.Resampling.LANCZOS))
        height=sum(max(p.height,65)+25 for p in parts)+40
        canvas=Image.new('RGB',(1700,height),'white');draw=ImageDraw.Draw(canvas);bands=[];y=20
        for part in parts:
            h=max(part.height,65);draw.text((15,y+(h-48)//2),'Dato',font=font,fill='black');canvas.paste(part,(130,y+(h-part.height)//2));bands.append([y,y+h]);y+=h+25
        assert max(canvas.size)<2600,canvas.size
        name=f'atlas-{page:02}-{row:02}'
        canvas.save(audit/(name+'.png'))
        atlases.append({'file':name,'page':page,'row':row,'bands':bands,'rect':[grid['x'][0],y0,grid['x'][-1],y1]})
(audit/'secondary-atlases.json').write_text(json.dumps(atlases,indent=2),encoding='utf8')
(audit/'secundaria-page-meta.json').write_text(json.dumps(secondary_meta,ensure_ascii=False,indent=2),encoding='utf8')
print('TOTAL PRIMARY',len(primary),'SECONDARY ATLASES',len(atlases))
