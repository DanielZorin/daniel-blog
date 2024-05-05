import os

for fn in os.listdir("trip-en"):
    if fn.endswith(".html"):
        f = open("trip-en/" + fn, "r", encoding="utf-8")
        txt = f.read()
        s = "goo.gl"
        if s in txt:
            print(fn, txt[txt.index(s)-20: txt.index(s)+50].replace("\n", ""))
            
            
for fn in os.listdir("trip-en"):
    if fn.endswith(".html"):
        f = open("trip-en/" + fn, "r", encoding="utf-8")
        txt = f.read()
        
        f2 = open("trip-ru/" + fn, "r", encoding="utf-8")
        txt2 = f2.read()
        if txt.count("<img src") != txt2.count("<img src"):
            print(fn, txt.count("<img src"), txt2.count("<img src"))