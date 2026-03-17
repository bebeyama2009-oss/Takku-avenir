#!/bin/bash
# TAKKU AVENIR - Script d'installation automatique
# Ce script crée toute la structure du projet

echo "🚀 Installation de TAKKU AVENIR..."

# Créer la structure backend
mkdir -p backend/config backend/users backend/careers backend/universities backend/orientation

# ============ BACKEND FILES ============

# 1. requirements.txt
cat > backend/requirements.txt << 'EOF'
Django==4.2.7
djangorestframework==4.2.0
django-cors-headers==4.3.0
Pillow==10.1.0
gunicorn==21.2.0
EOF

# 2. Backend config/settings.py
cat > backend/config/settings.py << 'EOF'
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-insecure-change-this-in-production'
DEBUG = True
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'users',
    'careers',
    'universities',
    'orientation',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [],
    'APP_DIRS': True,
    'OPTIONS': {
        'context_processors': [
            'django.template.context_processors.debug',
            'django.template.context_processors.request',
            'django.contrib.auth.context_processors.auth',
            'django.contrib.messages.context_processors.messages',
        ],
    },
}]

WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', 'OPTIONS': {'min_length': 8}},
]

LANGUAGE_CODE = 'fr-fr'
TIME_ZONE = 'Africa/Dakar'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
AUTH_USER_MODEL = 'users.User'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
EOF

# 3. Backend config/urls.py
cat > backend/config/urls.py << 'EOF'
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
]
EOF

# 4. User model
cat > backend/users/models.py << 'EOF'
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    GRADE_CHOICES = [
        ('SECONDE', 'Seconde'),
        ('PREMIERE', 'Première'),
        ('TERMINALE', 'Terminale'),
    ]
    
    SERIES_CHOICES = [
        ('S', 'Série S'),
        ('L', 'Série L'),
        ('L2', "Série L'"),
        ('G', 'Série G'),
    ]
    
    ROLE_CHOICES = [
        ('STUDENT', 'Élève'),
        ('TEACHER', 'Enseignant'),
        ('ALUMNI', 'Ancien élève'),
        ('ADMIN', 'Administrateur'),
    ]
    
    phone = models.CharField(max_length=20, blank=True)
    school = models.CharField(max_length=200, default='Lycée Galandou Diouf')
    grade = models.CharField(max_length=20, choices=GRADE_CHOICES, blank=True)
    series = models.CharField(max_length=10, choices=SERIES_CHOICES, blank=True)
    interests = models.JSONField(default=list, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='STUDENT')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.get_full_name()} - {self.school}"
EOF

# 5. User admin
cat > backend/users/admin.py << 'EOF'
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'school', 'grade', 'series', 'role']
    list_filter = ['role', 'grade', 'series', 'school']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Infos additionnelles', {
            'fields': ('phone', 'school', 'grade', 'series', 'interests', 'role')
        }),
    )
EOF

# Créer les fichiers __init__.py
touch backend/config/__init__.py
touch backend/users/__init__.py
touch backend/careers/__init__.py
touch backend/universities/__init__.py
touch backend/orientation/__init__.py

echo ""
echo "✅ Structure backend créée!"
echo ""
echo "📝 Prochaines étapes:"
echo ""
echo "1. Installer les dépendances:"
echo "   cd backend"
echo "   python -m venv venv"
echo "   source venv/bin/activate  # Windows: venv\\Scripts\\activate"
echo "   pip install -r requirements.txt"
echo ""
echo "2. Créer Django project:"
echo "   django-admin startproject config ."
echo ""
echo "3. Initialiser la base de données:"
echo "   python manage.py makemigrations"
echo "   python manage.py migrate"
echo "   python manage.py createsuperuser"
echo ""
echo "4. Lancer le serveur:"
echo "   python manage.py runserver"
echo ""
echo "🎉 Backend prêt sur http://localhost:8000"
echo ""
