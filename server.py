import os
from threading import Thread

from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from flask.json import JSONEncoder
import time
import json

import prepare

f = open("db.json", "r")
db = json.loads(f.read())
f.close()
#db = prepare.db

app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)

@app.route('/', methods=["GET"])
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

# ====================================== GET METHODS ==================================================
@app.route('/get_trip/<trip>', methods=["GET"])
def get_trip(trip):
    try:
        data = db["trips"][trip]
    except:
        data = ""
    return jsonify({'trip': data})


@app.route('/get_index', methods=["GET"])
def get_index():
    try:
        data = db["contents"]
    except:
        data = ""
    return jsonify({'trip': data})
    
@app.route('/get_country_list', methods=["GET"])
def get_country_list():
    try:
        data = db["country_list"]
    except:
        data = ""
    return jsonify({'trip': data})
    
@app.route('/search/<query>', methods=["GET"])
def get_search(query):
    try:
        data = db["trips"]
        result = []
        for trip in data:
            for c in data[trip]["content"]:
                if not c["type"] in ["text", "section"]:
                    continue
                if "src" in c and query.lower() in c["src"].lower():
                    result.append({"url": trip, "title": data[trip]["title"], "string": c["src"].replace(query.lower(), "<b>" + query.lower() + "</b>").replace(query, "<b>" + query.lower() + "</b>")})
    except:
        result = []
    return jsonify({'result': result})

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))