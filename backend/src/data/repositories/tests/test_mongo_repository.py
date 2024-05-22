from src.data.repositories.tests.conftest import mongo_instance
from src.utils.utils import format_current_time


mock_item = {"filename": "test_pytest.csv", "created_at": format_current_time()}

def test_insert_one(mongo_instance):
    result = mongo_instance.insert_one(mock_item)

    mock_item["id"] = result.inserted_id 

    assert result.acknowledged == True


def test_find(mongo_instance):
    query = mongo_instance.find_one({"_id": mock_item["id"]})

    assert query["filename"] == mock_item["filename"]
    assert query["created_at"] == mock_item["created_at"]
