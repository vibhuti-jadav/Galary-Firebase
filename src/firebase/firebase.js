// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBePYKBo9dCUhB2SabxOdKPPl6VZZUWPOA",
  authDomain: "demoauth-16f49.firebaseapp.com",
  projectId: "demoauth-16f49",
  storageBucket: "demoauth-16f49.firebasestorage.app",
  messagingSenderId: "644945079898",
  appId: "1:644945079898:web:2e245b02021a5806793263",
  measurementId: "G-DP5WVZ0P6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const storage = getStorage(app)