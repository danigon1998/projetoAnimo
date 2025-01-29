import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZGhRhw0Rmcej634ADX2pBmhy36C3rqCg",
  authDomain: "devcurso-23d37.firebaseapp.com",
  projectId: "devcurso-23d37",
  storageBucket: "devcurso-23d37.firebaseapp.com",
  messagingSenderId: "176982448698",
  appId: "1:176982448698:web:43569469476198fab13303",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
