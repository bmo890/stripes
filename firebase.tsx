import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdrM3cFWphFG6njVIBkZ8MlkVdZNSPq9k",
  authDomain: "stripes-bjj.firebaseapp.com",
  projectId: "stripes-bjj",
  storageBucket: "stripes-bjj.appspot.com",
  messagingSenderId: "620411124186",
  appId: "1:620411124186:web:031e22c4d9561376db68e3",
  measurementId: "G-5X336N3CFD"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);

