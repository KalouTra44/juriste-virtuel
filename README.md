# Juriste Virtuel

Juriste Virtuel est une application web simple qui démontre comment pourrait
fonctionner un chatbot de « juriste virtuel ». Elle utilise l’API OpenAI pour
générer des réponses à des questions juridiques posées par l’utilisateur.  **Important :**
cet outil est fourni à titre de démonstration uniquement et ne constitue **pas**
un avis juridique. Consultez toujours un professionnel qualifié pour des
questions juridiques spécifiques.

## Fonctionnalités

* Petit serveur Flask avec une page unique pour discuter.
* Utilise l’API « Chat Completions » d’OpenAI pour répondre aux questions.
* Lit votre clé d’API OpenAI à partir de la variable d’environnement
  `OPENAI_API_KEY`.
* Comprend une interface HTML basique avec des requêtes asynchrones.

## Prérequis

* Python 3.8 ou supérieur.
* Une clé d’API OpenAI. Vous pouvez en obtenir une en créant un compte sur
  [OpenAI](https://platform.openai.com/).

## Installation

1. Clonez ou téléchargez ce dépôt.
2. Installez les dépendances Python :

   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Exportez votre clé d’API OpenAI dans une variable d’environnement :

   ```bash
   export OPENAI_API_KEY="votre-cle-api-openai"
   ```

## Exécution de l’application

Lancez le serveur Flask avec :

```bash
python app.py
```

Par défaut l’application écoute sur `http://127.0.0.1:5000`.  Ouvrez cette URL
dans votre navigateur web pour interagir avec le juriste virtuel.

## Utilisation

Saisissez votre question dans la zone de texte et appuyez sur *Envoyer*.  Le
serveur enverra votre question à l’API OpenAI en utilisant une invite système
indiquant au modèle d’agir en tant qu’assistant juridique serviable.  La
réponse générée sera renvoyée et affichée sous la zone de saisie.

## Mises en garde

* Ce projet est une preuve de concept simplifiée. Il ne comporte aucun filtre
  de modération ou de sécurité intégré.
* La clé d’API OpenAI est lue à partir de l’environnement ; assurez-vous de
  protéger vos informations d’identification.
* Les réponses sont générées par un modèle de langage et peuvent contenir des
  inexactitudes. Ne vous fiez pas à elles pour un avis juridique définitif.

## Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour
plus d’informations.
