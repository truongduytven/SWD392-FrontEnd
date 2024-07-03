import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, getIdToken,getRedirectResult} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBWGesf9tj9Xj2sHElFIgHkzQRm48VZEjk",
  authDomain: "the-bus-journey.firebaseapp.com",
  projectId: "the-bus-journey",
  storageBucket: "the-bus-journey.appspot.com",
  messagingSenderId: "306591310911",
  appId: "1:306591310911:web:f4280624ccb460eb1c448a",
  measurementId: "G-NNYKD0BVM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export{auth,provider};

// 887412650578-vul7m42hbph5r7ubkqnl5kh335q35ka6.apps.googleusercontent.com