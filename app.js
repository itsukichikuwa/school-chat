import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {

apiKey:"ここ",
authDomain:"ここ",
projectId:"ここ",
appId:"ここ"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

window.signup=async function(){

const email=document.getElementById("email").value

const pass=document.getElementById("password").value

await createUserWithEmailAndPassword(auth,email,pass)

alert("登録成功")

}

window.login=async function(){

const email=document.getElementById("email").value

const pass=document.getElementById("password").value

await signInWithEmailAndPassword(auth,email,pass)

document.getElementById("login").style.display="none"

document.getElementById("chatUI").style.display="block"

loadMessages()

}

function loadMessages(){

const q=query(collection(db,"messages"),orderBy("time"))

onSnapshot(q,(snapshot)=>{

const box=document.getElementById("messages")

box.innerHTML=""

snapshot.forEach(doc=>{

const data=doc.data()

const div=document.createElement("div")

div.className="message"

div.innerText=data.text

box.appendChild(div)

})

})

}

window.send=async function(){

const text=document.getElementById("msg").value

await addDoc(collection(db,"messages"),{

text:text,

time:Date.now()

})

document.getElementById("msg").value=""

}
