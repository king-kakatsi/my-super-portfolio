# Portfolio React + Firebase 🔥

Portfolio moderne avec animations fluides (GSAP + Lenis) et effet torch/spotlight.

## 🚀 Setup Initial

### 1. Installation des dépendances

```bash
cd my-portfolio
npm install
```

### 2. Configuration Firebase

#### Étape 1 : Créer un projet Firebase

1. Va sur [Firebase Console](https://console.firebase.google.com/)
2. Clique sur "Ajouter un projet"
3. Nomme ton projet (ex: "my-portfolio")
4. Désactive Google Analytics (optionnel)
5. Clique sur "Créer le projet"

#### Étape 2 : Ajouter une application Web

1. Dans la console Firebase, clique sur l'icône **Web** (`</>`)
2. Nomme ton app (ex: "Portfolio Web")
3. **NE PAS** cocher "Firebase Hosting" pour l'instant
4. Clique sur "Enregistrer l'application"

#### Étape 3 : Récupérer les clés de configuration

Tu vas voir un objet `firebaseConfig` qui ressemble à ça :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "my-portfolio-xxxxx.firebaseapp.com",
  projectId: "my-portfolio-xxxxx",
  storageBucket: "my-portfolio-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
  measurementId: "G-XXXXXXXXXX"
};
```

#### Étape 4 : Créer le fichier .env

1. Copie le fichier `.env.example` :
   ```bash
   cp .env.example .env
   ```

2. Ouvre `.env` et remplace les valeurs avec celles de Firebase :

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=my-portfolio-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my-portfolio-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=my-portfolio-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Étape 5 : Activer Firestore Database

1. Dans la console Firebase, va dans **Build** → **Firestore Database**
2. Clique sur "Créer une base de données"
3. Choisis **Mode test** (pour commencer)
4. Sélectionne une région (ex: `europe-west1`)
5. Clique sur "Activer"

#### Étape 6 : Activer Storage

1. Dans la console Firebase, va dans **Build** → **Storage**
2. Clique sur "Commencer"
3. Choisis **Mode test**
4. Clique sur "Suivant" puis "OK"

#### Étape 7 : Activer Authentication

1. Dans la console Firebase, va dans **Build** → **Authentication**
2. Clique sur "Commencer"
3. Active **Email/Password** dans l'onglet "Sign-in method"
4. Clique sur "Enregistrer"

### 3. Lancer le projet

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## ✨ Fonctionnalités

- ✅ **Effet torch/spotlight** qui suit le curseur
- ✅ **Smooth scroll** ultra-fluide avec Lenis
- ✅ **Animations GSAP** au scroll
- ✅ **Firebase** prêt pour le backend
- 🔜 Sections Portfolio, About, Resume, Contact
- 🔜 Dashboard admin pour gérer le contenu

## 📁 Structure du projet

```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── TorchEffect.jsx    # Effet torch
│   │   ├── sections/              # Sections du site
│   │   ├── ui/                    # Composants UI
│   │   └── admin/                 # Dashboard admin
│   ├── hooks/
│   │   ├── useLenis.js            # Smooth scroll
│   │   ├── useScrollAnimation.js  # Animations scroll
│   │   └── useTorchEffect.js      # Effet torch
│   ├── services/
│   │   └── firebase.js            # Config Firebase
│   ├── App.jsx
│   └── main.jsx
├── .env                           # Variables Firebase
└── package.json
```

## 🎨 Personnalisation

### Couleurs

Modifie les variables CSS dans `src/App.css` :

```css
:root {
  --accent: #aa70e0;      /* Couleur principale */
  --secondary: #7059e2;   /* Couleur secondaire */
  --base: #111111;        /* Fond */
}
```

### Effet Torch

Ajuste la taille et l'opacité dans `src/components/layout/TorchEffect.jsx` :

```javascript
background: `radial-gradient(
  circle 300px at ${x}px ${y}px,  // Taille du halo
  rgba(255, 255, 255, 0.15),      // Opacité
  transparent 80%
)`
```

## 📚 Prochaines étapes

1. ✅ Setup initial
2. ⏳ **Configuration Firebase** ← Tu es ici !
3. 🔜 Créer les sections (Hero, Portfolio, About, etc.)
4. 🔜 Implémenter les animations GSAP
5. 🔜 Connecter Firestore pour les données
6. 🔜 Créer le dashboard admin
7. 🔜 Déployer sur Firebase Hosting

## 🆘 Besoin d'aide ?

- [Documentation Firebase](https://firebase.google.com/docs)
- [Documentation GSAP](https://gsap.com/docs/v3/)
- [Documentation Lenis](https://github.com/studio-freight/lenis)
