FROM node:20.19.0-alpine3.21

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json* ./

RUN npm install

COPY frontend/ ./