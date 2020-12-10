//import * as firebase from "firebase/app";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


//for this tutorial I have exposed the config object, but for a real production environment, never expose the folowing keys in public repos.

const config = {
    apiKey: "AIzaSyC-aurZddC1Qdq3aHdgCFifdHU6Z_27KNc",
    authDomain: "eco-project-b064f.firebaseapp.com",
    projectId: "eco-project-b064f",
    storageBucket: "eco-project-b064f.appspot.com",
    messagingSenderId: "474195194314",
    appId: "1:474195194314:web:b988e666ff93f902d61f33",
  databaseURL: "gs://eco-project-b064f.appspot.com"

};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const f = firebase;
// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = firebase.storage();
// Create a storage reference from our storage service
export const storageRef = storage.ref();
export const database = firebase.firestore();
