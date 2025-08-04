# Utiliser une image Python officielle
FROM python:3.10-slim
WORKDIR /app

# Installer les dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Copier le code de l'application
COPY . .

# Définir la variable d'environnement du port
ENV PORT 8080

# Démarrer le serveur avec Gunicorn
CMD ["gunicorn", "app:app", "-b", "0.0.0.0:8080"]
