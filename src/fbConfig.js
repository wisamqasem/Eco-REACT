import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC-aurZddC1Qdq3aHdgCFifdHU6Z_27KNc",
    authDomain: "eco-project-b064f.firebaseapp.com",
    projectId: "eco-project-b064f",
    storageBucket: "eco-project-b064f.appspot.com",
    messagingSenderId: "474195194314",
    appId: "1:474195194314:web:b988e666ff93f902d61f33"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  //firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase
