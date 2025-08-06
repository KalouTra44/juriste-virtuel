"""Application principale pour le juriste virtuel.

Cette application Flask fournit une interface web permettant de poser des
questions juridiques. Les questions sont transmises à l'API OpenAI qui
renvoie une réponse générée par un modèle de langage. Un message système
définit le comportement de l'assistant en français.
"""

import os
from typing import Any, Dict

from flask import Flask, render_template, request, jsonify
import markdown

try:
    from openai import OpenAI  # type: ignore
except ImportError as e:  # pragma: no cover
    raise RuntimeError(
        "Le module 'openai' est nécessaire mais n'est pas installé. "
        "Assurez-vous d'exécuter `pip install -r requirements.txt` avant de lancer l'application."
    ) from e


app = Flask(__name__)

# Configurez le client OpenAI à partir de la variable d'environnement.  Si la clé
# n'est pas définie, l'application lèvera une erreur lorsqu'elle tentera de
# contacter l'API OpenAI.
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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


def load_markdown_file(filename: str) -> str:
    """Charge et convertit un fichier Markdown en HTML."""
    try:
        file_path = os.path.join(os.path.dirname(__file__), filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return markdown.markdown(content)
    except FileNotFoundError:
        return "<p>Contenu non disponible.</p>"


@app.route("/")
def index() -> str:
    """Point d'entrée principal renvoyant le formulaire HTML."""
    return render_template("index.html")


@app.route("/privacy_policy")
def privacy_policy() -> str:
    """Page de politique de confidentialité."""
    content = load_markdown_file("privacy_policy.md")
    return render_template("legal_page.html", 
                         title="Politique de Confidentialité", 
                         content=content)


@app.route("/legal_notice")
def legal_notice() -> str:
    """Page de mentions légales."""
    content = load_markdown_file("legal_notice.md")
    return render_template("legal_page.html", 
                         title="Mentions Légales", 
                         content=content)


@app.route("/terms")
def terms() -> str:
    """Page de conditions d'utilisation."""
    content = load_markdown_file("terms_conditions.md")
    return render_template("legal_page.html", 
                         title="Conditions d'Utilisation", 
                         content=content)


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
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": question},
            ],
            temperature=0.7,
            max_tokens=512,
        )
        answer: str = completion.choices[0].message.content.strip()
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
