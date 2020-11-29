import os, json
from bs4 import BeautifulSoup

links = {}

def load_trip(name):
    f = open("backend-data/trip/" + name, "r", encoding="utf-8")
    print(name)
    data = f.read().replace("<p/>", "</p>").replace("href=\"../", "href=\"../trip/")
    f.close()
    result = {"title":"", "dates": "", "content":[]}
    soup = BeautifulSoup(data, 'html.parser')
    cur_section = ""
    for tag in soup:
        if tag.name == "h1":
            result["title"] = tag.string
        if tag.name == "i":
            result["dates"] = tag.string
        if tag.name == "h2":
            cur_section = tag.string
            links[tag.string] = name.replace(".html", "")
            result["content"].append({"type": "section", "src": tag.string})
        if tag.name == "img":
            result["content"].append({"type": "image", "src": tag["src"]})
        if tag.name == "p":
            p = "".join([str(s) for s in tag.contents]).strip()
            result["content"].append({"type": "text", "src": p})
    return result
    
trip_data = {}
for trip in os.listdir("backend-data/trip"):
    data = load_trip(trip)
    index = trip.replace(".html", "")
    trip_data[index] = data
    
f = open("backend-data/country-list.html", "r", encoding="utf-8")
contents = f.read()
f.close()
for link in links:
    contents = contents.replace(link, "<a href=\"" + links[link] + "\">" + link + "</a>")
    
f = open("tmp.html", "w", encoding="utf-8")
f.write(contents)
f.close()    
    
db = {"links": links, "trips": trip_data}
f = open("db.json", "w")
f.write(json.dumps(db))
f.close()