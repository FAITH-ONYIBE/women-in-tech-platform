from PIL import Image, ImageDraw
RED=(220,32,48,255); WHITE=(255,255,255,255)
def icon(size, maskable=False, bg=RED):
    im=Image.new('RGBA',(size,size),bg if maskable else (0,0,0,0))
    d=ImageDraw.Draw(im)
    if not maskable: d.rounded_rectangle([0,0,size-1,size-1],radius=size//5,fill=bg)
    s=size*(0.46 if maskable else 0.56); ox=oy=(size-s)/2
    p=lambda x,y:(ox+x/38*s, oy+y/34*s*0.9+s*0.05)
    d.polygon([p(2,28),p(5,8),p(13,17),p(19,3),p(25,17),p(33,8),p(36,28)],fill=WHITE)
    d.rounded_rectangle([*p(2,29.5),*p(36,33)],radius=max(2,int(size*0.01)),fill=WHITE)
    for cx,cy in [(5,6),(19,1.8),(33,6)]:
        x,y=p(cx,cy); r=2.4/38*s; d.ellipse([x-r,y-r,x+r,y+r],fill=WHITE)
    return im
import os; os.makedirs('public/icons',exist_ok=True)
icon(192).save('public/icons/icon-192.png'); icon(512).save('public/icons/icon-512.png')
icon(512,True).save('public/icons/icon-maskable-512.png'); icon(180,True).save('public/icons/apple-touch-icon.png')
