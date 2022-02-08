// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUHE5Ae7dRfeIahkyMAAPPYbCexSN7z1w",
  authDomain: "groupup-f68f4.firebaseapp.com",
  projectId: "groupup-f68f4",
  storageBucket: "groupup-f68f4.appspot.com",
  messagingSenderId: "600044995945",
  appId: "1:600044995945:web:9f236708da6e2d7f8f69f8",
  measurementId: "G-C5269RJY74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export default getFirestore();