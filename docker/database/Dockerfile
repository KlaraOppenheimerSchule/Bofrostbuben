FROM postgres:16-alpine

# Optional: copy initialization scripts into the container
# These will be executed automatically in alphabetical order
# the first time the database is created.
# Place .sql or .sh files inside docker/database/init/
#COPY init/ /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432