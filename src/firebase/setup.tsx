import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,FacebookAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTDFlnS7ckV2tzVzuduH1tRjR770LkHaM",
  authDomain: "stackit-14bcf.firebaseapp.com",
  projectId: "stackit-14bcf",
  storageBucket: "stackit-14bcf.firebasestorage.app",
  messagingSenderId: "675549271765",
  appId: "1:675549271765:web:e6660f9cc4c654796ff45c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
export const storage = getFirestore(app)
export const db = getFirestore(app);
