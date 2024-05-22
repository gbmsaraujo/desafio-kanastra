from datetime import datetime
import os
from werkzeug.utils import secure_filename


def format_current_time():
    # Get the current date and time
    current_datetime = datetime.now()

    # Format the current date and time
    formatted_datetime = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

    return formatted_datetime


def save_csv_file(req):
    try:
        file = req["file"]

        filename = secure_filename(file.filename)

        if not os.path.isdir("./src/assets"):
            os.mkdir("./src/assets")

        filepath = os.path.join("./src/assets", filename)
        file.save(filepath)

        return {
            "filename": filename,
            "filepath": filepath,
            "created_at": format_current_time(),
        }
    except Exception as e:
        raise Exception(f"Erro ao salvar arquivo csv: {str(e)}")


def generate_template_mail(name, government_id, debt_amount, debt_due_date, debt_id):
    try:
        return f"""<p>Olá { name },</p>

            <p>
                Gostaríamos de informar que você possui um débito pendente conosco.
                Abaixo estão os detalhes do débito:
            </p>

            <ul>
                <li><strong>Nome:</strong> { name }</li>
                <li><strong>Número do Documento:</strong> { government_id }</li>
                <li><strong>Valor:</strong> R$ { debt_amount }</li>
                <li><strong>Data para ser paga:</strong> { debt_due_date }</li>
                <li><strong>ID do Débito:</strong> { debt_id }</li>
            </ul>

            <p>
                Por favor, tome as providências necessárias para efetuar o pagamento
                até a data especificada.
            </p>

            <p>
                Se você tiver alguma dúvida ou precisar de mais informações, não
                hesite em nos contatar.
            </p>

            <p>
                Atenciosamente,<br />
                Kanastra
            </p>"""
    except Exception as e:
        raise Exception(f"Um erro ocorreu ao gerar template email: {str(e)}")
