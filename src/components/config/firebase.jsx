import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQcL5ubitJiVDmgmxtUOQlgbjj6vQW4RU",
  authDomain: "app-adim-pannel.firebaseapp.com",
  databaseURL: "https://app-adim-pannel-default-rtdb.firebaseio.com",
  projectId: "app-adim-pannel",
  storageBucket: "app-adim-pannel.firebasestorage.app",
  messagingSenderId: "793053748754",
  appId: "1:793053748754:web:422e2e9a08ffdaf80582cb",
  measurementId: "G-XRCFFY3V7Z"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 