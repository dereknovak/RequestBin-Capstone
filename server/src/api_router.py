from flask import Flask, jsonify, Blueprint, request
from src.services.database_service import DatabaseService
from src.utilities.url_generator import get_new_url, is_unique_url, is_valid_url
# from tests.api_test_data import mock_burn_bin, requests, mock_delete_bin, mock_create_bin # Remove once db service works 

api = Blueprint('api', __name__, url_prefix='/api')

database = DatabaseService()

@api.get("/bins/generate")
def generate_bin_url():
  return jsonify(get_new_url())

@api.get("/bins")
def get_all_bins():
    bins = database.get_all_bins() # - bins array in test file
    return jsonify(bins)
   
@api.post("/bins")
def create_new_bin():
    data = request.get_json()
    requested_url = data.get('url')
    if (is_valid_url(requested_url)):
        new_bin = database.create_bin(requested_url)
        return jsonify(new_bin)
    elif (not is_unique_url(requested_url)):
        return jsonify('That URL is already in use.'), 400
    else:
        return jsonify("Invalid URL. Must be 7-10 characters using only characters 0-9 and a-Z.")

@api.get("/bins/<string:bin_url>/requests")
def get_bin_requests(bin_url):
    requests = database.get_bin_requests(bin_url) # - requests array & request objects within
    return jsonify(requests)

@api.delete("/bins/<string:bin_url>")
def delete_bin(bin_url):
    result = database.delete_bin(bin_url) # returns a string telling how many bins were deleted (for debugging purposes)
    # mock_delete_bin(bin_url)
    return {}

@api.delete("/bins/<string:bin_url>/requests/all")
def burn_bin_requests(bin_url):
    database.delete_bin_requests(bin_url) # returns a string telling how many requests were deleted (for debugging purposes)
    # mock_burn_bin(bin_url)
    return {}

# @api.delete("bins/<string:url>/requests/<string:request_id>")
# def delete_request(request_id):
#     # database.delete_one_request(request_id)
