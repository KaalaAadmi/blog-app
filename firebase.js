import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAEZB0vS01WuRLSB1z9cG8VX1-zXmZefkk",
  authDomain: "blog-aaa0e.firebaseapp.com",
  projectId: "blog-aaa0e",
  storageBucket: "blog-aaa0e.appspot.com",
  messagingSenderId: "889767688627",
  appId: "1:889767688627:web:dbb438d07c0da1021af3c6",
  measurementId: "G-NS19WS258B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
