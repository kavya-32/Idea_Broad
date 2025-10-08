# Use slim Python 3.11 image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Upgrade pip and install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the rest of the code
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose the port from Render environment variable
ENV PORT 8000
EXPOSE $PORT

# Run the app using Gunicorn
CMD ["sh", "-c", "gunicorn ideaboard_api.wsgi:application --bind 0.0.0.0:$PORT"]
