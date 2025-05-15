from flask import jsonify
from pymongo import MongoClient
import psycopg2
from bson.objectid import ObjectId

class DatabaseService:
    def __init__(self):
        self.mongo_client = MongoClient('mongodb://localhost:27017/') 
        self.mongo_db = self.mongo_client['RequestBin']
        self.connection = psycopg2.connect(dbname='request_bin')

    # def get_request_from_bin(self, url):
    #     query = f"""
    #     SELECT request.mongodb_doc_id
    #     FROM request
    #     INNER JOIN bin ON request.bin_id = bin.id
    #     WHERE bin.path = '{url}';
    #     """
    #     with self.connection:
    #         with self.connection.cursor() as cursor:
    #             cursor.execute(query)
    #             result = cursor.fetchall()
    #
    #     flattened_list = [mongodb_doc_id_arr[0] for mongodb_doc_id_arr in result]
    #     requests_list = [self.mongo_db.Requests.find_one({"_id": ObjectId(mongo_id)}) for mongo_id in flattened_list]
    #     for request in requests_list:
    #         del request["_id"]
    #     return requests_list

    # def get_paths(self):
    #     query = """
    #     SELECT path FROM bins;
    #     """
    #
    #     with self.connection:
    #         with self.connection.cursor() as cursor:
    #             cursor.execute(query)
    #             result = cursor.fetchall()
    #
    #     return result

    # def write_req(self, payload):
    #     """
    #     Plan for method:
    #     * Add payload to mongoDB
    #     * Get respective id of payload from mongoDB
    #     * Use path attribute from payload to get id from bin
    #     * Add entry in request table with bin_id and mongodb_doc_id
    #     """
    #     return 

    # database.get_all_bins() - bins array in test file
    def get_all_bins(self):
        query = f"""
        SELECT path FROM bins;
        """

        with self.connection:
            with self.connection.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()

        return result

    # new_bin = database.create_bin(bin_url)
    def create_bin(self, bin_url):
        query = f"""
        INSERT INTO Bins (path) VALUES ('{bin_url}');
        """

        with self.connection:
            with self.connection.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()

        return result

    # requests = database.get_bin_requests(bin_url) - requests array & request objects within
    def get_bin_requests(self, bin_url):
        query = f"""
        SELECT requests.mongodb_doc_id
        FROM requests
        INNER JOIN bins ON requests.bin_id = bins.id
        WHERE bins.path = '{bin_url}';
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

    # database.delete_bin(bin_url)
    def delete_bin(self, bin_url):
        query = f"""
        DELETE FROM bins WHERE path = '{bin_url}';
        """

        with self.connection:
            with self.connection.cursor() as cursor:
                cursor.execute(query)
                rows_deleted = cursor.rowcount

        return f"{rows_deleted} bin(s) deleted in this operation."
    
    # database.delete_bin_requests(bin_url)
    def delete_bin_requests(self, bin_url):
        query = f"""
        DELETE FROM requests
        WHERE bin_id IN (
          SELECT id FROM bins
          WHERE path = '{bin_url}'
        );
        """

        with self.connection:
            with self.connection.cursor() as cursor:
                cursor.execute(query)
                rows_deleted = cursor.rowcount

        return f"{rows_deleted} request(s) deleted in this operation."


