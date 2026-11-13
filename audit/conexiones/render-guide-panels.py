"""Render every Word illustration occurrence with its original vector callouts.

Input is a read-only Word ExportAsFixedFormat render of the unchanged DOCX.
Header/footer stationery is excluded; screenshot content and all 14 callouts remain.
"""
from pathlib import Path
import json
import pymupdf as fitz
from PIL import Image

root = Path(__file__).resolve().parents[2]
audit = root/'audit/conexiones'
doc = fitz.open(audit/'manejo-original-render.pdf')
panels = []; total_marks = 0
for pno,page in enumerate(doc,1):
    pictures = [fitz.Rect(i['bbox']) for i in page.get_image_info() if 66 < i['bbox'][1] < 725]
    marks = page.get_drawings()
    assignments = {i:[] for i in range(len(pictures))}
    for mark in marks:
        rect = mark['rect']
        overlaps = [(rect & p).get_area() for p in pictures]
        assert max(overlaps) > 0, (pno,rect,'unassigned callout')
        assignments[overlaps.index(max(overlaps))].append(mark)
    for i,picture in enumerate(pictures):
        clip = fitz.Rect(picture)
        for mark in assignments[i]: clip |= mark['rect']
        clip += (-2,-2,2,2)
        pix = page.get_pixmap(matrix=fitz.Matrix(3,3),clip=clip)
        n = len(panels)+1
        src = f'assets/creo/conexiones/guide-panel-{n:02}.webp'
        Image.frombytes('RGB',(pix.width,pix.height),pix.samples).save(root/src,'WEBP',quality=96)
        panels.append({'id':n,'src':src,'width':pix.width,'height':pix.height,'crop':[0,0,pix.width,pix.height],'sourcePage':pno,'sourceRect':list(clip),'sourceAnnotations':len(assignments[i])})
        total_marks += len(assignments[i])
assert len(panels) == 15 and total_marks == 14
(audit/'guide-panels.json').write_text(json.dumps(panels,ensure_ascii=False,indent=2),encoding='utf8')
print(f'{len(panels)} source illustration occurrences, {total_marks} original callouts preserved')
