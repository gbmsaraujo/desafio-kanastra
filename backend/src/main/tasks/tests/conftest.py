import pytest
import redis


@pytest.fixture
def redis_instace():
    yield redis.StrictRedis(host="localhost", port=6379, db=0)
