import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase";
import 'antd/dist/antd.css';
var firebaseConfig = {
    apiKey: "AIzaSyBsCp318EyIUlV2vS9JTKZph0ydMoUmPnU",
    authDomain: "instagram-storages.firebaseapp.com",
    databaseURL: "https://instagram-storages.firebaseio.com",
    projectId: "instagram-storages",
    storageBucket: "instagram-storages.appspot.com",
    messagingSenderId: "942133524843",
    appId: "1:942133524843:web:04e1a89679de2b1ff7b42e",
    measurementId: "G-PKG9N71PSM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
