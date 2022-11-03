// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, ref, set, get, onValue, child, update, push} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"
//import * as functions from "https://www.gstatic.com/firebasejs/9.8.4/firebase-functions.js";



//import * as firebaseui from "https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js"

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9clrgmmp4gLGdW2SftAn7RG6vlTR1gyA",
    authDomain: "dylan-bach.firebaseapp.com",
    projectId: "dylan-bach",
    storageBucket: "dylan-bach.appspot.com",
    messagingSenderId: "382846390451",
    appId: "1:382846390451:web:ee631f5ddc9c02db08a0c6",
    measurementId: "G-DLFKRF88QQ"
  };
  

window.addEventListener('DOMContentLoaded', function () {
        init();
        
    });

  // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const auth = getAuth(app);
      const analytics = getAnalytics(app);
      const fs = getFirestore(app);
      //console.log("init started");
      var user;
      window.location.hash = 'welcome';
      var contactReady = true;
     