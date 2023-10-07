// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'; // Add this import



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhaLZlq1uIMYBb2I2SQrsbAFzaRDGNLU4",
  authDomain: "eduplus-db8d3.firebaseapp.com",
  projectId: "eduplus-db8d3",
  storageBucket: "eduplus-db8d3.appspot.com",
  messagingSenderId: "751709209882",
  appId: "1:751709209882:web:1a9a6a04aa28ff79ca98a3",
  measurementId: "G-Q2VPP146KV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth here
const database = getFirestore(app);

export { auth, database };