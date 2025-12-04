.PHONY: run-dev logs-dev stop-dev build-dev startup-dev restart-dev

### shortcuts/aliases

# Unified startup command so you have to type it only once
startup-dev:
	cd frontend && npm install && cd ..
	@make build-dev
	@make run-dev

restart-dev:
	@make stop-dev
	@make startup-dev

###

# TODO "build-dev" currently does not build the frontend container properly
# only the dev container works.
build-dev:
	docker compose build backend db

# Run dev containers (hot reload + backend + db)
run-dev:
	docker compose up frontend-dev backend db

# View logs of dev containers
logs-dev:
	docker compose logs -f frontend-dev backend db

# Stop only the dev containers
stop-dev:
	docker compose stop frontend-dev backend db

format:
	cd frontend && npm run format