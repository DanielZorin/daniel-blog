import os, json, tqdm
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials, db
import pyuca
import datetime


links = {}

def get_final_date(s):
    months = {"января":1, "февраля":2, "марта":3, "апреля":4, "мая":5, "июня":6, "июля":7, "августа":8, "сентября":9, "октября":10, "ноября":11, "декабря":12}
    month_length = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if not s or not s[0] in "0123456789":
        return datetime.date(2000, 1, 1)
    parts = s.split(" ")
    days = []
    start_date = None
    year = -1
    last_year = int(parts[-1])
    for p in parts:
        if p.strip() == "":
            continue
        if p.strip() == "-":
            if len(days) == 1:
                start_date = [days[0][0], month]
                if year > 0:
                    start_date.append(year)
                days = days[:-1]
                year = -1
                continue
            else:
                start_date = [days[-1][0], month]
                if year > 0:
                    start_date.append(year)
                days = days[:-1]
                year = -1
                continue
        if p in months or p.replace(",", "") in months:
            month = months[p.replace(",", "")]
            for d in days:
                if d[1] == -1:
                    d[1] = month
        else:
            
            try:
                val = int(p.replace(",", " "))
                if val < 1900:
                    raise
                year = val
                for d in days:
                    if d[2] == -1:
                        d[2] = year
            except:
                # this is day
                days_parts = p.split(",")
                for p2 in days_parts:
                    if p2.strip() == "":
                        continue
                    if "-" in p:
                        day1 = int(p2.split("-")[0])
                        day2 = int(p2.split("-")[1])
                        days += [[x, -1, -1] for x in range(day1, day2+1)]
                    else:
                        days.append([int(p2), -1, -1])
                        
            if start_date:
                end_date = [days[-1][0], month]
                if days[-1][2] == -1:
                    days = days[:-1]
                #print(s, start_date, days, month, year)
                if start_date[1] == 2:
                    month_end = 28
                    #if year % 4 == 0:
                    #    month_end = 29
                else:
                    month_end = month_length[start_date[1] - 1]
                days += [[x, start_date[1], -1] for x in range(start_date[0], month_end + 1)]
                next_month = start_date[1] + 1
                if next_month == 13:
                    next_month = 1
                days += [[x, next_month, -1] for x in range(1, end_date[0] + 1)]
                start_date = None
                #print(s, days, month, year)
    for day in days[::-1]:
        try:
            return datetime.date(day[2], day[1], day[0])
        except:
            continue
    return datetime.date(2000, 1, 1)
    

def load_trip(name, lang="ru"):
    fname = "backend-data/trip-" + lang + "/" + name
    f = open(fname, "r", encoding="utf-8")
    #print(name)
    data = f.read().replace("<p/>", "</p>").replace("href=\"../", "href=\"../trip/")
    f.close()
    result = {"title":"", "dates": "", "content":[], "bookmarks": []}
    soup = BeautifulSoup(data, 'html.parser')
    cur_section = ""
    bookmark = 1
    part = 1
    for tag in soup:
        if tag.name == "h1":
            result["title"] = tag.string
            if ":" in result["title"]:
                cur_section = result["title"].split(":")[1].replace(" ", "")
            else:
                cur_section = result["title"]
        if tag.name == "i":
            result["dates"] = tag.string
            #result["date"] = get_final_date(tag.string)
        if tag.name == "h2":
            cur_section = tag.string
            links[tag.string] = name.replace(".html", "")
            result["content"].append({"type": "section", "src": tag.string, "bookmark": "#book" + str(bookmark)})
            result["bookmarks"].append([cur_section, "#book" + str(bookmark)])
            bookmark += 1
            part = 1
        if tag.name == "img":
            result["content"].append({"type": "image", "src": tag["src"]})
        if tag.name == "center":
            result["content"].append({"type": "separator", "bookmark": "#book" + str(bookmark)})
            part += 1
            result["bookmarks"].append([cur_section + " (" + str(part) + ")", "#book" + str(bookmark)])
            bookmark += 1
        if tag.name == "p":
            p = "".join([str(s) for s in tag.contents]).strip()
            result["content"].append({"type": "text", "src": p})
    preview = []
    for e in result["content"]:
        if e["type"] != "image":
            preview.append(e["src"])
        else:
            result["preview"] = "<br/>".join(preview) + "<br/>" + "<img src=\"" + e["src"] + "\">"
            break
    return result
    
