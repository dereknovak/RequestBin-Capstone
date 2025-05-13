from flask import jsonify
from pymongo import MongoClient
import psycopg2
from bson.objectid import ObjectId

class DatabaseService:
    def __init__(self):
        self.mongo_client = MongoClient('mongodb://localhost:27017/') 
        self.mongo_db = self.mongo_client['RequestBin']
        self.connection = psycopg2.connect(dbname='request_bin')

    def get_request_from_bin(self, url):
        query = f"""
        SELECT request.mongodb_doc_id
        FROM request
        INNER JOIN bin ON request.bin_id = bin.id
        WHERE bin.path = '{url}';
        """
        with self.connection:
            with self.connection.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()

        flattened_list = [mongodb_doc_id_arr[0] for mongodb_doc_id_arr in result]
        requests_list = [self.mongo_db.Requests.find_one({"_id": ObjectId(mongo_id)}) for mongo_id in flattened_list]
        for request in requests_list:
            del request["_id"]
        return requests_list

    def close_db(self):
        if self.connection and not self.connection.closed:
            self.connection.close()
