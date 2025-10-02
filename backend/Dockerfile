FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential libpq-dev git && rm -rf /var/lib/apt/lists/*

# Copy only requirements first to leverage caching
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the rest of the code
COPY . .

EXPOSE 8000
