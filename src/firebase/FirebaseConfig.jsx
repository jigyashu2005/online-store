// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqG9kvN366jxtccN3JEQA76nv-zQg_SWw",
  authDomain: "myapp-1322b.firebaseapp.com",
  projectId: "myapp-1322b",
  storageBucket: "myapp-1322b.appspot.com",
  messagingSenderId: "653620907993",
  appId: "1:653620907993:web:99f02a8f251444e0b213c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB=getFirestore(app);
const auth = getAuth(app); 

export {fireDB,auth};
