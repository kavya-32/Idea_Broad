# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Build the Next.js app (skip ESLint)
RUN NEXT_PUBLIC_SKIP_ESLINT=true npm run build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

