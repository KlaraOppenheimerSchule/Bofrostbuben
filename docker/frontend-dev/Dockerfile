FROM node:20.19.0-alpine

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json* ./

RUN npm ci

COPY frontend/ ./
