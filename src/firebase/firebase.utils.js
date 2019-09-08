import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA9kTvr_7w2MTW7FFSHqAQ2zsvU1WjhTTA",
    authDomain: "crown-db-e64d8.firebaseapp.com",
    databaseURL: "https://crown-db-e64d8.firebaseio.com",
    projectId: "crown-db-e64d8",
    storageBucket: "",
    messagingSenderId: "120379969790",
    appId: "1:120379969790:web:00a2c593cf8e6d060c55af"
  };


  firebase.initializeApp(config);


  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({ prompt:'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;