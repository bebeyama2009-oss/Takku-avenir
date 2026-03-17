# 🚀 GUIDE DE DÉPLOIEMENT - TAKKU AVENIR

## OPTION 1 : Déploiement sur Render.com + Vercel (100% GRATUIT)

### Préparation

1. Créer un compte GitHub : https://github.com
2. Créer un compte Render : https://render.com  
3. Créer un compte Vercel : https://vercel.com

---

### ÉTAPE 1 : Pousser le code sur GitHub

```bash
# Initialiser git
cd takku_avenir
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - TAKKU AVENIR"

# Créer un repo sur GitHub.com (bouton "New repository")
# Puis connecter et pousser :
git remote add origin https://github.com/VOTRE-USERNAME/takku-avenir.git
git branch -M main
git push -u origin main
```

---

### ÉTAPE 2 : Déployer le Backend sur Render

1. Aller sur render.com → "New" → "Web Service"

2. Connecter votre repo GitHub

3. Configuration :
   ```
   Name: takku-avenir-api
   Environment: Python 3
   Build Command: pip install -r backend/requirements.txt
   Start Command: cd backend && gunicorn config.wsgi:application
   ```

4. Ajouter dans `backend/requirements.txt` :
   ```
   gunicorn==21.2.0
   ```

5. Variables d'environnement à ajouter :
   ```
   SECRET_KEY=votre-cle-secrete-tres-longue-et-aleatoire
   DEBUG=False
   ALLOWED_HOSTS=.onrender.com
   ```

6. Cliquer "Create Web Service"

7. Attendre 5-10 minutes pour le déploiement

8. Votre API est en ligne ! https://takku-avenir-api.onrender.com

---

### ÉTAPE 3 : Déployer le Frontend sur Vercel

1. Aller sur vercel.com → "New Project"

2. Connecter votre repo GitHub

3. Configuration :
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   ```

4. Créer un fichier `frontend/.env.production` :
   ```
   REACT_APP_API_URL=https://takku-avenir-api.onrender.com
   ```

5. Cliquer "Deploy"

6. Votre site est en ligne ! https://takku-avenir.vercel.app

---

### ÉTAPE 4 : Configurer la base de données PostgreSQL

1. Sur Render, aller dans "New" → "PostgreSQL"

2. Configuration :
   ```
   Name: takku-avenir-db
   Database: takku_avenir
   User: takku_admin
   ```

3. Créer la base de données (GRATUIT)

4. Copier l'"Internal Database URL"

5. Dans les variables d'environnement du backend, ajouter :
   ```
   DATABASE_URL=postgresql://...
   ```

6. Modifier `backend/config/settings.py` :
   ```python
   import dj_database_url
   
   DATABASES = {
       'default': dj_database_url.config(
           default='sqlite:///db.sqlite3',
           conn_max_age=600
       )
   }
   ```

7. Ajouter dans `requirements.txt` :
   ```
   dj-database-url==2.1.0
   psycopg2-binary==2.9.9
   ```

8. Redéployer le backend

9. Exécuter les migrations :
   ```bash
   # Via le shell Render
   python manage.py migrate
   python manage.py createsuperuser
   ```

---

## OPTION 2 : Hébergement local avec ngrok (Pour démo)

### Installation ngrok

1. Télécharger : https://ngrok.com/download
2. Extraire et installer
3. Créer un compte gratuit sur ngrok.com
4. Authentifier : `ngrok authtoken VOTRE_TOKEN`

### Utilisation

```bash
# Terminal 1 : Backend
cd backend
python manage.py runserver

# Terminal 2 : Frontend  
cd frontend
npm start

# Terminal 3 : ngrok
ngrok http 8000
```

Votre API est accessible via l'URL ngrok (ex: https://abc123.ngrok.io)

Modifier `frontend/.env.development` :
```
REACT_APP_API_URL=https://abc123.ngrok.io
```

---

## OPTION 3 : PythonAnywhere (Alternative gratuite)

1. Créer un compte sur pythonanywhere.com (gratuit)
2. Uploader le code backend
3. Suivre le tutorial Django sur leur site
4. Limité mais fonctionnel pour démo

---

## Checklist avant déploiement

- [ ] Tous les fichiers committé sur GitHub
- [ ] Variables d'environnement configurées
- [ ] Base de données PostgreSQL créée
- [ ] Migrations exécutées
- [ ] Superuser créé
- [ ] CORS configuré correctement
- [ ] ALLOWED_HOSTS mis à jour
- [ ] DEBUG = False en production
- [ ] Tests effectués en local

---

## Commandes utiles

```bash
# Voir les logs sur Render
# Aller dans le dashboard → Logs

# Redéployer
git push origin main  # Redéploie automatiquement

# Shell Django sur Render
# Dashboard → Shell → python manage.py shell

# Backup base de données
pg_dump DATABASE_URL > backup.sql
```

---

## Troubleshooting

### Erreur "Application failed to respond"
- Vérifier les logs Render
- Vérifier que gunicorn est installé
- Vérifier la commande de démarrage

### Erreur CORS
```python
# backend/config/settings.py
CORS_ALLOWED_ORIGINS = [
    "https://takku-avenir.vercel.app",
    "http://localhost:3000",
]
```

### Base de données vide
```bash
# Exécuter les migrations
python manage.py migrate
python manage.py loaddata initial_data.json
```

---

## Monitoring et maintenance

- **Uptime** : uptimerobot.com (gratuit)
- **Analytics** : Google Analytics
- **Erreurs** : Sentry.io (gratuit pour projets open source)

---

Bon déploiement ! 🎉
