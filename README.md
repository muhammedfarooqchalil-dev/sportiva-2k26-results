# Sportiva 2K26 - Annual Sports Meet Result System

A simple, real-time sports result management system for Jamia Islamiya Arts and Science College.

## 🚀 Quick Start (Local Demo Mode)

1.  Download all the files.
2.  Open `index.html` in your browser (Chrome, Edge, Firefox).
3.  **No installation required!** The app runs directly in the browser.
4.  **Admin Login (Demo Mode):**
    *   **Email:** `admin@college.com`
    *   **Password:** `admin123`
    *   *Note: In demo mode, data is saved to your browser's local storage. If you clear cache or change browsers, data will be lost.*

---

## ☁️ How to Publish to GitHub (Go Live)

To make this website available to everyone on the internet, follow these steps:

1.  **Create a GitHub Account:** Go to [github.com](https://github.com) and sign up.
2.  **Create a New Repository:**
    *   Click the "+" icon in the top right -> "New repository".
    *   Name it `sportiva-2k26`.
    *   Check "Add a README file".
    *   Click "Create repository".
3.  **Upload Files:**
    *   In your new repository, click "Add file" -> "Upload files".
    *   Drag and drop ALL the files from this project (index.html, index.tsx, folders, etc.).
    *   Click "Commit changes".
4.  **Enable GitHub Pages:**
    *   Go to **Settings** (tab at the top of the repo).
    *   Click **Pages** (in the left sidebar).
    *   Under **Build and deployment** -> **Source**, select `Deploy from a branch`.
    *   Under **Branch**, select `main` (or `master`) and `/ (root)`.
    *   Click **Save**.
5.  **Visit Your Site:**
    *   Wait about 1-2 minutes.
    *   Refresh the page. You will see a link like `https://your-username.github.io/sportiva-2k26/`.
    *   Click it to see your live website!

---

## 🔥 How to Connect Real Database (Firebase)

To allow multiple people to see results instantly on their own phones, you must connect a database.

1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Click **Add project** -> Name it "Sportiva 2K26".
3.  **Setup Database:**
    *   Click **Build** -> **Firestore Database** -> **Create Database**.
    *   Choose a location (e.g., *nam5 (us-central)* or *asia-south1*).
    *   **Important:** Start in **Test Mode** (allows easy access for the event duration).
4.  **Setup Authentication:**
    *   Click **Build** -> **Authentication** -> **Get Started**.
    *   Select **Email/Password** -> Enable it -> Save.
    *   Click **Users** tab -> **Add user** -> Create your admin email/password.
5.  **Get API Keys:**
    *   Click the **Gear Icon** (Project Settings) -> General.
    *   Scroll down to **Your apps** -> Click the `</>` (Web) icon.
    *   Register app (enter any name).
    *   Copy the `firebaseConfig` object (apiKey, authDomain, etc.).
6.  **Update Code:**
    *   Open `firebaseConfig.ts` in this project.
    *   Paste your keys into the `firebaseConfig` variable.
    *   Commit/Upload the changes to GitHub.

Now your app is live and synced across all devices!