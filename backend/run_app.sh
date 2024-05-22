#!/bin/bash

# Start Flask application
echo "Starting Flask application..."
python3 run.py &

# Start Celery worker for processing queue
echo "Starting Celery worker for processing..."
celery -A celery_worker.celery worker -l info -Q processing &

# Start Celery worker for email sending queue
echo "Starting Celery worker for email sending..."
celery -A celery_worker.celery worker -l info -Q email_sending &

# Wait and keep script running
wait
