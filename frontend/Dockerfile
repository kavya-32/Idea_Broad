# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first to leverage caching
COPY package*.json ./
RUN npm install

# Copy all source code and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output to Nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (Render uses this for web services)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
