from PIL import Image
from pathlib import Path
im=Image.open('assets/logo-compartir.png').convert('RGB')
def path_for(test,box):
 edges=set()
 for y in range(box[1],min(box[3],im.height)):
  for x in range(box[0],min(box[2],im.width)):
   if not test(im.getpixel((x,y))):continue
   for a,b in [((x,y),(x+1,y)),((x+1,y),(x+1,y+1)),((x+1,y+1),(x,y+1)),((x,y+1),(x,y))]:
    if (b,a) in edges:edges.remove((b,a))
    else:edges.add((a,b))
 nxt={}
 for a,b in edges:nxt.setdefault(a,[]).append(b)
 paths=[]
 while nxt:
  start=next(iter(nxt)); cur=start; pts=[]
  while True:
   pts.append(cur); targets=nxt[cur]; dest=targets.pop()
   if not targets:del nxt[cur]
   cur=dest
   if cur==start:break
  pts=[p for i,p in enumerate(pts) if (p[0]-pts[i-1][0])*(pts[(i+1)%len(pts)][1]-p[1]) != (p[1]-pts[i-1][1])*(pts[(i+1)%len(pts)][0]-p[0])]
  if len(pts)>2:paths.append('M'+' '.join(f'{x},{y}' for x,y in pts)+'Z')
 return ''.join(paths)
mark=path_for(lambda p:sum(p)>180,(0,0,220,218))
letters=path_for(lambda p:min(p)>180,(230,0,693,218))
svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 670 218" role="img" aria-label="Compartir" class="compartir-logo"><defs><clipPath id="brand-mark"><path d="{mark}"/></clipPath></defs><image href="assets/logo-compartir.png" width="693" height="218" clip-path="url(#brand-mark)"/><path fill="currentColor" fill-rule="evenodd" d="{letters}"/></svg>'
import re
p=Path('index.html');s=p.read_text(encoding='utf-8')
if 'class="compartir-logo"' in s:
 s=re.sub(r'<svg[^>]*class="compartir-logo"[^>]*>.*?</svg>',lambda _:svg,s,flags=re.S)
else:
 s=re.sub(r'<img src="assets/logo-compartir.png"[^>]*>',lambda _:svg,s,count=1)
p.write_text(s,encoding='utf-8')
