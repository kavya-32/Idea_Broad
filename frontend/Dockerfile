FROM node:20-alpine

WORKDIR /app

# Copy package files first to leverage caching
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
