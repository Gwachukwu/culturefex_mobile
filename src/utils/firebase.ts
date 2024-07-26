// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKuyPdCtao9dO9yXc-FPOZtRzSs-kKPkA",
  authDomain: "culturefex-7a63f.firebaseapp.com",
  projectId: "culturefex-7a63f",
  storageBucket: "culturefex-7a63f.appspot.com",
  messagingSenderId: "260846266791",
  appId: "1:260846266791:web:ae97c3a1c6f94635d9ae82",
  measurementId: "G-FWSB8N5QK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
export {app,auth}