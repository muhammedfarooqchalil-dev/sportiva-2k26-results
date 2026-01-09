// INSTRUCTIONS FOR THE USER:
// 1. Go to console.firebase.google.com
// 2. Create a new project "Sportiva 2K26"
// 3. Enable "Firestore Database" (Start in Test Mode)
// 4. Enable "Authentication" (Email/Password provider)
// 5. Go to Project Settings -> General -> "Your apps" -> Web App
// 6. Copy the "firebaseConfig" object values below.

// For this demo to work immediately without keys, we will leave these empty.
// The app checks for valid keys; if missing, it runs in "Local Demo Mode".

export const firebaseConfig = {
  apiKey: "", // Paste apiKey here
  authDomain: "", // Paste authDomain here
  projectId: "", // Paste projectId here
  storageBucket: "", // Paste storageBucket here
  messagingSenderId: "", // Paste messagingSenderId here
  appId: "" // Paste appId here
};

export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== "" && firebaseConfig.projectId !== "";
};