FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./
RUN npm install

# Copy the rest of the code including .env
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
