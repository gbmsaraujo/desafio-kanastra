from src.main.tasks.tasks import process_csv, send_email
from src.main.composer.slips_composer import slips_composer
from src.main.adapter.request_adapter import request_adapter
from src.utils.utils import save_csv_file
from flask import Blueprint, request


upload = Blueprint("upload", __name__)


@upload.route("/")
def home():
    return "Olá, Api Kanastra"


@upload.route("/upload", methods=["POST"])
def upload_data():
    try:
        req = request_adapter(request).files
        if not req["file"].filename.endswith(".csv"):
            return "Erro"

        file_info = save_csv_file(req)

        slips_composer().commit_historic_db(
            filename=file_info["filename"], current_date=file_info["created_at"]
        )

        result = process_csv.delay(file_info["filepath"])
        result.get()
        send_email.delay()

        return {
            "message": "Os seus dados estão em processamento e logo os boletos serão enviados via e-mail",
            "status_code": 200,
        }, 200

    except Exception as e:
        return {
            "message" : f"Um erro ocorreu ao fazer upload: {str(e)}",
            "status_code":500
        }, 500
