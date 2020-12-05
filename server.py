import os
from threading import Thread

from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from flask.json import JSONEncoder
import time
import json

f = open("db.json", "r")
db = json.loads(f.read())
f.close()

app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)

@app.route('/', methods=["GET"])
def index():
    return app.send_static_file('index.html')

@app.route('/favicon.ico', methods=["GET"])
def favicon():
    return app.send_static_file('favicon.ico')

# ====================================== GET METHODS ==================================================
@app.route('/get_trip/<trip>', methods=["GET"])
def get_trip(trip):
    try:
        data = db["trips"][trip]
        print(data)
    except:
        data = ""
    return jsonify({'trip': data})


@app.route('/get_index', methods=["GET"])
def get_index():
    try:
        data = db["contents"]
        print(data)
    except:
        data = ""
    return jsonify({'trip': data})

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))