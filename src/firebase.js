import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBsrUkOzTLDYI7w_5AYGEExsonMbghODeo",
    authDomain: "e-commerce-4cc8e.firebaseapp.com",
    projectId: "e-commerce-4cc8e",
    storageBucket: "e-commerce-4cc8e.appspot.com",
    messagingSenderId: "524280940450",
    appId: "1:524280940450:web:127f66de4ef76ebdb994fb",
    measurementId: "G-C2JVJ7QYH1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
