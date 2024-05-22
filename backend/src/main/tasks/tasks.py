import json
from flask import render_template
import redis
from src.main.composer.slips_composer import slips_composer
from flask_mail import Message
from src.main.factory import app, mail, celery
from src.constants.constants import constants
from src.utils.utils import generate_template_mail

redis_client = redis.StrictRedis(host="redis", port=6379, db=0)


@celery.task(queue="processing")
def process_csv(file_path):
    try:
        redis_client.flushall()
        data = slips_composer().handle_data(file_path)
        for info in data:
            redis_client.rpush("email_queue", json.dumps(info))
    except Exception as e:
        raise Exception(f"Um erro ocorreu ao processar cvs queue: {str(e)}")


@celery.task(queue="email_sending")
def send_email():
    try:
        while redis_client.llen("email_queue") > 0:
            _, info = redis_client.blpop("email_queue")
            info = json.loads(info)
            with app.app_context():

                print(f"E-mail enviado para {info['email']}")

                # Aqui poderia ser adicionado para enviar nosso template email para cada usuário :)

                # msg = Message(
                #     subject="Cobrança de boleto",
                #     sender=constants.MAIL_USERNAME,
                #     recipients=[info["email"]],
                # )
                # msg.html = generate_template_mail(
                #     name=info["name"],
                #     government_id=info["government_id"],
                #     debt_amount=info["debt_amount"],
                #     debt_due_date=info["debt_due_date"],
                #     debt_id=info["debt_id"],
                # )

                # mail.send(msg)
        return "E-mails enviados com sucesso!"
    except Exception as e:
        raise Exception(f"Um erro ocorreu ao enviar e-mail: {str(e)}")
