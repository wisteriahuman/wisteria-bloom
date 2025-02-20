.PHONY: front
front:
	docker compose -f frontend/docker-compose.yml build --no-cache
	docker compose -f frontend/docker-compose.yml up

.PHONY: back
back:
	docker compose -f backend/docker-compose.yml build --no-cache
	docker compose -f backend/docker-compose.yml up