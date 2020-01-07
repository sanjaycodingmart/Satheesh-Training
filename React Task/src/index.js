import React from "react"
import ReactDOM from "react-dom"
import  App from './app';
import * as firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyCXObN9zYOow4xXiEUtQF3pu6JxdCxK8lI",
    authDomain: "display-book-details.firebaseapp.com",
    databaseURL: "https://display-book-details.firebaseio.com",
    projectId: "display-book-details",
    storageBucket: "display-book-details.appspot.com",
    messagingSenderId: "654421937738",
    appId: "1:654421937738:web:b8838b52ff715666a7e0b3",
    measurementId: "G-JCJX19BKBP"
  };
firebase.initializeApp(firebaseConfig);
ReactDOM.render(<App />,
document.getElementById('root'))