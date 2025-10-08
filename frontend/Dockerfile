# Use Node.js 20 Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build the React app for production
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Expose port
ENV PORT 3000
EXPOSE $PORT

# Run the app using serve
CMD ["sh", "-c", "serve -s build -l $PORT"]
