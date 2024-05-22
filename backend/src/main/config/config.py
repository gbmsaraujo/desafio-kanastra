from celery import Celery
from flask import Flask
from flask_mail import Mail
from flask_cors import CORS
from src.constants.constants import constants


def make_celery(app: Flask):
    celery = Celery(
        app.import_name,
        broker=constants.CELERY_BROKER_URL,
        backend=constants.CELERY_RESULT_BACKEND,
        task_ignore_result=False,
    )
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery


def create_app():
    app = Flask(__name__)
    app.config["MAIL_SERVER"] = constants.MAIL_SERVER
    app.config["MAIL_PORT"] = constants.MAIL_PORT
    app.config["MAIL_USE_TLS"] = True  
    app.config["MAIL_USE_SSL"] = False
    app.config["MAIL_USERNAME"] = constants.MAIL_USERNAME
    app.config["MAIL_PASSWORD"] = constants.MAIL_PASSWORD 

    mail = Mail(app)

    celery = make_celery(app)

    CORS(app)
    

    return app, mail, celery
