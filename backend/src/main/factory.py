from src.main.config.config import create_app

app, mail, celery = create_app()

from src.main.routes.upload import upload as upload_bp
from src.main.routes.historic import historic

app.register_blueprint(upload_bp)
app.register_blueprint(historic)
