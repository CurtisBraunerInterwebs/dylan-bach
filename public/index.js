// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, ref, set, get, onValue, child, update, push} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"
import { getStorage, ref as refST } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js";
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

function init() {
  // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const auth = getAuth(app);
      const analytics = getAnalytics(app);
      const fs = getFirestore(app);
      const storage = getStorage();
      const imagesRef = refST(storage, 'images');
      //console.log("init started");
      var user;
      window.location.hash = 'welcome';
      var contactReady = true;

    var guests, guestList;

    function emptyDB(){
        get(ref(db,'/')).then((snapshot) => {
            if (snapshot.exists()) {
                console.log('data available');
            } else {
                set(ref(db,'/'),{
                    'guests':{
                        'name':'Bungus',
                        'role':'The Leef',
                        'phone':'16165165161'
                    }
                });
            }
        })
    }

    //emptyDB();

    function listGuests () {
        console.log('listing guests');
        var guest, guestVals;
        var names = document.getElementById('rsvpName');
        get(ref(db,'/guests')),((snapshot) => {
            if (snapshot.exists()) {
                guests = snapshot.val(); guestVals = Object.values(guests);
                console.log(guests);
                console.log(guestVals);
                for (let i=0; i<guestVals; i++)  {
                    guest = guestVals[i].name;
                    guestList[i] = guest;
                    console.log(guest + ' loaded');
                    var nameOpt = document.createElement('option');
                    nameOpt.setAttribute('value',guest);
                    names.appendChild(nameOpt);
                }
            } else {
                if (confirm('Reload Dylan & Curtis only to guest list') == true) {
                console.log('setting guests');
                set(ref(db,'/guests'),{
                    'dylan': {
                        'name':'Dylan',
                        'phone':'516-242-0709',
                        'role':'Groom',
                        'email': 'dylangordon999@gmail.com',
                        'rsvp':true
                    },'curtis':{
                        'name':'Curtis',
                        'phone':'781-244-7604',
                        'role':'Best Man',
                        'email':'crbs1234@gmail.com',
                        'rsvp':true
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

    listGuests();

    function dblChk (question) {
        var answer;
        if (confirm(question)) {
            answer = true;
        } else {
            answer = false;
        }
        return 
    }

    //document.getElementById('addGuest').addEventListener('click',addGuests())

    function addGuests (id, name, phone, role, email, rsvp) {
        var nameID = id;
        set(ref(db,'/guests' + nameID),{
                'name':name,
                'phone':phone,
                'role':role,
                'email':email,
                'rsvp':false
        })
    }



    setInterval(scroll, 7500) ;  

      function scroll() {
        //console.log("scrolling");
        let buttons = document.getElementsByClassName("carousel-open");
        //check which is checked
        // Pic 1
        if (buttons[0].getAttribute("checked") == "checked") {
          //console.log(buttons[0].getAttribute("id") + " checked");
          buttons[0].removeAttribute("checked");
          buttons[1].setAttribute("checked", "checked");
        // Pic 2
        } else if (buttons[1].getAttribute("checked") == "checked") {
          //console.log(buttons[1].getAttribute("id") + " checked");
          buttons[1].removeAttribute("checked");
          buttons[2].setAttribute("checked", "checked");
        // Pic 3
        } else if (buttons[2].getAttribute("checked") == "checked") {
          //console.log(buttons[2].getAttribute("id") + " checked");
          buttons[2].removeAttribute("checked");
          buttons[3].setAttribute("checked", "checked");
        //Pic 4
        } else if (buttons[3].getAttribute("checked") == "checked") {
          //console.log(buttons[3].getAttribute("id") + " checked");
          buttons[3].removeAttribute("checked");
          buttons[0].setAttribute("checked", "checked");
        }
      }

    var picCount = 0;

    document.getElementById('uploadPic').addEventListener('click', function(){
        addPicToScroll();
    })

    function addPicToScroll () {
        var picName = document.getElementById('newPicName');
        var picImg = document.getElementById('newPicImg').value;

    }

    /* function addPicToScroll (pic) {
        var newPicInput = document.createElement("input");
        makeElements (newPicInput, "carousel-" + picCount+1, null,"carousel","carousel-open","type","radio", "hidden","");
        var newPicDiv = document.createElement("div");
        newPicDiv.setAttribute("class","carousel-item");
        newPicDiv.setAttribute("id","carousel-item-div");
        var newPicImg = document.createElement("img");
        newPicImg.setAttribute("src","'pictures/"+pic);
        newPicDiv.appendChild(newPicImg);
        document.getElementById("carousel-inner-ID").appendChild(newPicInput);
        document.getElementById("carousel-inner-ID").appendChild(newPicDiv);

    } */
    
    
    listGuests();     

    function makeElements (newEl, id, inHTML, name, clss, rand, randVal, rand2, rand2Val) {
        if (id != undefined) {newEl.setAttribute('id', id); }
        if (inHTML != undefined) {newEl.innerHTML = inHTML; }
        if (name != undefined) {newEl.setAttribute('name', name); }
        if (clss != undefined) {newEl.setAttribute('class', clss); }
        if (rand != undefined) {newEl.setAttribute(rand, randVal); }
        if (rand != undefined) {newEl.setAttribute(rand2, rand2Val); }
      }
}