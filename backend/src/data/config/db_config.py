from pymongo import MongoClient


class DatabaseConfig():
    def __init__(self, host='mongodb', port=27017, db_name="slips_db"):
        self.host = host
        self.port = port
        self.db_name = db_name
        self.client = None

    def __enter__(self):
        self.client = MongoClient(self.host, self.port)
        self.db = self.client[self.db_name]
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.client.close()
