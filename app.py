"""Application principale pour le juriste virtuel.

Cette application Flask fournit une interface web permettant de poser des
questions juridiques. Les questions sont transmises à l'API OpenAI qui
renvoie une réponse générée par un modèle de langage. Un message système
définit le comportement de l'assistant multilingue.
"""

import os
from typing import Any, Dict
import json

from flask import Flask, render_template, request, jsonify

try:
    from openai import OpenAI  # type: ignore
except ImportError as e:  # pragma: no cover
    raise RuntimeError(
        "Le module 'openai' est nécessaire mais n'est pas installé. "
        "Assurez-vous d'exécuter `pip install -r requirements.txt` avant de lancer l'application."
    ) from e


app = Flask(__name__)

# Configurez la clé API à partir de la variable d'environnement
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Messages système multilingues
SYSTEM_PROMPTS = {
    "fr": (
        "Vous êtes un assistant juridique virtuel serviable, professionnel et capable de "
        "fournir des informations juridiques générales. Vous ne fournissez pas de conseils "
        "juridiques définitifs. Toujours inclure un avertissement indiquant que l'utilisateur "
        "devrait consulter un avocat qualifié pour des conseils juridiques spécifiques. "
        "Répondez en français."
    ),
    "en": (
        "You are a helpful, professional virtual legal assistant capable of providing "
        "general legal information. You do not provide definitive legal advice. Always "
        "include a warning that the user should consult a qualified lawyer for specific "
        "legal advice. Respond in English."
    ),
    "es": (
        "Eres un asistente legal virtual útil, profesional y capaz de proporcionar "
        "información legal general. No proporcionas consejos legales definitivos. Siempre "
        "incluye una advertencia de que el usuario debe consultar a un abogado calificado "
        "para consejos legales específicos. Responde en español."
    ),
    "ar": (
        "أنت مساعد قانوني افتراضي مفيد ومهني وقادر على تقديم معلومات قانونية عامة. "
        "أنت لا تقدم استشارات قانونية نهائية. اذكر دائماً تحذيراً بأن المستخدم يجب أن "
        "يستشير محامياً مؤهلاً للحصول على استشارة قانونية محددة. أجب باللغة العربية."
    ),
    "pt": (
        "Você é um assistente jurídico virtual útil, profissional e capaz de fornecer "
        "informações jurídicas gerais. Você não fornece aconselhamento jurídico definitivo. "
        "Sempre inclua um aviso de que o usuário deve consultar um advogado qualificado "
        "para aconselhamento jurídico específico. Responda em português."
    ),
    "de": (
        "Sie sind ein hilfreicher, professioneller virtueller Rechtsassistent, der in der Lage ist, "
        "allgemeine Rechtsinformationen bereitzustellen. Sie geben keine endgültigen Rechtsberatungen. "
        "Fügen Sie immer eine Warnung hinzu, dass der Benutzer einen qualifizierten Anwalt für "
        "spezifische Rechtsberatung konsultieren sollte. Antworten Sie auf Deutsch."
    ),
    "it": (
        "Sei un assistente legale virtuale utile, professionale e capace di fornire "
        "informazioni legali generali. Non fornisci consigli legali definitivi. Includi sempre "
        "un avvertimento che l'utente dovrebbe consultare un avvocato qualificato per consigli "
        "legali specifici. Rispondi in italiano."
    ),
    "zh": (
        "您是一个有用的、专业的虚拟法律助手，能够提供一般法律信息。您不提供最终的法律建议。"
        "请始终包含警告，提醒用户应咨询合格的律师获取具体的法律建议。用中文回答。"
    ),
    "ru": (
        "Вы полезный, профессиональный виртуальный юридический помощник, способный предоставлять "
        "общую правовую информацию. Вы не даете окончательных юридических советов. Всегда "
        "включайте предупреждение о том, что пользователь должен проконсультироваться с "
        "квалифицированным юристом для получения конкретных юридических советов. Отвечайте на русском языке."
    ),
    "ja": (
        "あなたは、一般的な法的情報を提供できる有用で専門的な仮想法的アシスタントです。"
        "最終的な法的助言は提供しません。ユーザーは具体的な法的助言について資格のある"
        "弁護士に相談すべきであるという警告を常に含めてください。日本語で回答してください。"
    )
}

