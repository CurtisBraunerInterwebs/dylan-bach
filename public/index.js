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
    var guests, guestList;

    function listGuests () {
        var guest, guestVals;
        get(ref(db,'/guests')),((snapshot) => {
            if (snapshot.exists()) {
                guests = snapshot.val(); guestVals = Object.values(guests);
                console.log(guests);
                for (let i=0; i<guestVals; i++)  {
                    guest = guestVals[i];
                    guestList[i] = guest;
                    console.log(guest + ' loaded');
                }
            } else {
                if (dblChk('Reload Dylan & Curtis only to guest list')) {
                console.log('setting guests');
                set(ref(db,'/guests'),{
                    'dylan': {
                        'name':'Dylan',
                        'phone':'516-242-0709',
                        'role':'Groom',
                        'email': 'dylangordon999@gmail.com'
                    },'curtis':{
                        'name':'Curtis',
                        'phone':'781-244-7604',
                        'role':'Best Man',
                        'email':'crbs1234@gmail.com'
                    }
                });
                listGuests(); 
                } else {
                    alert('check the guest list, bitch');
                }
            }
            });
            console.log(guestList);
    }

    function dblChk (question) {
        var answer;
        if (confirm(question)) {
            answer = true;
        } else {
            answer = false;
        }
        return 
    }

    function addGuests (id, name, phone, role, email) {
        var nameID = id;
        set(ref(db,'/guests' + nameID),{
                'name':name,
                'phone':phone,
                'role':role,
                'email':email
        })
    }

    var picCount = 0;

    function addPicToScroll (pic) {
        var newPicInput = document.createElement("input");
        makeElements (newPicInput, "carousel-" + picCount+1, null,"carousel","carousel-open","type","radio", "hidden","");
        var newPicDiv = document.createElement("div");
        newPicDiv.setAttribute("class","carousel-item");
        var newPicImg = document.createElement("img");
        newPicImg.setAttribute("src","'pictures/"+pic);
        newPicDiv.appendChild(newPicImg);
        document.getElementById("carousel-inner-ID").appendChild(newPicInput);
        document.getElementById("carousel-inner-ID").appendChild(newPicDiv);
    }
    
    
    listGuests();     

    function makeElements (newEl, id, inHTML, name, clss, rand, randVal, rand2, rand2Val) {
        if (id != undefined) {newEl.setAttribute('id', id); }
        if (inHTML != undefined) {newEl.innerHTML = inHTML; }
        if (name != undefined) {newEl.setAttribute('name', name); }
        if (clss != undefined) {newEl.setAttribute('class', clss); }
        if (rand != undefined) {newEl.setAttribute(rand, randVal); }
        if (rand != undefined) {newEl.setAttribute(rand2, rand2Val); }
      }