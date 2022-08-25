import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAAjC3aeXsUIdbbhTHtEo7nFORJtg-ZupI",
    authDomain: "empatt-4da1f.firebaseapp.com",
    projectId: "empatt-4da1f",
    storageBucket: "empatt-4da1f.appspot.com",
    messagingSenderId: "986318587179",
    appId: "1:986318587179:web:c248080c78b335d6c6b16e"
  };

  const app = initializeApp(firebaseConfig);
  
  export const db = getFirestore(app);
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();
