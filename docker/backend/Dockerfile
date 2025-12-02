FROM node:20.19.0-alpine

WORKDIR /app

# Copy backend dependencies
COPY backend/package*.json ./

RUN npm install

# Copy backend source code
COPY backend/ ./

EXPOSE 3000

CMD ["node", "src/index.js"]
