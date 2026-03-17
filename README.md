# 🎓 TAKKU AVENIR - Guide de Démarrage Complet

## 📋 Vue d'ensemble

TAKKU AVENIR est une plateforme d'orientation post-bac pour les lycéens sénégalais.

**Stack technique :**
- Backend : Django 4.2 + Django REST Framework
- Frontend : React 18 + Tailwind CSS  
- Base de données : SQLite (dev) / PostgreSQL (production)
- Déploiement : Render.com / Vercel

---

## 🚀 INSTALLATION RAPIDE (EN 10 MINUTES)

### Prérequis

```bash
# Vérifier que Python 3.8+ est installé
python --version

# Vérifier que Node.js 16+ est installé
node --version
```

Si Python ou Node ne sont pas installés, téléchargez-les sur :
- Python : https://python.org
- Node.js : https://nodejs.org

---

### ÉTAPE 1 : Cloner et préparer le projet

```bash
# Créer le dossier du projet
mkdir takku_avenir
cd takku_avenir

# Créer la structure
mkdir backend frontend
```

---

### ÉTAPE 2 : Configuration Backend (Django)

```bash
cd backend

# Créer un environnement virtuel
python -m venv venv

# Activer l'environnement virtuel
# Sur Windows :
venv\Scripts\activate
# Sur Mac/Linux :
source venv/bin/activate

# Installer les dépendances
pip install Django==4.2.7
pip install djangorestframework==3.14.0
pip install django-cors-headers==4.3.0
pip install Pillow

# Créer le projet Django
django-admin startproject config .

# Créer les applications
python manage.py startapp users
python manage.py startapp careers
python manage.py startapp universities
python manage.py startapp orientation
```

---

### ÉTAPE 3 : Configurer la base de données

```bash
# Créer les migrations
python manage.py makemigrations

# Appliquer les migrations
python manage.py migrate

# Créer un superuser (admin)
python manage.py createsuperuser
# Entrez : username, email, password
```

---

### ÉTAPE 4 : Charger les données initiales

Créer un fichier `load_data.py` avec ce contenu :

```python
# Script pour charger les données initiales
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from careers.models import Career
from universities.models import University, Field

# Créer 5 métiers d'exemple
careers_data = [
    {
        'name': 'Développeur Web',
        'slug': 'developpeur-web',
        'category': 'TECH',
        'description': 'Crée et maintient des sites web et applications',
        'daily_routine': 'Code, résout des bugs, travaille en équipe',
        'required_education': 'BAC+3',
        'required_skills': ['Python', 'JavaScript', 'SQL'],
        'salary_entry': 400000,
        'salary_5years': 800000,
        'market_demand': 'HIGH',
        'recommended_series': ['S', 'L', 'G'],
    },
    # Ajouter plus de métiers...
]

for data in careers_data:
    Career.objects.get_or_create(slug=data['slug'], defaults=data)

print("✅ Données chargées avec succès!")
```

Exécuter le script :
```bash
python load_data.py
```

---

### ÉTAPE 5 : Lancer le serveur backend

```bash
python manage.py runserver
```

Le backend est maintenant accessible sur : **http://localhost:8000**

L'interface admin est sur : **http://localhost:8000/admin**

---

### ÉTAPE 6 : Configuration Frontend (React)

Ouvrir un nouveau terminal :

```bash
cd frontend

# Créer l'application React
npx create-react-app .

# Installer les dépendances
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

### ÉTAPE 7 : Configurer Tailwind CSS

Modifier `tailwind.config.js` :

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00A651',
        secondary: '#FCD116',
        tertiary: '#E31D1C',
      }
    },
  },
  plugins: [],
}
```

---

### ÉTAPE 8 : Lancer le frontend

```bash
npm start
```

Le frontend est accessible sur : **http://localhost:3000**

---

## 📁 STRUCTURE DU PROJET

