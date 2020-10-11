import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBqi65Waw_gzRC-Z7gOF5ZzrHpd0GyWCX0",
    authDomain: "chit-for-chat.firebaseapp.com",
    databaseURL: "https://chit-for-chat.firebaseio.com",
    projectId: "chit-for-chat",
    storageBucket: "chit-for-chat.appspot.com",
    messagingSenderId: "100864184640",
    appId: "1:100864184640:web:0994195c217b71e16faaa5",
    measurementId: "G-7BLX989TK0"
  };


  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();

  const auth=firebase.auth();


  const provider = new firebase.auth.GoogleAuthProvider();
  export  {auth,provider};

  export default db;