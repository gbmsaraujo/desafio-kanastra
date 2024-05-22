import json
from src.main.composer.slips_composer import slips_composer
from src.main.tasks.tests.conftest import redis_instace


file_path_mock = "./src/mocks/csv_data.csv"


def test_process_csv(redis_instace):
    data = slips_composer().handle_data(file_path_mock)
    redis_instace.rpush("email_queue", json.dumps(data[0]))

    assert isinstance(data, list) == True
    assert data[0]["name"] == "Elijah Santos"
    assert redis_instace.llen("email_queue") == 1

def test_send_email(redis_instace):
    emails = []
    while redis_instace.llen("email_queue") > 0:
        _, info = redis_instace.blpop("email_queue")
        info = json.loads(info)
        emails.append({"message":f"E-mail enviado para {info['email']}"})

    assert len(emails) > 0
    assert emails[0]["message"] == "E-mail enviado para janet95@example.com"
