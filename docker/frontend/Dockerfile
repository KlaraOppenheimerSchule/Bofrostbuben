# Stage 1: Build Vue app
FROM node:20.19.0-alpine AS build

WORKDIR /app

# Copy package.json and lockfile
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app source
COPY frontend/ .

# Build Vue app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]