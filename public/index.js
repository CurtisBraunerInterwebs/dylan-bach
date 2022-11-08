// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, ref, set, get, onValue, child, update, push} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"
import { getStorage, ref as refST, listAll, uploadBytes } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js";
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
      const storeRef = refST(storage);
      const imagesRef = refST(storage, '/pictures/');
      //console.log("init started");
      var user;
      window.location.hash = 'welcome';
      var contactReady = true;

    var guests;
    var guestList = [];
    var guestVals = [];
    var picList = [];

    function listFiles () {
        listAll(imagesRef).then((ref) => {
            //set(ref(db, '/pics'),{});
            console.log(Object.values(ref.items));
        })
    }

    listFiles();

    function emptyDB(){
        get(ref(db,'/')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log('data available');
            } else {
                alert('No Guest Info');
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
    var picCount = 0;
    emptyDB();

    function listGuests () {
        console.log('listing guests');
        var guest;
        var names = document.getElementById('rsvpName');
        get(ref(db,'/guests')).then((snapshot) => {
            if (snapshot.exists()) {
                guests = snapshot.val(); //console.log(guests);
                guestVals = Object.values(guests); //console.log(guestVals);                
                if (guests.name == "Bungus") {
                    set(ref(db,'/guests'),{
                        'Dylan': {
                            'name':'Dylan',
                            'phone':'516-242-0709',
                            'role':'Groom',
                            'email': 'dylangordon999@gmail.com',
                            'rsvp':false
                        },'Curtis':{
                            'name':'Curtis',
                            'phone':'781-244-7604',
                            'role':'Best Man',
                            'email':'crbs1234@gmail.com',
                            'rsvp':false
                        }
                });}
                for (let i=0; i<guestVals.length; i++)  {
                    guest = guestVals[i].name;
                    //console.log(guest + ' loaded');
                    guestList[i] = guest;
                    //console.log(guest + ' on list');
                    var nameOpt = document.createElement('option');
                    nameOpt.setAttribute('value',guest);
                    nameOpt.innerHTML = guest;
                    names.add(nameOpt);
                }
                //console.log(guestList);
            } else {
                if (confirm('Reload Dylan & Curtis only to guest list') == true) {
                console.log('setting guests');
                set(ref(db,'/guests'),{
                    'Dylan': {
                        'name':'Dylan',
                        'phone':'516-242-0709',
                        'role':'Groom',
                        'email': 'dylangordon999@gmail.com',
                        'rsvp':false
                    },'Curtis':{
                        'name':'Curtis',
                        'phone':'781-244-7604',
                        'role':'Best Man',
                        'email':'crbs1234@gmail.com',
                        'rsvp':false
                    }
                });
                listGuests(); 
                } else {
                    alert('check the guest list, bitch');
                }
            }
            });            
    }

    function listPics () {
        get(ref(db,'/pics')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log('Pic List Present');
                let pics = snapshot.val(); console.log(pics);
                let picVals = Object.values(pics); console.log(picVals);
                for (let i=0; i<picVals.length; i++) {
                    let picture = picVals[i].name;
                    //console.log(picture + ' loaded');
                    picList[i] = picture;
                }
                picCount = picVals.length;
            } else {
                console.log('No Pic List');
                picCount = 4;
                set(ref(db,'/pics'),{
                    'pic 1':{
                        'name':'hugging_bear.jpg',
                        'path':"pictures",
                        'order':'1'
                    }, 'pic 2':{
                        'name':'le_double_fist.jpg',
                        'path':"pictures",
                        'order':'2'
                    }, 'pic 3': {
                        'name':'ST_Pat_Hat.jpg',
                        'path':"pictures",
                        'order':'3'
                    }, 'pic 4': {
                        'name':'mmcd_newyears.jpg',
                        'path':"pictures",
                        'order':'4'
                    }
                })
            }
        })
    }
    
    listGuests();
    listPics();

    document.getElementById('rsvpName').addEventListener('change', function(){
        var guestName = document.getElementById('rsvpName').value;
        //console.log(guests);
        //console.log(guestName);
        //console.log(guests[guestName]['email']);
        var guestInfo;
        get(ref(db, '/guests/'+guestName),(snapshot) => {guestInfo = Object.values(snapshot.val);})
        console.log(guestInfo);
        //if guestInfo[]
        var rsvpING = confirm('Hi ' + guestName + ' are you ready to RSVP to \nDARNGEON CRAWL of NYC?' );
        if (rsvpING) {
            update(ref(db, '/guests/'+guestName),{
                'rsvp':true   
            });                
            console.log(guestName + ' has RSVP\'D');}
    });

    function dblChk (question) {
        var answer;
        if (confirm(question)) {
            answer = true;
        } else {
            answer = false;
        }
        return 
    }

    document.getElementById('addGuest').addEventListener('click', function () {
        let info = prompt('Name, Phone, Role, Email, RSVP',"");
        let infoList = info.split(", ");
        console.log(infoList);
        if (infoList[4] != 'yes') {infoList[4] = false;} else {infoList[4] = true;}
        addGuests(infoList[0],infoList[1],infoList[2],infoList[3],infoList[4]);
    });

    function addGuests (name, phone, role, email, rsvp) {
        set(ref(db,'/guests/' + name),{
                'name':name,
                'phone':phone,
                'role':role,
                'email':email,
                'rsvp':rsvp
        })
    }

    setInterval(scroll, 4500) ;  
        var setScroll = false;
      function scroll() {
        //console.log("scrolling");
        //let buttons = document.getElementsByClassName("carousel-open");
        //console.log(picList);
        //check which is checked
        for (let i=0; i<picList.length; i++) {
                switchCarousel(i);
                if (setScroll) {break;}
            } 
        }
    
      function switchCarousel (i) {
            //console.log(i);
            var curr = i+1; 
            var next = curr+1;
            if (curr==picList.length) {
                //console.log('restart pic scroll');
                next = 1;
            } 
            var currCaro = document.getElementById('carousel-'+curr);
            //console.log(currCaro);
            var nextCaro = document.getElementById('carousel-'+next);
            //console.log(nextCaro);
            if (currCaro.getAttribute("checked") == "checked") { 
               currCaro.removeAttribute("checked");
               nextCaro.setAttribute("checked", "checked");
                setScroll = true;
            } else {
                setScroll = false;
            } 
        }
      
    var picSelect = document.getElementById('newPicImg');
    var picUpload = document.getElementById('uploadPic');
    var picName = document.getElementById('newPicName');

    picSelect.addEventListener('change', function(){
        if (picSelect.value != null) {
            picUpload.removeAttribute('disabled');
        }
    })

    picUpload.addEventListener('click', function(){
        addPicToScroll();
    });

    function addPicToScroll () {
        var picImg = picSelect.files[0];
        console.log(picImg.name);
        var picRef = imagesRef.child('pictures/'+picImg.name);
        console.log(picRef);
        //picImg.name = picName.innerHTML;
        console.log(picImg);
        var labelList = document.getElementById("caro-ind-list");
        picCount++;
        uploadBytes(picRef, picImg);
        //Picture Flipper
        var newPicInput = document.createElement("input");
        makeElements (newPicInput, "carousel-" + picCount, null,"carousel","carousel-open","type","radio", "hidden","");
        
        //Picture Container
        var newPicDiv = document.createElement("div");
        newPicDiv.setAttribute("class","carousel-item");
        newPicDiv.setAttribute("id","carousel-item-div");
        //Picture Path
        var newPicImg = document.createElement("img");
        newPicImg.setAttribute("src","pictures/" + picName.value);
        newPicDiv.appendChild(newPicImg);
        document.getElementById("carousel-inner-ID").insertBefore(newPicDiv, labelList);
        document.getElementById("carousel-inner-ID").insertBefore(newPicInput, newPicDiv);
        picSelect.value, picName.value = "";
    }

    function makeElements (newEl, id, inHTML, name, clss, rand, randVal, rand2, rand2Val) {
        if (id != undefined) {newEl.setAttribute('id', id); }
        if (inHTML != undefined) {newEl.innerHTML = inHTML; }
        if (name != undefined) {newEl.setAttribute('name', name); }
        if (clss != undefined) {newEl.setAttribute('class', clss); }
        if (rand != undefined) {newEl.setAttribute(rand, randVal); }
        if (rand != undefined) {newEl.setAttribute(rand2, rand2Val); }
      }
}