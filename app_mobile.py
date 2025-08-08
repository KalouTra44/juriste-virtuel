"""API backend pour l'application mobile Juriste Virtuel.

Cette version de l'API est optimisée pour l'application mobile React Native,
avec support CORS et endpoints spécifiques pour les fonctionnalités mobiles.
"""

import os
import json
import logging
from datetime import datetime
from typing import Any, Dict, Optional

from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import openai

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configuration CORS pour l'app mobile
CORS(app, origins=['*'], methods=['GET', 'POST', 'OPTIONS'])

# Configuration OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

# Message système pour l'assistant juridique
SYSTEM_PROMPT: str = (
    "Vous êtes un assistant juridique virtuel professionnel et serviable. "
    "Vous fournissez des informations juridiques générales basées sur le droit français. "
    "Vous devez toujours :\n"
    "1. Donner des informations générales et éducatives\n"
    "2. Rappeler que vos conseils ne remplacent pas une consultation avec un avocat\n"
    "3. Recommander de consulter un professionnel pour des cas spécifiques\n"
    "4. Être précis et factuel dans vos réponses\n"
    "5. Citer les sources juridiques pertinentes quand c'est possible"
)

@app.route('/')
def index() -> str:
    """Page d'accueil de l'API."""
    return jsonify({
        "message": "API Juriste Virtuel",
        "version": "1.0.0",
        "status": "active",
        "endpoints": {
            "chat": "/api/chat",
            "health": "/api/health",
            "info": "/api/info"
        }
    })

@app.route('/api/health')
def health_check() -> Dict[str, Any]:
    """Endpoint de vérification de santé de l'API."""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "openai_configured": bool(openai.api_key)
    })

@app.route('/api/info')
def api_info() -> Dict[str, Any]:
    """Informations sur l'API et l'application."""
    return jsonify({
        "app_name": "Juriste Virtuel",
        "version": "1.0.0",
        "description": "Assistant juridique intelligent utilisant l'IA",
        "features": [
            "Consultation juridique en temps réel",
            "Réponses basées sur le droit français",
            "Interface mobile optimisée",
            "Confidentialité garantie"
        ],
        "disclaimer": "Cette application fournit des informations juridiques générales à titre informatif uniquement. Elle ne constitue pas un avis juridique professionnel."
    })

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat() -> Any:
    """Endpoint principal pour le chat avec l'assistant juridique."""
    if request.method == 'OPTIONS':
        # Gestion des requêtes preflight CORS
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    try:
        data = request.get_json(force=True, silent=True) or {}
        question = str(data.get("question", "")).strip()
        user_id = data.get("user_id", "anonymous")
        session_id = data.get("session_id", "default")

        if not question:
            return jsonify({
                "error": "Aucune question fournie.",
                "code": "MISSING_QUESTION"
            }), 400

        # Validation de la longueur de la question
        if len(question) > 1000:
            return jsonify({
                "error": "La question est trop longue. Maximum 1000 caractères.",
                "code": "QUESTION_TOO_LONG"
            }), 400

        # Log de la requête (sans les données sensibles)
        logger.info(f"Chat request from user {user_id}, session {session_id}")

        # Appel à l'API OpenAI
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": question},
            ],
            temperature=0.7,
            max_tokens=800,
        )

        answer = completion.choices[0].message["content"].strip()

        # Log de la réponse
        logger.info(f"Response generated for user {user_id}")

        return jsonify({
            "answer": answer,
            "timestamp": datetime.now().isoformat(),
            "session_id": session_id,
            "user_id": user_id,
            "model_used": "gpt-3.5-turbo"
        })

    except openai.error.AuthenticationError:
        logger.error("OpenAI authentication error")
        return jsonify({
            "error": "Erreur d'authentification avec l'API OpenAI.",
            "code": "OPENAI_AUTH_ERROR"
        }), 500

    except openai.error.RateLimitError:
        logger.error("OpenAI rate limit exceeded")
        return jsonify({
            "error": "Limite de requêtes dépassée. Veuillez réessayer plus tard.",
            "code": "RATE_LIMIT_EXCEEDED"
        }), 429

    except openai.error.APIError as e:
        logger.error(f"OpenAI API error: {e}")
        return jsonify({
            "error": "Erreur de l'API OpenAI. Veuillez réessayer.",
            "code": "OPENAI_API_ERROR"
        }), 500

    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({
            "error": "Une erreur inattendue s'est produite.",
            "code": "INTERNAL_ERROR"
        }), 500

@app.route('/api/chat/history', methods=['GET'])
def chat_history() -> Dict[str, Any]:
    """Endpoint pour récupérer l'historique des conversations (mock)."""
    # En production, cela devrait être connecté à une base de données
    return jsonify({
        "history": [],
        "message": "Historique non disponible en version de démonstration"
    })

@app.route('/api/feedback', methods=['POST'])
def submit_feedback() -> Dict[str, Any]:
    """Endpoint pour soumettre des retours utilisateur."""
    try:
        data = request.get_json(force=True, silent=True) or {}
        rating = data.get("rating")
        comment = data.get("comment", "")
        user_id = data.get("user_id", "anonymous")

        if not rating or not isinstance(rating, int) or rating < 1 or rating > 5:
            return jsonify({
                "error": "Note invalide. Doit être entre 1 et 5.",
                "code": "INVALID_RATING"
            }), 400

        # En production, sauvegarder en base de données
        logger.info(f"Feedback received: rating={rating}, user={user_id}")

        return jsonify({
            "message": "Merci pour votre retour !",
            "rating": rating,
            "timestamp": datetime.now().isoformat()
        })

    except Exception as e:
        logger.error(f"Feedback error: {e}")
        return jsonify({
            "error": "Erreur lors de l'enregistrement du retour.",
            "code": "FEEDBACK_ERROR"
        }), 500

@app.errorhandler(404)
def not_found(error) -> Dict[str, Any]:
    """Gestionnaire d'erreur 404."""
    return jsonify({
        "error": "Endpoint non trouvé.",
        "code": "NOT_FOUND"
    }), 404

@app.errorhandler(500)
def internal_error(error) -> Dict[str, Any]:
    """Gestionnaire d'erreur 500."""
    return jsonify({
        "error": "Erreur interne du serveur.",
        "code": "INTERNAL_ERROR"
    }), 500

if __name__ == "__main__":
    # Configuration pour la production
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV") == "development"
    
    app.run(
        host="0.0.0.0",
        port=port,
        debug=debug
    )