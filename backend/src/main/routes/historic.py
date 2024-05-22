from celery import chain
from src.main.tasks.tasks import process_csv, send_email
from src.main.composer.slips_composer import slips_composer
from src.main.adapter.request_adapter import request_adapter
from src.utils.utils import save_csv_file
from flask import Blueprint, request


historic = Blueprint("historic", __name__)


@historic.route("/historics", methods=["GET"])
def get_historic():
    try:
        data = slips_composer().get_all_historics()
        return {
            "message": "Busca de históricos realizada com sucesso!",
            "status_code": 200,
            "response": data
        }, 200

    except Exception as e:
        print(e)
        return {
            "message": f"Um erro ocorreu ao buscar histórico",
            "status_code": 500,
        }, 500
