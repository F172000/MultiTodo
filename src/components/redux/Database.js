import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDQ21kBDUJ76vMYFRSDqL7UKJDk_quVAac",
  authDomain: "react-multitodo.firebaseapp.com",
  projectId: "react-multitodo",
  storageBucket: "react-multitodo.appspot.com",
  messagingSenderId: "158645805484",
  appId: "1:158645805484:web:fda901533827df6a645a09",
  measurementId: "G-R0P64FGJXB"
};

// Initialize Firebase
const firebaseapp=initializeApp(firebaseConfig);
const db=getFirestore(firebaseapp);
export default db;
