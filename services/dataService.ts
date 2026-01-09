import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, onSnapshot } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { firebaseConfig, isFirebaseConfigured } from "../firebaseConfig";
import { Result } from "../types";

// --- Firebase Initialization ---
let db: any;
let auth: any;

if (isFirebaseConfigured()) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
}

// --- Mock Data for Demo Mode ---
const MOCK_LOCAL_STORAGE_KEY = "sportiva_results_v1";
const getLocalResults = (): Result[] => {
  const stored = localStorage.getItem(MOCK_LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// --- Data Service Methods ---

export const subscribeToResults = (callback: (results: Result[]) => void) => {
  if (isFirebaseConfigured() && db) {
    const q = query(collection(db, "results"), orderBy("timestamp", "desc"));
    return onSnapshot(q, (snapshot) => {
      const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Result));
      callback(results);
    });
  } else {
    // Polling or immediate return for local mode
    callback(getLocalResults());
    // In local mode, we don't really have subscriptions, but we can simulate updates 
    // if we trigger this manually. Ideally, we just call this once.
    // We'll return a no-op unsubscribe function.
    return () => {};
  }
};

export const addResult = async (result: Omit<Result, 'id'>) => {
  if (isFirebaseConfigured() && db) {
    await addDoc(collection(db, "results"), result);
  } else {
    const current = getLocalResults();
    const newResult = { ...result, id: Date.now().toString() };
    const updated = [newResult, ...current];
    localStorage.setItem(MOCK_LOCAL_STORAGE_KEY, JSON.stringify(updated));
    // Force a reload or callback update would be ideal, but for simplicity we rely on React state updates in the parent
    // actually, let's dispatch a custom event for local updates so the UI refreshes
    window.dispatchEvent(new Event('local-data-update'));
  }
};

export const deleteResult = async (id: string) => {
  if (isFirebaseConfigured() && db) {
    await deleteDoc(doc(db, "results", id));
  } else {
    const current = getLocalResults();
    const updated = current.filter(r => r.id !== id);
    localStorage.setItem(MOCK_LOCAL_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('local-data-update'));
  }
};

export const loginAdmin = async (email: string, pass: string): Promise<boolean> => {
  if (isFirebaseConfigured() && auth) {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      return true;
    } catch (e) {
      console.error("Login failed", e);
      return false;
    }
  } else {
    // Demo Mode Login
    if (email === "admin@college.com" && pass === "admin123") {
      localStorage.setItem("demo_auth", "true");
      window.dispatchEvent(new Event('local-auth-update'));
      return true;
    }
    return false;
  }
};

export const logoutAdmin = async () => {
  if (isFirebaseConfigured() && auth) {
    await signOut(auth);
  } else {
    localStorage.removeItem("demo_auth");
    window.dispatchEvent(new Event('local-auth-update'));
  }
};

export const subscribeToAuth = (callback: (user: User | { email: string } | null) => void) => {
  if (isFirebaseConfigured() && auth) {
    return onAuthStateChanged(auth, callback);
  } else {
    // Check initial state
    const checkAuth = () => {
      const isAuth = localStorage.getItem("demo_auth") === "true";
      callback(isAuth ? { email: "admin@college.com" } : null);
    };
    checkAuth();
    
    const handler = () => checkAuth();
    window.addEventListener('local-auth-update', handler);
    return () => window.removeEventListener('local-auth-update', handler);
  }
};

// Helper for local mode to refresh data
export const listenForLocalUpdates = (callback: (results: Result[]) => void) => {
   if (!isFirebaseConfigured()) {
     const handler = () => callback(getLocalResults());
     window.addEventListener('local-data-update', handler);
     return () => window.removeEventListener('local-data-update', handler);
   }
   return () => {};
}