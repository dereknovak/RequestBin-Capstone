from flask import Flask, jsonify, Blueprint
from services.database_service import DatabaseService
from src.utilities.url_generator import get_new_url, is_unique_url
from tests.api_test_data import requests, bins, delete_one # Remove once db service works 

api = Blueprint('api', __name__, url_prefix='/api')

database = DatabaseService()

@api.get("/bins/generate")
def all():
  return jsonify(get_new_url())

@api.get("/bins")
def get_bins():
    return jsonify(bins)
   
# @api.post("/bins")

@api.get("/bins/<string:bin_url>/requests")
def get_requests(bin_url):
    return jsonify(requests)