def detect_language(text: str) -> str:
    """Simple language detection based on common words and patterns."""
    text_lower = text.lower()
    
    # Arabic detection
    if any(ord(char) >= 0x0600 and ord(char) <= 0x06FF for char in text):
        return "ar"
    
    # Chinese detection
    if any(ord(char) >= 0x4E00 and ord(char) <= 0x9FFF for char in text):
        return "zh"
    
    # Japanese detection
    if any(ord(char) >= 0x3040 and ord(char) <= 0x309F for char in text) or \
       any(ord(char) >= 0x30A0 and ord(char) <= 0x30FF for char in text):
        return "ja"
    
    # European language detection
    spanish_words = ["qué", "cómo", "cuándo", "dónde", "por favor", "gracias", "sí", "no"]
    english_words = ["what", "how", "when", "where", "please", "thank", "yes", "the", "and", "is", "are"]
    french_words = ["que", "comment", "quand", "où", "s'il vous plaît", "merci", "oui", "non", "le", "la", "les"]
    german_words = ["was", "wie", "wann", "wo", "bitte", "danke", "ja", "nein", "der", "die", "das"]
    italian_words = ["che", "come", "quando", "dove", "per favore", "grazie", "sì", "no", "il", "la", "le"]
    portuguese_words = ["que", "como", "quando", "onde", "por favor", "obrigado", "sim", "não", "o", "a", "os"]
    russian_words = ["что", "как", "когда", "где", "пожалуйста", "спасибо", "да", "нет"]
    
    if any(word in text_lower for word in spanish_words):
        return "es"
    elif any(word in text_lower for word in english_words):
        return "en"
    elif any(word in text_lower for word in french_words):
        return "fr"
    elif any(word in text_lower for word in german_words):
        return "de"
    elif any(word in text_lower for word in italian_words):
        return "it"
    elif any(word in text_lower for word in portuguese_words):
        return "pt"
    elif any(word in text_lower for word in russian_words):
        return "ru"
    
    # Default to French
    return "fr"


@app.route("/")
def index() -> str:
    """Point d'entrée principal renvoyant le formulaire HTML."""
    return render_template("index.html")


@app.route("/ask", methods=["POST"])
def ask() -> Any:
    """Endpoint JSON pour traiter une question et renvoyer une réponse.
    Détecte automatiquement la langue et répond dans la même langue.
    """
    data: Dict[str, Any] = request.get_json(force=True, silent=True) or {}
    question: str = str(data.get("question", "")).strip()
    user_language: str = data.get("language", "auto")
    
    if not question:
        return jsonify({"error": "Aucune question fournie."}), 400
    
    # Détection automatique de la langue si nécessaire
    if user_language == "auto":
        user_language = detect_language(question)
    
    # Utiliser le prompt système approprié
    system_prompt = SYSTEM_PROMPTS.get(user_language, SYSTEM_PROMPTS["fr"])
    
    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": question},
            ],
            temperature=0.7,
            max_tokens=512,
        )
        answer: str = completion.choices[0].message.content.strip()
    except Exception as e:
        # Messages d'erreur multilingues
        error_messages = {
            "fr": "Une erreur s'est produite lors de la communication avec l'API OpenAI. "
                  "Veuillez vérifier votre clé API et votre connexion réseau.",
            "en": "An error occurred while communicating with the OpenAI API. "
                  "Please check your API key and network connection.",
            "es": "Se produjo un error al comunicarse con la API de OpenAI. "
                  "Verifique su clave API y conexión de red.",
            "ar": "حدث خطأ أثناء التواصل مع واجهة برمجة تطبيقات OpenAI. "
                  "يرجى التحقق من مفتاح API واتصال الشبكة.",
            "pt": "Ocorreu um erro ao comunicar com a API OpenAI. "
                  "Verifique sua chave API e conexão de rede.",
            "de": "Bei der Kommunikation mit der OpenAI-API ist ein Fehler aufgetreten. "
                  "Überprüfen Sie Ihren API-Schlüssel und Ihre Netzwerkverbindung.",
            "it": "Si è verificato un errore durante la comunicazione con l'API OpenAI. "
                  "Controlla la tua chiave API e la connessione di rete.",
            "zh": "与OpenAI API通信时发生错误。请检查您的API密钥和网络连接。",
            "ru": "Произошла ошибка при обращении к OpenAI API. "
                  "Проверьте ваш API-ключ и сетевое соединение.",
            "ja": "OpenAI APIとの通信中にエラーが発生しました。"
                  "APIキーとネットワーク接続を確認してください。"
        }
        answer = error_messages.get(user_language, error_messages["fr"])
    
    return jsonify({"answer": answer, "detected_language": user_language})


if __name__ == "__main__":  # pragma: no cover
    port_env = os.environ.get("PORT")
    try:
        port = int(port_env) if port_env else 5000
    except ValueError:
        port = 5000
    app.run(debug=True, port=port, host="0.0.0.0")
