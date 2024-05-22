from src.data.interface.db_interface import IMongoRepository
from src.drivers.interfaces.pandas_interface import IPandas


class SlipsController:

    def __init__(self, pandas: IPandas, mongo_db: IMongoRepository) -> None:
        self.pd = pandas
        self.mongo_db = mongo_db

    def get_all_historics(self):
        try:
            query = self.mongo_db.find(collection="historics")

            data = [
                {
                    "id": str(historic["_id"]),
                    "filename": historic["file_name"],
                    "created_at": historic["created_at"],
                }
                for historic in query
            ]

            return data
        except Exception as e:
            raise Exception(f"Erro ao executar get_all_historics: {str(e)}")

    def commit_historic_db(self, filename: str, current_date: str):
        payload = {"file_name": filename, "created_at": current_date}
        self.mongo_db.insert_one("historics", payload)

    def handle_data(self, path_csv):
        try:
            df = self.pd.create_csv_dataframe(path_csv)

            data = [self.__slips_factory(row) for _, row in df.iterrows()]

            return data
        except Exception as e:
            raise Exception(f"Erro ao executar handle_data: {str(e)}")

    def __slips_factory(self, row):
        return {
            "name": row["name"],
            "government_id": row["governmentId"],
            "email": row["email"],
            "debt_amount": row["debtAmount"],
            "debt_due_date": row["debtDueDate"],
            "debt_id": row["debtId"],
        }
