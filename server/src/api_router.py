from flask import Flask, jsonify, Blueprint
from services.database_service import DatabaseService
from src.utilities.url_generator import get_new_url, is_unique_url
from tests.api_test_data import requests, bins, delete_one # Remove once db service works 

api = Blueprint('api', __name__, url_prefix='/api')

database = DatabaseService()

@api.get("/bins/generate")
def generate_bin_url():
  return jsonify(get_new_url()) # update utility to dyanmically choose between 7 and 10 chars

@api.get("/bins")
def get_all_bins():
    # database.get_all_bins() - bins array in test file
    return jsonify(bins)
   
@api.post("/bins")
def create_new_bin(bin_url):
    # get bin_url from data
    if (is_valid_url(bin_url)): # add is valid url function to url generator utility file
        new_bin = database.create_bin(bin_url)
        return jsonify(new_bin)
    # elif (NOT is_unique_url(bin_url)): - update logic with line 17 from app file - include in url generator
        ''
        # throw invalid bin error and give message for duplicate bin
    else:
        ''
        # throw invalid error and generic valid bin message
    
    return 'test'

@api.get("/bins/<string:bin_url>/requests")
def get_bin_requests(bin_url):
    # requests = database.get_bin_requests(bin_url) - requests array & request objects within - finish updating mock of requests
    return jsonify(requests)

@api.delete("/bin/<string:url>")
def delete_bin(bin_url):
    # database.is_existing_url
      # if so
      # database.delete_bin(bin_url)
    # else
      # send error message to frontend - bin doesnt exist
    return 'test'

@api.delete("/bin/<string:url>/requests")
def burn_bin_requests():
    # if no requests return
    # database.delete_bin_requests(bin_url)
    return 'test'

# @api.delete("bin/<string:url>/requests/<string:request_id>")
# def delete_request(request_id):
#     # database.delete_one_request(request_id)
#     return 'test'