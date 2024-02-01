// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN1j6qrHPBrAs1_w04RycIMSnrg5nyTEM",
  authDomain: "filex-f707f.firebaseapp.com",
  projectId: "filex-f707f",
  storageBucket: "filex-f707f.appspot.com",
  messagingSenderId: "283096959354",
  appId: "1:283096959354:web:088854b441ec51fd8b2ec3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { app, firestore };