# Juriste Virtuel

Juriste Virtuel est une application web moderne qui utilise l'intelligence artificielle pour fournir des informations juridiques générales. Elle utilise l'API OpenAI pour générer des réponses à des questions juridiques posées par l'utilisateur.

**⚠️ Important :** Cet outil est fourni à titre de démonstration uniquement et ne constitue **pas** un avis juridique. Consultez toujours un professionnel qualifié pour des questions juridiques spécifiques.

## ✨ Fonctionnalités

### 🎨 Interface Moderne
* Design responsive et professionnel avec dégradés et animations
* Interface utilisateur intuitive avec icônes Font Awesome
* Mode sombre avec couleurs thématiques juridiques
* Optimisé pour tous les appareils (desktop, tablet, mobile)

### 🤖 Intelligence Artificielle
* Utilise l'API OpenAI GPT-3.5 Turbo pour des réponses intelligentes
* Prompts système optimisés pour le contexte juridique français
* Gestion d'erreurs robuste avec messages utilisateur amicaux

### 💬 Historique de Conversation
* Sauvegarde automatique des questions et réponses
* Historique persistant avec LocalStorage
* Possibilité d'effacer l'historique complet
* Affichage chronologique avec horodatage

### ⚖️ Conformité Légale
* Pages dédiées pour les mentions légales
* Politique de confidentialité intégrée
* Conditions d'utilisation détaillées
* Avertissements de responsabilité clairs

### 🚀 Déploiement
* Script de démarrage automatisé (`start.sh`)
* Support Docker avec Dockerfile inclus
* Configuration Firebase pour le déploiement cloud
* Variables d'environnement pour la configuration

## 🛠️ Prérequis

* **Python 3.8+** - Langage de programmation principal
* **Clé API OpenAI** - Obtenez-en une sur [platform.openai.com](https://platform.openai.com/)
* **Git** - Pour cloner le repository (optionnel)

## 📦 Installation Rapide

### Option 1: Script automatique (Recommandé)

```bash
# Cloner le projet
git clone <repository-url>
cd juriste-virtuel

# Configurer votre clé API OpenAI
export OPENAI_API_KEY="votre-cle-api-openai"

# Lancer l'application
./start.sh
```

### Option 2: Installation manuelle

```bash
# 1. Créer un environnement virtuel
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

# 2. Installer les dépendances
pip install -r requirements.txt

# 3. Configurer la clé API
export OPENAI_API_KEY="votre-cle-api-openai"

# 4. Lancer l'application
python app.py
```

### Option 3: Docker

```bash
# Construire l'image
docker build -t juriste-virtuel .

# Lancer le conteneur
docker run -p 5000:5000 -e OPENAI_API_KEY="votre-cle-api" juriste-virtuel
```

## 🌐 Utilisation

1. **Accès à l'application :** Ouvrez `http://127.0.0.1:5000` dans votre navigateur
2. **Poser une question :** Tapez votre question juridique dans la zone de texte
3. **Envoyer :** Cliquez sur "Envoyer ma question" ou utilisez `Ctrl+Entrée`
4. **Consulter la réponse :** La réponse s'affiche automatiquement sous votre question
5. **Historique :** Toutes vos conversations sont sauvegardées automatiquement

### Exemples de questions

* "Quels sont mes droits en cas de licenciement abusif ?"
* "Comment rédiger un contrat de vente entre particuliers ?"
* "Quelles sont les obligations du locataire et du propriétaire ?"
* "Comment contester une contravention ?"

## 🔧 Configuration

### Variables d'environnement

| Variable | Description | Requis |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Votre clé API OpenAI | ✅ Oui |
| `PORT` | Port d'écoute de l'application | ❌ Non (défaut: 5000) |

### Fichiers de configuration

* `requirements.txt` - Dépendances Python
* `firebase.json` - Configuration Firebase
* `Dockerfile` - Configuration Docker
* `.gitignore` - Fichiers ignorés par Git

## 📁 Structure du projet

```
juriste-virtuel/
├── 📄 app.py                    # Application Flask principale
├── 📁 templates/
│   ├── 📄 index.html           # Page d'accueil
│   └── 📄 legal_page.html      # Template pages légales
├── 📁 static/
│   ├── 📁 css/                 # Feuilles de style
│   └── 📁 img/                 # Images et favicons
├── 📄 privacy_policy.md        # Politique de confidentialité
├── 📄 legal_notice.md          # Mentions légales
├── 📄 terms_conditions.md      # Conditions d'utilisation
├── 📄 requirements.txt         # Dépendances Python
├── 📄 start.sh                 # Script de démarrage
├── 📄 Dockerfile               # Configuration Docker
├── 📄 README.md                # Ce fichier
└── 📄 LICENSE                  # Licence MIT
```

## 🔒 Sécurité et Confidentialité

* **Clé API :** Stockée uniquement en variable d'environnement
* **Données utilisateur :** Historique sauvegardé localement (pas sur serveur)
* **Chiffrement :** Communications HTTPS en production
* **Validation :** Validation côté client et serveur

## ⚠️ Limitations et Avertissements

* **Pas un avis juridique :** Les réponses sont informatives uniquement
* **Consultation professionnelle :** Consultez un avocat pour des cas spécifiques
* **Exactitude :** Les réponses IA peuvent contenir des erreurs
* **Responsabilité :** Aucune responsabilité légale n'est assumée

## 🚀 Déploiement en Production

### Firebase Hosting

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter à Firebase
firebase login

# Déployer
firebase deploy
```

### Heroku

```bash
# Créer l'application Heroku
heroku create juriste-virtuel

# Configurer la clé API
heroku config:set OPENAI_API_KEY="votre-cle-api"

# Déployer
git push heroku main
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commit** vos changements (`git commit -am 'Ajouter nouvelle fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Créer** une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus d'informations.

## 🆘 Support

Pour obtenir de l'aide :

* **Issues GitHub :** Signaler des bugs ou demander des fonctionnalités
* **Documentation :** Consultez ce README et les commentaires du code
* **Communauté :** Discutez avec d'autres utilisateurs

## 🔄 Historique des versions

### v2.0.0 (Actuel)
- ✅ Interface utilisateur moderne et responsive
- ✅ Historique de conversation avec sauvegarde locale
- ✅ Pages légales intégrées (mentions, confidentialité, CGU)
- ✅ Script de démarrage automatisé
- ✅ Support OpenAI API v1.0+
- ✅ Amélioration UX/UI complète

### v1.0.0
- ✅ Application Flask de base
- ✅ Intégration OpenAI GPT-3.5
- ✅ Interface HTML simple
- ✅ Gestion d'erreurs basique

---

**© 2024 Juriste Virtuel - Technologie d'Intelligence Artificielle**
