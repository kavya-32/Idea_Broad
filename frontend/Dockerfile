# Use Node 20 Alpine for smaller image
FROM node:20-alpine

WORKDIR /app

# Copy package files first to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port (Next.js default)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
