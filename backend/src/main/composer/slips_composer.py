from src.controllers.slips_controller import SlipsController
from src.data.repositories.mongo_repository import MongoRepository
from src.drivers.pandas import PandasDriver


def slips_composer():
    pandas = PandasDriver()
    mongo_db = MongoRepository()
    return SlipsController(pandas, mongo_db)
