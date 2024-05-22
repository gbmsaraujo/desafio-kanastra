import pytest

from src.data.config.db_config import DatabaseConfig

@pytest.fixture
def mongo_instance():
    with DatabaseConfig(db_name="tests_db", host="localhost") as conn:
        yield conn.db["tests"]