# 📦 CODE SOURCE COMPLET - TAKKU AVENIR

Ce document contient le code source de TOUS les fichiers nécessaires pour l'application.

## 🎯 STRUCTURE COMPLÈTE

```
takku_avenir/
├── backend/
│   ├── config/settings.py          ✅ Créé
│   ├── config/urls.py              📝 À créer
│   ├── users/models.py             ✅ Créé
│   ├── users/serializers.py        📝 À créer
│   ├── users/views.py              📝 À créer
│   ├── careers/models.py           ✅ Créé
│   ├── universities/models.py      ✅ Créé
│   ├── orientation/models.py       ✅ Créé
│   └── requirements.txt            ✅ Créé
│
└── frontend/
    ├── src/App.js                  ✅ Créé
    ├── src/pages/Home.js           ✅ Créé
    ├── src/components/Navbar.js    ✅ Créé
    ├── src/services/api.js         ✅ Créé
    └── package.json                ✅ Créé
```

---

## 📝 FICHIERS À CRÉER MANUELLEMENT

### 1. backend/config/urls.py

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/careers/', include('careers.urls')),
    path('api/universities/', include('universities.urls')),
    path('api/orientation/', include('orientation.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### 2. backend/users/serializers.py

```python
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                 'phone', 'school', 'grade', 'series', 'interests', 'role']
        read_only_fields = ['id']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 
                 'first_name', 'last_name', 'phone', 'school', 'grade', 'series']

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Les mots de passe ne correspondent pas")
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
```

### 3. backend/users/views.py

```python
from rest_framework import status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer

class RegisterView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'user': UserSerializer(user).data,
                'message': 'Inscription réussie'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )
            if user:
                login(request, user)
                return Response({
                    'user': UserSerializer(user).data,
                    'message': 'Connexion réussie'
                })
            return Response({'error': 'Identifiants invalides'}, 
                          status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({'message': 'Déconnexion réussie'})

class ProfileView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

### 4. backend/users/urls.py

```python
from django.urls import path
from .views import RegisterView, LoginView, LogoutView, ProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='profile'),
]
```

### 5. backend/users/admin.py

```python
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'school', 'grade', 'series', 'role']
    list_filter = ['role', 'grade', 'series', 'school']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Informations additionnelles', {
            'fields': ('phone', 'school', 'grade', 'series', 'interests', 'role')
        }),
    )
```

### 6. backend/careers/admin.py

```python
from django.contrib import admin
from .models import Career, Favorite

@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'required_education', 'market_demand', 'is_active']
    list_filter = ['category', 'required_education', 'market_demand', 'is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    
    fieldsets = (
        ('Informations générales', {
            'fields': ('name', 'slug', 'category', 'description', 'daily_routine')
        }),
        ('Formation', {
            'fields': ('required_education', 'required_skills', 'recommended_series')
        }),
        ('Perspectives', {
            'fields': ('salary_entry', 'salary_5years', 'market_demand')
        }),
        ('Témoignages', {
            'fields': ('video_url', 'testimonial_text', 'testimonial_author')
        }),
        ('Statut', {
            'fields': ('is_active',)
        }),
    )

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ['user', 'career', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'career__name']
```

### 7. frontend/src/components/Footer.js

```javascript
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-primary">TAKKU</span>
              <span className="text-2xl font-light text-secondary">AVENIR</span>
            </div>
            <p className="text-gray-400 text-sm">
              Projet des Olympiades du Savoir 2026
              <br />
              Lycée Galandou Diouf
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white">Accueil</Link></li>
              <li><Link to="/careers" className="hover:text-white">Métiers</Link></li>
              <li><Link to="/universities" className="hover:text-white">Universités</Link></li>
              <li><Link to="/test" className="hover:text-white">Test d'orientation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">À propos</a></li>
              <li><a href="#" className="hover:text-white">Mentions légales</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>takku.avenir@galandoudiouf.sn</li>
              <li>Dakar, Sénégal</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2026 TAKKU AVENIR - Tous droits réservés. Fait avec ❤️ par l'équipe Galandou Diouf</p>
        </div>
      </div>
    </footer>
  );
}
```

### 8. frontend/src/components/ProtectedRoute.js

```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function ProtectedRoute({ children }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

### 9. frontend/src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply box-border;
  }

  body {
    @apply font-sans antialiased;
  }
}

@layer components {
  .btn {
    @apply px-6 py-3 rounded-lg font-semibold transition-all duration-200;
  }

  .btn-primary {
    @apply bg-primary text-white hover:bg-primary/90;
  }

  .btn-secondary {
    @apply bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white;
  }

  .card {
    @apply bg-white rounded-xl shadow-md p-6;
  }

  .input {
    @apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent;
  }
}
```

### 10. frontend/tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00A651',
        'primary-dark': '#008040',
        secondary: '#FCD116',
        tertiary: '#E31D1C',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

---

## 🚀 INSTRUCTIONS D'INSTALLATION

### Étape 1: Créer tous les fichiers

Copiez le contenu de chaque fichier ci-dessus dans le bon emplacement selon la structure indiquée.

### Étape 2: Installer les dépendances

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

### Étape 3: Initialiser la base de données

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### Étape 4: Lancer l'application

```bash
# Terminal 1 - Backend
cd backend
python manage.py runserver

# Terminal 2 - Frontend
cd frontend
npm start
```

---

## ✅ VÉRIFICATION

Votre application devrait être accessible sur :
- Frontend : http://localhost:3000
- Backend API : http://localhost:8000
- Admin Django : http://localhost:8000/admin

---

## 📝 PROCHAINES ÉTAPES

1. Ajouter des métiers dans l'admin Django
2. Ajouter des universités et filières
3. Créer les questions du test d'orientation
4. Personnaliser le design
5. Tester avec de vrais utilisateurs
6. Déployer en production

---

Bon développement ! 🚀
