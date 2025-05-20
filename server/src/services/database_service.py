from flask import jsonify
import json
import boto3
from botocore.exceptions import ClientError
from pymongo import MongoClient
import psycopg2
from bson.objectid import ObjectId

def get_mongodb_uri(credentials):
    username = credentials['username']
    password = credentials['password']
    host = credentials['host']
    port = credentials['port']
    remaining_string = '?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false'

    return f'mongodb://{username}:{password}@{host}:{port}/{remaining_string}'


def get_db_credentials():
    postgres_secret_name = "postgresql-rds-cred"
    mongodb_secret_name = "mongodb-docdb-cred"
    region_name = "us-east-1"

    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        postgres_secret_response = client.get_secret_value(
            SecretId=postgres_secret_name
        )

        mongodb_secret_response = client.get_secret_value(
            SecretId=mongodb_secret_name
        )

    except ClientError as e:
        raise e

    postgres_credentials = json.loads(postgres_secret_response['SecretString'])
    mongodb_credentials = json.loads(mongodb_secret_response['SecretString'])

    return [postgres_credentials, get_mongodb_uri(mongodb_credentials)]


def get_db_uri_params():
    requested_params = [
        'mongodb-ec2-uri',
        'postgres-port',
        'postgres-ip',
        'mongodb-request-bin-dbname',
        'postgres-request-bin-dbname',
    ]

    region_name = "us-east-1"

    session = boto3.session.Session()
    client = session.client(
        service_name='ssm',
        region_name=region_name
    )

    try:
        get_params_response = client.get_parameters(
	    Names=requested_params,
            WithDecryption=True
        )
    except ClientError as e:
        raise e

    params = get_params_response['Parameters']
    uri_values = { param['Name']:param['Value'] for param in params }
	
    return uri_values


class DatabaseService:
    def __init__(self):
        postgres_credentials, mongodb_URI = get_db_credentials()
        db_uri_params = get_db_uri_params()
        mongodb_dbname = db_uri_params['mongodb-request-bin-dbname']

        self.mongo_client = MongoClient(mongodb_URI)
        self.mongo_db = self.mongo_client[mongodb_dbname]
        self.connection = psycopg2.connect(
            dbname=db_uri_params['postgres-request-bin-dbname'],
            user=postgres_credentials['username'],
            password=postgres_credentials['password'],
            host=db_uri_params['postgres-ip'],
	    port=db_uri_params['postgres-port']
        )

    def get_paths(self):
        query = """
        SELECT path FROM bins;
        """
    
        with self.connection:
            with self.connection.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()
    
        return result

    def get_all_bins(self):
        query = f"""
        SELECT path FROM bins;
        """

        with self.connection:
            with self.connection.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()

        return result

    def create_bin(self, bin_url):
        query = f"""
        INSERT INTO Bins (path) VALUES ('{bin_url}');
        """

        with self.connection:
            with self.connection.cursor() as cursor:
                cursor.execute(query)

        return bin_url

    def get_bin_requests(self, bin_url):
        query = f"""
        SELECT requests.mongodb_doc_id
        FROM requests
        LEFT JOIN bins ON requests.bin_id = bins.id
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

    def delete_bin(self, bin_url):
        query = f"""
        DELETE FROM bins WHERE path = '{bin_url}';
        """

        with self.connection:
            with self.connection.cursor() as cursor:
                cursor.execute(query)
                rows_deleted = cursor.rowcount
        return f"{rows_deleted} bin(s) deleted in this operation."

    def get_collection(self, collection_name):
        return self.mongo_db[collection_name]

    def write_req(self, payload):
        path = payload["bin_url"]
        mongo_db_object_id = self.get_collection("Requests").insert_one(payload)

        query1 = f"""
        SELECT id FROM bins WHERE path = '{path}';
        """

        with self.connection:
            with self.connection.cursor() as cursor:
                cursor.execute(query1)
                result = cursor.fetchall()

        query2 = f"""
        INSERT INTO requests (bin_id, mongodb_doc_id)
        VALUES ('{result[0][0]}' , '{mongo_db_object_id.inserted_id}');
        """

        with self.connection:
            with self.connection.cursor() as cursor:
                cursor.execute(query2)


        return mongo_db_object_id.inserted_id
      
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
