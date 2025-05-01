// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYaqJfOJW4LhJg5NZ3kZe0cxdregJeV7M",
  authDomain: "quiz-6b841.firebaseapp.com",
  projectId: "quiz-6b841",
  storageBucket: "quiz-6b841.firebasestorage.app",
  messagingSenderId: "517720295241",
  appId: "1:517720295241:web:4cab4552431d553bccfc98",
  measurementId: "G-JF57TBCEYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);