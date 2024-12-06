// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZizE66XTlwg5VGW1Q27peIqYNLfCTbiA",
    authDomain: "submissionmlgc-heavenaldrico.firebaseapp.com",
    projectId: "submissionmlgc-heavenaldrico",
    storageBucket: "submissionmlgc-heavenaldrico.firebasestorage.app",
    messagingSenderId: "591680438085",
    appId: "1:591680438085:web:8f845f80c84a52e2d2482c",
    measurementId: "G-ZQDPWL5DXW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

module.exports.firestore = firestore;
