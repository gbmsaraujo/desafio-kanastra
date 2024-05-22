# Variables
DOCKER_COMPOSE_FILE = docker-compose.yaml

# Default target
.PHONY: help
help:
	@echo "Usage:"
	@echo "  make build       Build all services"
	@echo "  make up          Start all services"
	@echo "  make stop        Stop all services"
	@echo "  make restart     Restart all services"
	@echo "  make logs        View logs of all services"
	@echo "  make down       Remove all services and volumes"

# Build all services
.PHONY: build
build:
	docker-compose -f $(DOCKER_COMPOSE_FILE) build

# Start all services
.PHONY: up
up:
	docker-compose -f $(DOCKER_COMPOSE_FILE) up -d

# Stop all services
.PHONY: stop
stop:
	docker-compose -f $(DOCKER_COMPOSE_FILE) stop

# Restart all services
.PHONY: restart
restart: down up

# View logs of all services
.PHONY: logs
logs:
	docker-compose -f $(DOCKER_COMPOSE_FILE) logs -f

# Remove all services and volumes
.PHONY: down
clean:
	docker-compose -f $(DOCKER_COMPOSE_FILE) down -v
