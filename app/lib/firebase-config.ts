import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuRa_Q-RXwG5hh2O8NwzcrzM_fzZWfuIM",
  authDomain: "task-app-d5182.firebaseapp.com",
  projectId: "task-app-d5182",
  storageBucket: "task-app-d5182.firebasestorage.app",
  messagingSenderId: "10690791023",
  appId: "1:10690791023:web:49b41608a71549f92fef9a",
  measurementId: "G-BJGXYN9NNX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
