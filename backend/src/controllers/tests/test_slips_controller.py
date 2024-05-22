import os
import pandas
from src.controllers.tests.conftest import (
    db_mongo_instance,
    slips_controller_instance,
    db_clean_mongo_collection,
)
from src.utils.utils import format_current_time


class TestSlipsController:

    def test_handle_data(self, slips_controller_instance):
        csv_mock = os.path.abspath("./src/mocks/csv_data.csv")

        data = slips_controller_instance.handle_data(csv_mock)

        assert isinstance(data, list) == True
        assert len(data) != 0
        assert "debt_amount" in data[0].keys()
        assert "name" in data[0].keys()
        assert "government_id" in data[0].keys()
        assert "debt_due_date" in data[0].keys()
        assert "debt_id" in data[0].keys()

    def test_integration_commit_historic_in_db(self, db_mongo_instance):
        current_date = format_current_time()
        directory, filename = os.path.split("./src/mocks/csv_data.csv")

        query_response = db_mongo_instance.db["historics"].insert_one(
            {"file_name": filename, "created_at": current_date}
        )

        query = db_mongo_instance.db["historics"].find_one(
            {"_id": query_response.inserted_id}
        )

        assert query["file_name"] == filename

    def test_get_all_historics(self, db_mongo_instance):
        query = db_mongo_instance.db["historics"].find({})

        data = [
            {
                "id": str(historic["_id"]),
                "filename": historic["file_name"],
                "created_at": historic["created_at"],
            }
            for historic in query
        ]

        assert isinstance(data, list) == True

        if data:
            assert "id" in data[0]
            assert "filename" in data[0]
            assert "created_at" in data[0]

    # def test_clean_collection(self):
    #     db_clean_mongo_collection()
