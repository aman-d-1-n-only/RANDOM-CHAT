 import firebase from 'firebase'
 import firestore from 'firebase/firestore'


 // Your web app's Firebase configuration
 var firebaseConfig = {
     apiKey: "AIzaSyA0ycWz-XZ-WgcZfRqUbYjTt8GPzNeZ1Uc",
     authDomain: "random-chat-75247.firebaseapp.com",
     databaseURL: "https://random-chat-75247.firebaseio.com",
     projectId: "random-chat-75247",
     storageBucket: "random-chat-75247.appspot.com",
     messagingSenderId: "542869475052",
     appId: "1:542869475052:web:f48c0fdb9415efc7931fc9",
     measurementId: "G-J0M0W08C31"
 };
 // Initialize Firebase
 const firebaseApp = firebase.initializeApp(firebaseConfig);
 firebase.analytics();

 export default firebaseApp.firestore()