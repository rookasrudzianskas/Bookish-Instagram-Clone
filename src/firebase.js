import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBfMSiud8Jlo5V5SDr4gCQDSfpWYkezwQE",
    authDomain: "instagram-clone-react-f4410.firebaseapp.com",
    projectId: "instagram-clone-react-f4410",
    storageBucket: "instagram-clone-react-f4410.appspot.com",
    messagingSenderId: "189391875106",
    appId: "1:189391875106:web:d1fb80fc624fd0d6cdae7b",
    measurementId: "G-X6WF4EY6Y9"
});
const db = firebaseApp.firestore();
const auth = firebase.auth()
const storage = firebase.storage();

export {db, auth, storage};