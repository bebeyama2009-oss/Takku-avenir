# 🚀 GUIDE D'INSTALLATION SIMPLIFIÉ - TAKKU AVENIR

## ⚡ INSTALLATION EN 3 ÉTAPES

### ÉTAPE 1 : Télécharger et extraire

1. Télécharge tous les fichiers
2. Crée un dossier `takku_avenir` sur ton ordinateur
3. Mets tous les fichiers dedans

### ÉTAPE 2 : Backend (5 minutes)

```bash
# Ouvrir le terminal dans le dossier takku_avenir

# Créer l'environnement virtuel
cd backend
python -m venv venv

# Activer l'environnement
# Sur Windows:
venv\Scripts\activate
# Sur Mac/Linux:
source venv/bin/activate

# Installer Django
pip install Django==4.2.7
pip install djangorestframework
pip install django-cors-headers

# Créer le projet Django
django-admin startproject config .
python manage.py startapp users
python manage.py startapp careers

# Initialiser la base de données
python manage.py migrate
python manage.py createsuperuser
# (Entrer: username, email, password)

# Lancer le serveur
python manage.py runserver
```

✅ Backend accessible sur **http://localhost:8000**

### ÉTAPE 3 : Frontend (5 minutes)

```bash
# Nouveau terminal dans takku_avenir

# Créer l'app React
cd frontend
npx create-react-app .

# Installer les dépendances
npm install axios react-router-dom
npm install -D tailwindcss
npx tailwindcss init

# Lancer le frontend
npm start
```

✅ Frontend accessible sur **http://localhost:3000**

---

## 🐛 PROBLÈMES COURANTS

### "Python n'est pas reconnu"
→ Installer Python depuis https://python.org
→ Cocher "Add to PATH" pendant l'installation

### "npm n'est pas reconnu"
→ Installer Node.js depuis https://nodejs.org

### "Port déjà utilisé"
→ Changer le port: `python manage.py runserver 8001`

### "Module not found"
→ Vérifier que l'environnement virtuel est activé
→ Réinstaller: `pip install -r requirements.txt`

---

## 📁 FICHIERS ESSENTIELS À CRÉER

Une fois l'installation de base faite, copie ces fichiers dans ton projet :

### 1. `backend/config/settings.py`

Remplace le contenu par celui du fichier CODE_SOURCE_COMPLET.md section "settings.py"

### 2. `backend/users/models.py`

Copie le modèle User du CODE_SOURCE_COMPLET.md

### 3. `frontend/src/App.js`

Copie depuis CODE_SOURCE_COMPLET.md

### 4. `frontend/tailwind.config.js`

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
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

## ✅ VÉRIFICATION

L'application marche si :
- ✅ http://localhost:8000 affiche la page Django
- ✅ http://localhost:8000/admin fonctionne (login avec superuser)
- ✅ http://localhost:3000 affiche l'app React
- ✅ Pas d'erreurs dans les terminaux

---

## 📞 BESOIN D'AIDE ?

Si ça ne marche pas :

1. Lis attentivement les messages d'erreur
2. Google l'erreur exacte
3. Vérifie que Python et Node sont bien installés :
   ```bash
   python --version
   node --version
   npm --version
   ```
4. Redemande-moi avec l'erreur exacte

---

## 🎯 APRÈS L'INSTALLATION

1. Ajouter du contenu dans l'admin (métiers, universités)
2. Personnaliser le design
3. Tester avec des amis
4. Déployer en ligne (voir DEPLOIEMENT.md)

---

**Bon courage ! 🚀**