def get_preview(trip, trip_data, bookmark=""):
    if not trip in trip_data:
        return "https://media2.fdncms.com/stranger/imager/u/large/43820816/1591119073-screen_shot_2020-06-02_at_10.30.13_am.png"
    content = trip_data[trip]["content"]
    if bookmark:
        i = 0
        while i < len(content):
            if "bookmark" in content[i] and content[i]["bookmark"] == bookmark:
                content = content[i:]
                break
            i += 1
    images = [c for c in content if c["type"] == "image"]
    if not images:
        return "https://media2.fdncms.com/stranger/imager/u/large/43820816/1591119073-screen_shot_2020-06-02_at_10.30.13_am.png"
    else:
        return images[0]["src"]
    
def prepare_contents(trip_data, country_names, lang="ru"):
    f = open("backend-data/index-" + lang + ".html", "r", encoding='utf-8')
    data = f.read()
    f.close()
    soup = BeautifulSoup(data, 'html.parser')
    cur_year = 0
    result = []
    for tag in soup:
        if tag.name == "h2":
            cur_year = int(tag.string)
        if tag.name == "p":
            name = "".join([str(s) for s in tag.contents]).strip()
            link = ""
            for child in tag.children:
                if child.name == "a":
                    link = child["href"]
                    name = "".join([str(s) for s in child.contents]).strip()
            if "/" in link:
                if not link.split("/")[1] in trip_data:
                    link = ""
            try:
                country = name.split(":")[0]
            except:
                country = ""
                print(name)
            entry = {"year": cur_year, "name": name, "link": link, "id": link.split("/")[1] if link else "", "country_rus": country}
            entry["preview"] = get_preview(entry["id"], trip_data)
            try:
                entry["country_eng"] = country_names[entry["country_rus"]]
            except Exception as e:
                print(e)
                pass
            result.append(entry)
    return result
    
    
def prepare_list(lang = "ru"):
    f = open("backend-data/country-list-" + lang + ".html", "r", encoding="utf-8")
    contents = f.read()
    f.close()
    soup = BeautifulSoup(contents, 'html.parser')
    names = {}
    result = []
    for tag in soup:
        if tag.name == "div":
            for child in tag.children:
                cities = ""
                if child.name == "b":
                    txt = "".join([str(s) for s in child.contents]).strip()
                    rus_name = txt.replace(":", "")
                    try:
                        eng_name = child["id"]
                        names[rus_name] = eng_name
                    except:
                        pass
                else:
                    if "," in child:
                        cities = child.split(",")
                        collator = pyuca.Collator()
                        cities = sorted([s.strip() for s in cities], key=collator.sort_key)
                    elif child:
                        if child.strip():
                            cities = [child.strip()]
            result.append({"eng_name": eng_name, "rus_name": rus_name, "cities": cities})
            #print(eng_name, cities)
    
    result = sorted(result, key = lambda x: x["rus_name"])
    for link in links:
        contents = contents.replace(link, "<a href=\"" + links[link] + "\">" + link + "</a>")
        
    #f = open("tmp.html", "w", encoding="utf-8")
    #f.write(contents)
    #f.close()  
    return names, result

def generate_sitemap(lang):
    res = ["", "map", "list", "plans", "contacts"]
    for trip in sorted(os.listdir("backend-data/trip-" + lang)):
        index = trip.replace(".html", "")
        res.append("trip/" + index + "?lang=" + lang)
    res = ["http://www.danielzorin.gq/" + s for s in res]
    f = open("./public/sitemap.txt", "w")
    f.write("\n".join(res))
    f.close()

def prepare_all(lang = "ru"):
    country_names, country_list = prepare_list(lang)

    trip_data = {}
    dirname = "backend-data/trip-" + lang
    print("Preraping trip data " + lang)
    for trip in tqdm.tqdm(sorted(os.listdir(dirname))):
        data = load_trip(trip, lang)
        index = trip.replace(".html", "")
        trip_data[index] = data  
        
    entries = prepare_contents(trip_data, country_names, lang)
    
    cities = {}
    for e in entries[::-1]:
        #print(e)
        url = e["id"]
        if not "country_eng" in e:
            continue
        country = e["country_eng"]
        country_rus = e["country_rus"]
        if not url in trip_data:
            continue
        bookmarks = trip_data[url]["bookmarks"]
        bookmarks = [{"name": b[0], "url": url + b[1], "preview": get_preview(url, trip_data, b[1])} for b in bookmarks]
        if not country in cities:
            cities[country] = []
        cities[country] += bookmarks
        #print(country, cities[country]) 

    return {
        #"links": links, 
        "trips": trip_data, 
        "contents": entries, 
        "country_list": country_list, 
        "cities": cities
    }

