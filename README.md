# Portfolio React + Firebase 🔥

Modern portfolio with ultra-smooth animations (GSAP + Lenis) and torch/spotlight effect.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd my-portfolio
npm install
```

### 2. Firebase Configuration

#### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name your project (e.g., "my-portfolio")
4. Disable Google Analytics (optional)
5. Click "Create project"

#### Step 2: Add Web App

1. In Firebase Console, click the **Web** icon (`</>`)
2. Name your app (e.g., "Portfolio Web")
3. **DO NOT** check "Firebase Hosting" yet
4. Click "Register app"

#### Step 3: Get Configuration Keys

You'll see a `firebaseConfig` object like this:

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

#### Step 4: Create .env File

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace with your Firebase values:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=my-portfolio-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my-portfolio-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=my-portfolio-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Step 5: Enable Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose **Test mode** (for development)
4. Select a region (e.g., `europe-west1`)
5. Click "Enable"

#### Step 6: Enable Storage

1. In Firebase Console, go to **Build** → **Storage**
2. Click "Get started"
3. Choose **Test mode**
4. Click "Next" then "Done"

#### Step 7: Enable Authentication

1. In Firebase Console, go to **Build** → **Authentication**
2. Click "Get started"
3. Enable **Email/Password** in "Sign-in method" tab
4. Click "Save"

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your portfolio!

## ✨ Features

- ✅ **Torch/spotlight effect** following cursor
- ✅ **Ultra-smooth scroll** with Lenis
- ✅ **GSAP animations** on scroll
- ✅ **Tailwind CSS** for styling
- ✅ **Firebase** backend ready
- 🔜 Portfolio, About, Resume, Contact sections
- 🔜 Admin dashboard for content management

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── TorchEffect.jsx    # Torch effect component
│   │   ├── sections/              # Page sections
│   │   ├── ui/                    # UI components
│   │   └── admin/                 # Admin dashboard
│   ├── hooks/
│   │   ├── useLenis.js            # Smooth scroll hook
│   │   ├── useScrollAnimation.js  # Scroll animations hook
│   │   └── useTorchEffect.js      # Torch effect hook
│   ├── services/
│   │   └── firebase.js            # Firebase config
│   ├── App.jsx
│   └── main.jsx
├── .env                           # Firebase credentials
└── package.json
```

## 🎨 Customization

### Colors

Edit Tailwind config in `tailwind.config.js`:

```javascript
colors: {
  accent: {
    DEFAULT: '#aa70e0',  // Primary color
  },
  secondary: {
    DEFAULT: '#7059e2',  // Secondary color
  },
}
```

### Torch Effect

Adjust size and opacity in `src/components/layout/TorchEffect.jsx`:

```javascript
const TORCH_SIZE = 300;      // Spotlight size in pixels
const TORCH_OPACITY = 0.15;  // Opacity (0-1)
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **GSAP 3** - Animations
- **Lenis** - Smooth scroll
- **Firebase** - Backend (Firestore, Storage, Auth)

## 🎯 Admin Dashboard

The portfolio includes a **full-featured admin dashboard** for content management!

### Access Admin Panel

1. **Create admin user** in Firebase Console:
   - Go to Authentication → Users → Add User
   - Set email and password

2. **Login** at: `http://localhost:5173/admin/login`

### Admin Features

- 📊 **Dashboard** - Stats overview and recent activity
- 👤 **Profile** - Edit profile info and upload avatar
- 📁 **Projects** - Manage portfolio projects (CRUD + image upload)
- 💡 **Skills** - Manage skills with proficiency levels
- 🎓 **Resume** - Edit experience and education
- 📧 **Messages** - View contact form submissions

### Admin Routes

- `/admin/login` - Login page
- `/admin/dashboard` - Overview
- `/admin/profile` - Profile editor
- `/admin/projects` - Projects management
- `/admin/skills` - Skills management
- `/admin/resume` - Resume editor
- `/admin/messages` - Messages inbox

## 📚 Project Status

1. ✅ Initial setup
2. ✅ Tailwind CSS configuration
3. ✅ Firebase setup
4. ✅ Create sections (Hero, Portfolio, About, Resume, Contact)
5. ✅ Implement GSAP animations
6. ✅ Connect Firestore for data
7. ✅ **Build admin dashboard** ← Just completed!
8. 🔜 Deploy to Firebase Hosting

## 🆘 Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [GSAP Documentation](https://gsap.com/docs/v3/)
- [Lenis Documentation](https://github.com/studio-freight/lenis)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/)
