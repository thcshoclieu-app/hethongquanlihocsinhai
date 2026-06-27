import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// In a real project, these would be in import.meta.env
// We are hardcoding the config for this AI Studio project as it uses a provisioned instance
const firebaseConfig = {
  projectId: "booming-cocoa-f2t1j",
  appId: "1:469387274384:web:850978c8ac5fe1fdf75015",
  apiKey: "AIzaSyB8sKTQMcdlPJ_sPhiQRQ3VK0YzkUOUdnE",
  authDomain: "booming-cocoa-f2t1j.firebaseapp.com",
  storageBucket: "booming-cocoa-f2t1j.firebasestorage.app",
  messagingSenderId: "469387274384",
  measurementId: ""
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-4dbcf76a-8fe1-45a5-a3a9-f1ef7d325d93");
export const storage = getStorage(app);

export default app;
