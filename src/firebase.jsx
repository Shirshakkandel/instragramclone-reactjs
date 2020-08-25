import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCviJi59PHo-4-uDpnuJVWl2PKs4AoqjAI",
  authDomain: "shirshak-instragram.firebaseapp.com",
  databaseURL: "https://shirshak-instragram.firebaseio.com",
  projectId: "shirshak-instragram",
  storageBucket: "shirshak-instragram.appspot.com",
  messagingSenderId: "317807341783",
  appId: "1:317807341783:web:8a3eddd774e2f29fb1c092"
});

const db=firebaseApp.firestore();
const auth= firebase.auth();
const storage= firebase.storage();
export{db,auth,storage};




