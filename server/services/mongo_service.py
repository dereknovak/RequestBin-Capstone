from pymongo import MongoClient

class MongoService:
    def __init__(self, connection_string, db_name):
        self.client = MongoClient(connection_string)
        self.db = self.client[db_name]
    
    def get_collection(self, collection_name):
        return self.db[collection_name]
    
    # CRUD operations
    def find_all(self, collection_name):
        return list(self.get_collection(collection_name).find({}, {'_id': 0}))
    
    def insert_one(self, collection_name, document):
        return self.get_collection(collection_name).insert_one(document)
    
    def delete_all(self, collection_name):
        """Delete all documents from a collection."""
        result = self.get_collection(collection_name).delete_many({})
        return f"{result.deleted_count} items deleted."
