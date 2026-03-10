FROM mongo:latest

# Seed-Scripts werden beim ersten Start automatisch ausgeführt
COPY docker/database/init/ /docker-entrypoint-initdb.d/

EXPOSE 27017
