import os
from pathlib import Path

# BASE_DIR points to the project root (where manage.py is)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-7*gd69(lh5pmc@+nl2+9fwg=wf@q8x_b&#7@qvunn*!inov)1&') # FIX: Get SECRET_KEY from environment
DEBUG = os.environ.get('DEBUG', 'True') == 'True' # FIX: Get DEBUG from environment

# Allow all hosts for Render demo
ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'ideas',
]

# FIX: CORS Configuration for Vercel and Render
CORS_ALLOWED_ORIGINS = [
    # 1. Your Render Backend URL
    "https://idea-broad-4.onrender.com",
    # 2. Your Vercel Preview URL (The one you provided)
    "https://idea-broad-kavya-git-main-kavya-baghels-projects.vercel.app",
    # 3. Your Vercel Production URL (Always include the root domain)
    "https://idea-broad-kavya.vercel.app",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS must come before CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ideaboard_api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ideaboard_api.wsgi.application'

# Database
# FIX: Use the Render Persistent Disk path for SQLite to prevent container crash.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        # CRITICAL FIX: Assumes Render Disk Mount Path is /var/data
        'NAME': '/var/data/db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
