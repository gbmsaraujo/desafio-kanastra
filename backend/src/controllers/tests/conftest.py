import pytest
from src.data.repositories.mongo_repository import MongoRepository
from src.data.config.db_config import DatabaseConfig
from src.controllers.slips_controller import SlipsController
from src.drivers.pandas import PandasDriver


@pytest.fixture()
def slips_controller_instance():
    pandas = PandasDriver()
    mongo_db = MongoRepository()
    yield SlipsController(pandas, mongo_db)


@pytest.fixture()
def db_mongo_instance():
    with DatabaseConfig(host="localhost", db_name="tests") as conn:
        yield conn


def db_clean_mongo_collection():
    with DatabaseConfig() as conn:
        conn.db["historics"].delete_many({})
