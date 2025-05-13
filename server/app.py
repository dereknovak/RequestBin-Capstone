from flask import Flask, jsonify
# from services.mongo_service import MongoService
# from services.psql_service import PsqlServices
from services.database_service import DatabaseService

app = Flask(__name__)

database = DatabaseService()

@app.route("/psql/all")
def all2():
    return database.get_request_from_bin('0p1s21h')

@app.route("/close/db")
def close_db():
    database.close_db()
    return "Connection closed (I hope)."

# @app.route("/mongo/all")
# def all():
#     """
#     Show Requests collection from RequestBin database in JSON.
#     """
#     mongo_service = MongoService('mongodb://localhost:27017/', 'RequestBin')
#     
#     return jsonify(mongo_service.find_all('Requests'))
#
# @app.route("/mongo/burn")
# def burn():
#     """
#     Empty the collection.
#     """
#     mongo_service = MongoService('mongodb://localhost:27017/', 'RequestBin')
#
#     return mongo_service.delete_all('Requests')
#
# @app.route("/mongo/create_dummy")
# def create_dummy():
#     """
#     Create one specific - hard coded - dummy (can be improved).
#     """
#     mongo_service = MongoService('mongodb://localhost:27017/', 'RequestBin')
#     request1 = {
#         "method": 'GET',
#         "timestamp": "06:31:14 PM 5/9/2025",
#         "path": "/yqgulne?Text=Hello+Momma",
#         "headers": "Accept: text/html" + 
#           "Accept-Encoding: gzip, deflate, br, zstd" + 
#           "Accept-Language: en-US,en;q=0.9,la;q=0.8" + 
#           "Connection: close",
#         "query_params": "Text=First+Dummy+Request",
#         "body": None
#         }
#
#     mongo_service.insert_one('Requests', request1)
#     return "Dummy created (I hope)."

@app.route("/")
def index():
    return "Hello, world!"

if __name__ == "__main__":
    app.run(debug=True, port=5003)
