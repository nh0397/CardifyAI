// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsZrZ0aEUZjuUxCnB2msYTyimxns5EOII",
  authDomain: "flashcard-5c904.firebaseapp.com",
  projectId: "flashcard-5c904",
  storageBucket: "flashcard-5c904.appspot.com",
  messagingSenderId: "1092071768259",
  appId: "1:1092071768259:web:a65de0929e08e0f2cee276",
  measurementId: "G-VNT15TRJFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);