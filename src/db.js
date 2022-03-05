// import firebase from "firebase/app";
// import "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const config = {
  // API keys here
  apiKey: "AIzaSyBHwBQmc-NWlFAwI3cGuanLC3p1tTdQnic",
  authDomain: "chatyo-9db6a.firebaseapp.com",
  projectId: "chatyo-9db6a",
  storageBucket: "chatyo-9db6a.appspot.com",
  messagingSenderId: "1081611837438",
  appId: "1:1081611837438:web:e2b15f745a8a235073aaaf",
};

const db = firebase.initializeApp(config);
export default db;
