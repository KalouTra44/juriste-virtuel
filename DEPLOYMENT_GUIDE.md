# Guide de Déploiement - Juriste Virtuel

Ce guide vous accompagne dans le processus complet de déploiement de l'application Juriste Virtuel, incluant l'enregistrement de domaine, l'hébergement et la publication sur les stores.

## 📋 Table des matières

1. [Enregistrement de domaine](#enregistrement-de-domaine)
2. [Configuration de l'hébergement](#configuration-de-lhébergement)
3. [Déploiement de l'API backend](#déploiement-de-lapi-backend)
4. [Préparation pour l'App Store (iOS)](#préparation-pour-lapp-store-ios)
5. [Préparation pour le Google Play Store (Android)](#préparation-pour-le-google-play-store-android)
6. [Configuration de l'environnement de production](#configuration-de-lenvironnement-de-production)

## 🌐 Enregistrement de domaine

### 1. Choix du nom de domaine
- **Domaine principal** : `juristevirtuel.com`
- **Domaines alternatifs** : `juristevirtuel.fr`, `juristevirtuel.app`

### 2. Registrars recommandés
- **OVH** (France) : https://www.ovh.com
- **Google Domains** : https://domains.google
- **Namecheap** : https://www.namecheap.com

### 3. Étapes d'enregistrement
```bash
# 1. Vérifier la disponibilité du domaine
# 2. Choisir un registrar
# 3. Configurer les DNS
# 4. Activer HTTPS/SSL
```

## 🚀 Configuration de l'hébergement

### Option 1: Heroku (Recommandé pour débuter)
```bash
# Installation de Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Connexion à Heroku
heroku login

# Création de l'application
heroku create juristevirtuel-api

# Configuration des variables d'environnement
heroku config:set OPENAI_API_KEY=votre_cle_api_openai
heroku config:set FLASK_ENV=production

# Déploiement
git push heroku main
```

### Option 2: AWS (Production)
```bash
# Configuration AWS CLI
aws configure

# Déploiement avec Elastic Beanstalk
eb init juristevirtuel-api
eb create production
eb deploy
```

### Option 3: Google Cloud Platform
```bash
# Installation de gcloud CLI
curl https://sdk.cloud.google.com | bash

# Configuration du projet
gcloud config set project juristevirtuel-api

# Déploiement sur App Engine
gcloud app deploy
```

## 🔧 Déploiement de l'API backend

### 1. Configuration de l'environnement de production
```python
# requirements.txt (mise à jour)
Flask==2.3.3
openai==0.28.1
gunicorn==21.2.0
python-dotenv==1.0.0
flask-cors==4.0.0
```

### 2. Configuration CORS pour l'app mobile
```python
# app.py (ajout)
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['*'])  # En production, spécifier les domaines autorisés
```

### 3. Variables d'environnement de production
```bash
# .env.production
OPENAI_API_KEY=votre_cle_api_openai_production
FLASK_ENV=production
DATABASE_URL=postgresql://user:password@host:port/db
```

## 📱 Préparation pour l'App Store (iOS)

### 1. Prérequis
- Compte Apple Developer (99$/an)
- Xcode installé
- Certificats de développement et de distribution

### 2. Configuration du projet iOS
```bash
# Installation des dépendances
cd ios
pod install

# Configuration du Bundle Identifier
# Dans Xcode : com.juristevirtuel.app
```

### 3. Création des certificats
```bash
# Certificat de développement
# Certificat de distribution
# Provisioning Profile
```

### 4. Configuration App Store Connect
- **Nom de l'app** : Juriste Virtuel
- **Catégorie** : Référence > Droit
- **Âge** : 4+
- **Prix** : Gratuit (avec achats intégrés optionnels)

### 5. Métadonnées requises
- **Description** : Assistant juridique intelligent utilisant l'IA
- **Mots-clés** : juridique, droit, assistant, IA, consultation
- **Captures d'écran** : 6.7", 6.5", 5.5", 12.9", 11"
- **Icône** : 1024x1024px

### 6. Build et soumission
```bash
# Build de production
cd ios
xcodebuild -workspace JuristeVirtuel.xcworkspace \
           -scheme JuristeVirtuel \
           -configuration Release \
           -destination generic/platform=iOS \
           -archivePath JuristeVirtuel.xcarchive \
           archive

# Upload vers App Store Connect
xcodebuild -exportArchive \
           -archivePath JuristeVirtuel.xcarchive \
           -exportPath ./build \
           -exportOptionsPlist exportOptions.plist
```

## 🤖 Préparation pour le Google Play Store (Android)

### 1. Prérequis
- Compte Google Play Console (25$ une fois)
- Keystore de signature
- APK ou AAB signé

### 2. Configuration du projet Android
```bash
# Génération du keystore de production
keytool -genkey -v -keystore juristevirtuel-release-key.keystore \
        -alias juristevirtuel-key-alias \
        -keyalg RSA -keysize 2048 -validity 10000

# Configuration dans android/gradle.properties
MYAPP_UPLOAD_STORE_FILE=juristevirtuel-release-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=juristevirtuel-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=votre_mot_de_passe
MYAPP_UPLOAD_KEY_PASSWORD=votre_mot_de_passe
```

### 3. Build de production
```bash
# Build APK
cd android
./gradlew assembleRelease

# Build AAB (recommandé)
./gradlew bundleRelease
```

### 4. Configuration Google Play Console
- **Nom de l'app** : Juriste Virtuel
- **Catégorie** : Référence > Droit
- **Contenu** : Tout public
- **Prix** : Gratuit

### 5. Métadonnées requises
- **Description courte** : Assistant juridique IA
- **Description complète** : Assistant juridique intelligent...
- **Captures d'écran** : Phone, 7-inch tablet, 10-inch tablet
- **Icône** : 512x512px
- **Bannière** : 1024x500px

## ⚙️ Configuration de l'environnement de production

### 1. Variables d'environnement de l'app mobile
```javascript
// src/config/config.js
export const CONFIG = {
  API_BASE_URL: 'https://juristevirtuel-api.herokuapp.com',
  OPENAI_API_KEY: 'votre_cle_api_openai',
  APP_VERSION: '1.0.0',
  BUILD_NUMBER: '1',
};
```

### 2. Configuration Firebase (optionnel)
```bash
# Installation Firebase CLI
npm install -g firebase-tools

# Initialisation Firebase
firebase init

# Configuration pour Analytics, Crashlytics, etc.
```

### 3. Monitoring et analytics
- **Crashlytics** : Suivi des crashes
- **Analytics** : Comportement utilisateur
- **Performance** : Métriques de performance

## 🔒 Sécurité et conformité

### 1. RGPD (Europe)
- Politique de confidentialité
- Consentement utilisateur
- Droit à l'effacement
- Portabilité des données

### 2. Sécurité des données
- Chiffrement en transit (HTTPS)
- Chiffrement au repos
- Authentification sécurisée
- Audit de sécurité

### 3. Avertissements légaux
- Non-responsabilité juridique
- Recommandation de consulter un avocat
- Limitation de responsabilité

## 📊 Métriques et suivi

### 1. KPIs à suivre
- Nombre d'utilisateurs actifs
- Temps de session moyen
- Taux de rétention
- Notes et avis

### 2. Outils de monitoring
- **App Store Connect** : Métriques iOS
- **Google Play Console** : Métriques Android
- **Firebase Analytics** : Comportement utilisateur
- **Sentry** : Suivi des erreurs

## 🚀 Checklist de déploiement

### Avant la publication
- [ ] Tests complets sur appareils réels
- [ ] Vérification des performances
- [ ] Validation des métadonnées
- [ ] Test des achats intégrés (si applicable)
- [ ] Vérification de la conformité RGPD

### Publication
- [ ] Soumission App Store
- [ ] Soumission Google Play
- [ ] Configuration du domaine
- [ ] Test de l'API en production
- [ ] Monitoring post-publication

### Post-publication
- [ ] Surveillance des avis utilisateurs
- [ ] Suivi des métriques
- [ ] Planification des mises à jour
- [ ] Support utilisateur

## 📞 Support et maintenance

### Contact
- **Email** : support@juristevirtuel.com
- **Documentation** : https://docs.juristevirtuel.com
- **Status page** : https://status.juristevirtuel.com

### Maintenance
- Mises à jour de sécurité
- Améliorations de performance
- Nouvelles fonctionnalités
- Corrections de bugs

---

**Note importante** : Ce guide est un point de départ. Adaptez les configurations selon vos besoins spécifiques et les exigences de votre projet.