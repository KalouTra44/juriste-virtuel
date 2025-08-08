#!/bin/bash

# Script de configuration pour Juriste Virtuel Mobile
# Ce script automatise la configuration initiale du projet

echo "🚀 Configuration de Juriste Virtuel Mobile"
echo "=========================================="

# Vérification des prérequis
echo "📋 Vérification des prérequis..."

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/"
    exit 1
fi

# Vérifier npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé."
    exit 1
fi

# Vérifier React Native CLI
if ! command -v npx &> /dev/null; then
    echo "❌ npx n'est pas disponible."
    exit 1
fi

echo "✅ Prérequis vérifiés"

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation des dépendances"
    exit 1
fi

echo "✅ Dépendances installées"

# Configuration iOS (macOS uniquement)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Configuration iOS..."
    
    if command -v pod &> /dev/null; then
        cd ios
        pod install
        cd ..
        echo "✅ Dépendances iOS installées"
    else
        echo "⚠️  CocoaPods n'est pas installé. Installez-le avec: sudo gem install cocoapods"
    fi
else
    echo "ℹ️  Configuration iOS ignorée (non macOS)"
fi

# Création du fichier .env
echo "⚙️  Configuration des variables d'environnement..."
if [ ! -f .env ]; then
    cat > .env << EOF
# Configuration API
API_BASE_URL=https://juristevirtuel-api.herokuapp.com
OPENAI_API_KEY=votre_cle_api_openai_ici

# Configuration App
APP_VERSION=1.0.0
BUILD_NUMBER=1

# Analytics (optionnel)
FIREBASE_PROJECT_ID=votre_projet_firebase
EOF
    echo "✅ Fichier .env créé"
    echo "⚠️  N'oubliez pas de configurer votre clé API OpenAI dans le fichier .env"
else
    echo "ℹ️  Fichier .env existe déjà"
fi

# Vérification de la configuration Android
echo "🤖 Vérification de la configuration Android..."
if [ -d "android" ]; then
    echo "✅ Dossier Android trouvé"
else
    echo "⚠️  Dossier Android manquant. Exécutez 'npx react-native init JuristeVirtuel'"
fi

# Vérification de la configuration iOS
echo "🍎 Vérification de la configuration iOS..."
if [ -d "ios" ]; then
    echo "✅ Dossier iOS trouvé"
else
    echo "⚠️  Dossier iOS manquant. Exécutez 'npx react-native init JuristeVirtuel'"
fi

echo ""
echo "🎉 Configuration terminée !"
echo ""
echo "📱 Prochaines étapes :"
echo "1. Configurez votre clé API OpenAI dans le fichier .env"
echo "2. Lancez l'application :"
echo "   - Android : npm run android"
echo "   - iOS : npm run ios"
echo "   - Serveur de développement : npm start"
echo ""
echo "📚 Documentation :"
echo "- README_MOBILE.md : Guide complet de l'application"
echo "- DEPLOYMENT_GUIDE.md : Guide de déploiement"
echo ""
echo "🔗 Liens utiles :"
echo "- React Native : https://reactnative.dev/"
echo "- OpenAI API : https://platform.openai.com/"
echo "- Heroku : https://heroku.com/"
echo ""
echo "Bon développement ! 🚀"