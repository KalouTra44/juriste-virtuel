# Juriste Virtuel - Application Mobile

Application mobile React Native pour l'assistant juridique virtuel, disponible sur iOS et Android.

## 📱 Fonctionnalités

- **Assistant juridique IA** : Posez vos questions juridiques et obtenez des réponses instantanées
- **Interface intuitive** : Design moderne et facile à utiliser
- **Consultation en temps réel** : Réponses immédiates grâce à l'IA
- **Confidentialité** : Vos conversations restent privées
- **Disponible 24h/24** : Accès permanent à l'assistant
- **Interface en français** : Optimisée pour les utilisateurs francophones

## 🚀 Installation et développement

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- React Native CLI
- Android Studio (pour Android)
- Xcode (pour iOS, macOS uniquement)

### Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd juriste-virtuel-mobile
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
```

3. **Installation des dépendances iOS (macOS uniquement)**
```bash
cd ios
pod install
cd ..
```

4. **Configuration des variables d'environnement**
```bash
# Créer un fichier .env
cp .env.example .env

# Configurer les variables
API_BASE_URL=https://votre-api-backend.com
OPENAI_API_KEY=votre_cle_api_openai
```

### Lancement en développement

**Android :**
```bash
npm run android
# ou
yarn android
```

**iOS :**
```bash
npm run ios
# ou
yarn ios
```

**Serveur de développement :**
```bash
npm start
# ou
yarn start
```

## 🏗️ Architecture du projet

```
src/
├── screens/           # Écrans de l'application
│   ├── HomeScreen.js  # Écran d'accueil
│   ├── ChatScreen.js  # Interface de chat
│   ├── SettingsScreen.js # Paramètres
│   └── AboutScreen.js # À propos
├── components/        # Composants réutilisables
├── services/         # Services API
├── utils/           # Utilitaires
└── config/          # Configuration
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# API Configuration
API_BASE_URL=https://juristevirtuel-api.herokuapp.com
OPENAI_API_KEY=votre_cle_api_openai

# App Configuration
APP_VERSION=1.0.0
BUILD_NUMBER=1

# Analytics (optionnel)
FIREBASE_PROJECT_ID=votre_projet_firebase
```

### Configuration Android

Le fichier `android/app/build.gradle` contient la configuration pour le build Android :

```gradle
android {
    defaultConfig {
        applicationId "com.juristevirtuel.app"
        versionCode 1
        versionName "1.0.0"
    }
}
```

### Configuration iOS

Le fichier `ios/JuristeVirtuel/Info.plist` contient la configuration iOS :

```xml
<key>CFBundleDisplayName</key>
<string>Juriste Virtuel</string>
<key>CFBundleShortVersionString</key>
<string>1.0.0</string>
```

## 📦 Build de production

### Android

1. **Générer le keystore de production**
```bash
keytool -genkey -v -keystore juristevirtuel-release-key.keystore \
        -alias juristevirtuel-key-alias \
        -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configurer le keystore dans `android/gradle.properties`**
```properties
MYAPP_UPLOAD_STORE_FILE=juristevirtuel-release-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=juristevirtuel-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=votre_mot_de_passe
MYAPP_UPLOAD_KEY_PASSWORD=votre_mot_de_passe
```

3. **Build APK**
```bash
cd android
./gradlew assembleRelease
```

4. **Build AAB (recommandé pour Google Play)**
```bash
cd android
./gradlew bundleRelease
```

### iOS

1. **Configuration dans Xcode**
   - Ouvrir `ios/JuristeVirtuel.xcworkspace`
   - Configurer le Bundle Identifier
   - Ajouter les certificats de distribution

2. **Build de production**
```bash
cd ios
xcodebuild -workspace JuristeVirtuel.xcworkspace \
           -scheme JuristeVirtuel \
           -configuration Release \
           -destination generic/platform=iOS \
           -archivePath JuristeVirtuel.xcarchive \
           archive
```

## 🚀 Déploiement

### Google Play Store

1. **Créer un compte Google Play Console** (25$ une fois)
2. **Créer une nouvelle application**
3. **Uploader l'AAB ou l'APK**
4. **Remplir les métadonnées**
5. **Soumettre pour review**

### App Store

1. **Créer un compte Apple Developer** (99$/an)
2. **Créer l'application dans App Store Connect**
3. **Uploader l'archive via Xcode**
4. **Remplir les métadonnées**
5. **Soumettre pour review**

## 🔒 Sécurité et conformité

### RGPD

L'application respecte le RGPD :
- Consentement explicite pour la collecte de données
- Droit à l'effacement des données
- Transparence sur l'utilisation des données
- Sécurisation des données personnelles

### Avertissements légaux

- L'application fournit des informations juridiques générales
- Les conseils ne remplacent pas une consultation avec un avocat
- Recommandation de consulter un professionnel pour des cas spécifiques

## 📊 Analytics et monitoring

### Firebase (optionnel)

```bash
# Installation Firebase CLI
npm install -g firebase-tools

# Configuration Firebase
firebase init
```

### Métriques à suivre

- Nombre d'utilisateurs actifs
- Temps de session moyen
- Taux de rétention
- Notes et avis utilisateurs
- Performance de l'application

## 🐛 Dépannage

### Problèmes courants

**Erreur Metro bundler :**
```bash
npx react-native start --reset-cache
```

**Erreur de build Android :**
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

**Erreur de build iOS :**
```bash
cd ios
pod deintegrate
pod install
```

### Logs de débogage

```bash
# Android
adb logcat

# iOS
xcrun simctl spawn booted log stream --predicate 'process == "JuristeVirtuel"'
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

- **Email** : support@juristevirtuel.com
- **Documentation** : https://docs.juristevirtuel.com
- **Issues** : https://github.com/votre-repo/issues

## 🙏 Remerciements

- React Native Community
- OpenAI pour l'API GPT
- Tous les contributeurs du projet

---

**Note** : Cette application est fournie à titre de démonstration. Pour un usage en production, assurez-vous de respecter toutes les réglementations locales et d'obtenir les autorisations nécessaires.