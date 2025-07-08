// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASAFuwmLMhjPKHFOc6Xfz3hd0Nc0jYk7U",
  authDomain: "examples-a5663.firebaseapp.com",
  projectId: "examples-a5663",
  storageBucket: "examples-a5663.firebasestorage.app",
  messagingSenderId: "444891471077",
  appId: "1:444891471077:web:a775a820a73260d46ec80c"
};

// Initialize Firebase (avoid duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app); 