if __name__ == "__main__":
    data  = prepare_all("ru")
        
    db_all = {}
    db_all["ru"] = dict(data)
    
    data  = prepare_all("en")
    db_all["en"] = dict(data)
    
    cred = credentials.Certificate("google-key.json")
    firebase_admin.initialize_app(cred, {'databaseURL': 'https://homepage-d40ae.firebaseio.com/'})

    ref = db.reference("/")

    f = open("db.json", "w")
    f.write(json.dumps(db_all, indent=4))
    f.close()

    data = db_all
    data_ru = data["ru"]
    data_en = data["en"]
    #trips = data["trips"]
    #del data["trips"]
    del data["ru"]
    del data["en"]
    #ref.update(data)
    '''ref.update({"trips": {}})
    ref = db.reference("/trips/")
    for trip in sorted(trips.keys()):
        print(trip)
        ref.update({trip: trips[trip]})'''
    
    trips_ru = data_ru["trips"]
    trips_en = data_en["trips"]
    del data_ru["trips"]
    del data_en["trips"]
    ref = db.reference("/ru/")
    f = open("backend-data/plans-ru.json", "r", encoding="utf-8")
    plans = json.loads(f.read())
    f.close()
    for k in data_ru:
        ref.update({k: data_ru[k]})
    ref.update({"plans": plans})
    
    ref = db.reference("/en/")
    f = open("backend-data/plans-en.json", "r")
    plans = json.loads(f.read())
    f.close()
    for k in data_en:
        ref.update({k: data_en[k]})
    ref.update({"plans": plans})
    
    ref.update({"ru/trips": {}})
    ref.update({"en/trips": {}})
    ref = db.reference("/ru/trips/")
    '''print("Uploading to firebase ru")
    for trip in tqdm.tqdm(sorted(trips_ru.keys())):
        #print("ru ",  trip)
        ref.update({trip: trips_ru[trip]})
        pass
        
    ref = db.reference("/en/trips/")
    print("Uploading to firebase en")
    for trip in tqdm.tqdm(sorted(trips_en.keys())):
        #print("en ",  trip)
        ref.update({trip: trips_en[trip]})'''
    
    posts = {}
    for trip in trips_ru.keys():
        posts["ru-" + trip] = trips_ru[trip]
        posts["ru-" + trip]["id"] = trip
        posts["ru-" + trip]["language"] = "ru"
        posts["ru-" + trip]["date"] = get_final_date(trips_ru[trip]["dates"]).isoformat()
    for trip in trips_en.keys():
        posts["en-" + trip] = trips_en[trip]
        posts["en-" + trip]["id"] = trip
        posts["en-" + trip]["language"] = "en"
        posts["en-" + trip]["date"] = posts["ru-" + trip]["date"]
    f = open("backend-data/all_posts.json", "r", encoding="utf-8")
    guides = json.loads(f.read())
    for guide in guides.keys():
        post = guides[guide]
        post["id"] = post["name"]
        post["date"] = datetime.datetime.strptime(post["date"], "%m/%d/%Y").date().isoformat()
        f = open("backend-data/guides/" + guide + ".html", "r", encoding="utf-8")
        post["content"] = f.read()
        i = post["content"].find("<img")
        i2 = post["content"][i+1:].find(">")
        post["preview"] = post["content"][:i+i2+3]
        posts[guide] = post
 
    
    ref = db.reference("/posts/")
    old_posts = ref.get()
    if old_posts:
        for key in old_posts.keys():
            ref.child(key).delete()
    #ref.delete()
    ref = db.reference("/")
    ref.child('posts').delete()
    ref.update({"ru/posts": {}})
    ref.update({"en/posts": {}})
    ref.update({"ru/post-count": len(posts) / 2})
    ref.update({"en/post-count": len(posts) / 2})
    for post in tqdm.tqdm(sorted(posts.keys())):
        key = posts[post]["language"] + "/posts/" + post
        ref.update({key: posts[post]})
        
    generate_sitemap("ru")