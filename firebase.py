import firebase_admin
from firebase_admin import credentials, db
import json

cred = credentials.Certificate("google-key.json")
firebase_admin.initialize_app(cred, {'databaseURL': 'https://homepage-d40ae.firebaseio.com/'})

ref = db.reference("/")
f = open("db.json", "r")
data = json.loads(f.read())
trips = data["trips"]
del data["trips"]
ref.update(data)
ref.update({"trips": {}})
ref = db.reference("/trips/")
for trip in sorted(trips.keys()):
    print(trip)
    ref.update({trip: trips[trip]})