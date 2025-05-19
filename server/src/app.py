from flask import Flask, jsonify, request
from flask_cors import CORS
from services.url_generator import get_new_url
from services.database_service import DatabaseService
from services.parse_service import parse
import api_router

app = Flask(__name__)
CORS(app)
app.register_blueprint(api_router.api)

database = DatabaseService()

@app.route("/<string:url>", methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])
@app.route("/<string:url>/<path:subpath>", methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])
def write_request(url, subpath=None):
    db_urls = [wrap[0] for wrap in database.get_paths()]
    if url in db_urls:
        payload = parse(request)
        database.write_req(payload)
        return "200 OK"
    else:
        return "No action performed"

@app.route("/")
def index():
    get_new_url()
    return "Hello, world!"

if __name__ == "__main__":
    app.run(debug=True, port=5003)