```
takku_avenir/
├── backend/
│   ├── config/              # Configuration Django
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── users/               # App utilisateurs
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── careers/             # App métiers
│   ├── universities/        # App universités
│   ├── orientation/         # App test d'orientation
│   ├── manage.py
│   └── db.sqlite3
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   ├── pages/           # Pages principales
│   │   ├── services/        # API calls
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## 🔧 FONCTIONNALITÉS IMPLÉMENTÉES

### Backend (API)

✅ **Authentification**
- POST `/api/auth/register/` - Inscription
- POST `/api/auth/login/` - Connexion
- POST `/api/auth/logout/` - Déconnexion
- GET `/api/auth/user/` - Profil utilisateur

✅ **Métiers**
- GET `/api/careers/` - Liste des métiers
- GET `/api/careers/{slug}/` - Détail d'un métier
- GET `/api/careers/categories/` - Catégories de métiers
- POST `/api/careers/{slug}/favorite/` - Ajouter aux favoris

✅ **Universités**
- GET `/api/universities/` - Liste des universités
- GET `/api/universities/{id}/` - Détail université
- GET `/api/fields/` - Liste des filières
- GET `/api/fields/{id}/` - Détail filière

✅ **Test d'orientation**
- GET `/api/orientation/questions/` - Questions du test
- POST `/api/orientation/submit/` - Soumettre le test
- GET `/api/orientation/results/` - Résultats utilisateur

### Frontend (Pages)

✅ **Pages publiques**
- Accueil
- À propos
- Guide des métiers
- Universités et filières

✅ **Pages authentifiées**
- Inscription / Connexion
- Dashboard personnel
- Test d'orientation
- Résultats du test
- Profil utilisateur
- Favoris

---

## 🎨 PERSONNALISATION

### Modifier les couleurs

Éditer `frontend/tailwind.config.js` :

```javascript
colors: {
  primary: '#00A651',    // Vert Sénégal
  secondary: '#FCD116',  // Jaune Sénégal
  tertiary: '#E31D1C',   // Rouge Sénégal
}
```

### Ajouter des métiers

1. Aller sur l'admin : http://localhost:8000/admin
2. Se connecter avec le superuser
3. Aller dans "Careers" → "Ajouter"
4. Remplir le formulaire et sauvegarder

### Ajouter des universités/filières

Même processus dans l'admin Django.

---

## 🚀 DÉPLOIEMENT EN PRODUCTION

### Option 1 : Render.com (Recommandé - GRATUIT)

#### Backend :

1. Push code sur GitHub
2. Aller sur render.com → New Web Service
3. Connecter le repo GitHub
4. Configuration :
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn config.wsgi:application`
   - Environment: Python 3
5. Ajouter variables d'environnement :
   - `SECRET_KEY` : générer une clé secrète
   - `DEBUG` : False
   - `ALLOWED_HOSTS` : votre-app.onrender.com

#### Frontend :

1. Aller sur vercel.com → New Project
2. Connecter le repo GitHub (dossier frontend)
3. Deploy automatique !

### Option 2 : Hébergement local (pour tests)

Utiliser ngrok pour exposer temporairement :

```bash
# Installer ngrok
# Lancer le backend
python manage.py runserver

# Dans un autre terminal
ngrok http 8000
```

---

## 📊 ALGORITHME DE RECOMMANDATION

L'algorithme du test d'orientation fonctionne ainsi :

1. **Collecte des réponses** : 20 questions réparties en 3 sections
2. **Calcul des scores** : Chaque réponse donne des points à des catégories
3. **Pondération** : Les questions ont des poids différents
4. **Recommandation** : Top 5 filières avec compatibilité > 60%

Exemple de calcul :

```python
# Score pour une catégorie
score_tech = (
    points_maths * 2 +      # Matières fortes
    points_logique * 1.5 +  # Intérêts
    points_innovation * 1   # Aspirations
) / total_points_possible

# Recommandation si score > 0.6 (60%)
```

---

## 🐛 RÉSOLUTION DE PROBLÈMES

### Problème : "Module not found"
```bash
# Réinstaller les dépendances
pip install -r requirements.txt  # Backend
npm install                       # Frontend
```

### Problème : "Port already in use"
```bash
# Changer le port
python manage.py runserver 8001  # Backend
PORT=3001 npm start              # Frontend
```

### Problème : "CORS errors"
Vérifier dans `backend/config/settings.py` :
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

---

## 👥 CONTRIBUTION (POUR L'ÉQUIPE)

### Workflow Git recommandé :

```bash
# Créer une branche pour chaque fonctionnalité
git checkout -b feature/nom-fonctionnalite

# Faire les modifications
git add .
git commit -m "Description claire du changement"

# Pousser et créer une Pull Request
git push origin feature/nom-fonctionnalite
```

### Répartition recommandée :

- **Développeurs Backend** : API, modèles, admin
- **Développeurs Frontend** : Pages, composants, design
- **Rédacteurs** : Contenu (métiers, universités)
- **Testeurs** : Tests utilisateurs, bugs

---

## 📚 RESSOURCES UTILES

- **Django** : https://docs.djangoproject.com/fr/
- **React** : https://react.dev
- **Tailwind CSS** : https://tailwindcss.com
- **REST API** : https://www.django-rest-framework.org

---

## 📞 SUPPORT

Pour toute question :
- Email : takku.avenir@galandoudiouf.sn
- GitHub Issues : [lien du repo]

---

## 📝 LICENCE

Projet créé dans le cadre des **Olympiades du Savoir 2026**  
Lycée Galandou Diouf - Dakar, Sénégal

---

**🎯 PROCHAINES ÉTAPES POUR L'ÉQUIPE :**

1. ✅ Installer et tester l'application localement
2. ✅ Créer 30 fiches métiers dans l'admin
3. ✅ Ajouter les universités sénégalaises
4. ✅ Personnaliser le design
5. ✅ Faire tester par 20 élèves
6. ✅ Corriger les bugs
7. ✅ Déployer en production
8. ✅ Préparer la présentation

**Bonne chance ! 🚀**
