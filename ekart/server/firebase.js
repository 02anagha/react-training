import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDqOvvJuqi0KK0Yx1a2dDhV0hP2hEBczwk",
  authDomain: "ekart-d34fa.firebaseapp.com",
  projectId: "ekart-d34fa",
  storageBucket: "ekart-d34fa.appspot.com",
  messagingSenderId: "291488961676",
  appId: "1:291488961676:web:24ef82c36ece40c37257a9",
  measurementId: "G-CYRGEV737K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);