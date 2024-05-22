from src.data.config.db_config import DatabaseConfig


class MongoRepository:

    def insert_one(self, collection: str, data: object):
        with DatabaseConfig() as conn:
            try:
                query = conn.db[collection].insert_one(data)
                return query

            except Exception as e:
                raise Exception(f"Erro ao inserir histórico no banco: {str(e)}")

    def find(self, collection="", query={}, projection={}):
        with DatabaseConfig() as conn:
            try:
                query = conn.db[collection].find(query)
                return list(query)

            except Exception as e:
                raise Exception(f"Erro ao buscar históricos no banco: {str(e)}")
