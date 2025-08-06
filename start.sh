#!/bin/bash

# Script de démarrage pour Juriste Virtuel
# Usage: ./start.sh [port]

set -e

PORT=${1:-5000}

echo "🏛️  Juriste Virtuel - Assistant Juridique IA"
echo "============================================="
echo

# Vérifier si l'environnement virtuel existe
if [ ! -d "venv" ]; then
    echo "📦 Création de l'environnement virtuel..."
    python3 -m venv venv
fi

# Activer l'environnement virtuel
echo "🔄 Activation de l'environnement virtuel..."
source venv/bin/activate

# Installer ou mettre à jour les dépendances
echo "📋 Installation des dépendances..."
pip install -r requirements.txt

# Vérifier la clé API OpenAI
if [ -z "$OPENAI_API_KEY" ]; then
    echo "⚠️  ATTENTION: Variable d'environnement OPENAI_API_KEY non définie"
    echo "   Pour utiliser l'IA, exportez votre clé API OpenAI:"
    echo "   export OPENAI_API_KEY=\"votre-cle-api-openai\""
    echo
fi

# Lancer l'application
echo "🚀 Démarrage de l'application sur le port $PORT..."
echo "📍 URL: http://127.0.0.1:$PORT"
echo "🛑 Utilisez Ctrl+C pour arrêter l'application"
echo

export PORT=$PORT
python app.py