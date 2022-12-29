// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPUGFOiBV1gMEWwWrG2vr8veZ35H5OSQk",
  authDomain: "netflix-b51b1.firebaseapp.com",
  projectId: "netflix-b51b1",
  storageBucket: "netflix-b51b1.appspot.com",
  messagingSenderId: "55116504958",
  appId: "1:55116504958:web:5b9d6d80a7543b62dadd2f",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth();
