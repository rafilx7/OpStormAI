import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Helper robusto para pegar variáveis de ambiente (Vite ou Node)
const getEnv = (key: string, fallback: string) => {
  // 1. Tenta formato Vite (import.meta.env)
  // Nota: No Vercel/Vite, as variáveis devem começar com VITE_ para serem expostas
  const viteKey = `VITE_${key}`;
  
  // Fixed: Cast import.meta to any to avoid TypeScript error "Property 'env' does not exist on type 'ImportMeta'"
  const meta = import.meta as any;
  if (meta.env && meta.env[viteKey]) {
    return meta.env[viteKey];
  }
  
  // 2. Tenta formato Node/Process (fallback)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }

  return fallback;
};

const firebaseConfig = {
  apiKey: getEnv("FIREBASE_API_KEY", "AIzaSyBjYawW8DLefFJUOtGZO2Zd9M_Pkg6NXJ0"),
  authDomain: getEnv("FIREBASE_AUTH_DOMAIN", "insights-fbfa3.firebaseapp.com"),
  projectId: getEnv("FIREBASE_PROJECT_ID", "insights-fbfa3"),
  storageBucket: getEnv("FIREBASE_STORAGE_BUCKET", "insights-fbfa3.firebasestorage.app"),
  messagingSenderId: getEnv("FIREBASE_MESSAGING_SENDER_ID", "793533688132"),
  appId: getEnv("FIREBASE_APP_ID", "1:793533688132:web:ff11037b60af8903ec0f11")
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);