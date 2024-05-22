from src.main.factory import app
from src.main.tasks.tasks import redis_client

if __name__ == "__main__":
    redis_client.flushall()
    app.run(debug=True, host="0.0.0.0", port=5000)
