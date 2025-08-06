"""Application principale pour le juriste virtuel.

Cette application Flask fournit une interface web permettant de poser des
questions juridiques. Les questions sont transmises à l’API OpenAI qui
renvoie une réponse générée par un modèle de langage. Un message système
définit le comportement de l’assistant en français.
"""

import os
from typing import Any, Dict

from flask import Flask, render_template, request, jsonify

try:
    import openai  # type: ignore
except ImportError as e:  # pragma: no cover
    raise RuntimeError(
        "Le module 'openai' est nécessaire mais n'est pas installé. "
        "Assurez-vous d'exécuter `pip install -r requirements.txt` avant de lancer l'application."
    ) from e


app = Flask(__name__)

# Configurez la clé API à partir de la variable d'environnement.  Si la clé
# n'est pas définie, l'application lèvera une erreur lorsqu'elle tentera de
# contacter l'API OpenAI.
openai.api_key = os.getenv("OPENAI_API_KEY")

# Message système pour définir le ton et les limites de l'assistant.  Le
# modèle est invité à fournir des informations générales et à rappeler à
# l'utilisateur que des conseils juridiques professionnels sont requis pour
# des situations concrètes.
SYSTEM_PROMPT: str = (
    "Vous êtes un assistant juridique virtuel serviable, professionnel et capable de "
    "fournir des informations juridiques générales. Vous ne fournissez pas de conseils "
    "juridiques définitifs. Toujours inclure un avertissement indiquant que l'utilisateur "
    "devrait consulter un avocat qualifié pour des conseils juridiques spécifiques."
)


@app.route("/")
def index() -> str:
    """Point d'entrée principal renvoyant le formulaire HTML."""
    return render_template("index.html")


@app.route("/ask", methods=["POST"])
def ask() -> Any:
    """Endpoint JSON pour traiter une question et renvoyer une réponse.
    Extrait la question du corps de la requête JSON et envoie une requête à
    l'API OpenAI. Si aucun texte n'est fourni ou si une erreur se produit,
    renvoie un message d'erreur approprié.
    """
    data: Dict[str, Any] = request.get_json(force=True, silent=True) or {}
    question: str = str(data.get("question", "")).strip()
    if not question:
        return jsonify({"error": "Aucune question fournie."}), 400
    try:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": question},
            ],
            temperature=0.7,
            max_tokens=512,
        )
        answer: str = completion.choices[0].message["content"].strip()
    except Exception:
        # Masquer les détails spécifiques des exceptions pour éviter de divulguer des
        # informations internes ou la configuration de l'API.
        answer = (
            "Une erreur s'est produite lors de la communication avec l'API OpenAI. "
            "Veuillez vérifier votre clé API et votre connexion réseau."
        )
    return jsonify({"answer": answer})


if __name__ == "__main__":  # pragma: no cover
    # Permet l'exécution avec un port personnalisé via la variable d'environnement PORT.
    port_env = os.environ.get("PORT")
    try:
        port = int(port_env) if port_env else 5000
    except ValueError:
        port = 5000
    app.run(debug=True, port=port)
