  import firebase from 'firebase';
  const firebaseapp = firebase.initializeApp( {
    apiKey: "AIzaSyCHE-70ALBBMi96b1XbL161SSq5iaNCf_Y",
    authDomain: "instagram-clone-react-53a7c.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-53a7c-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-react-53a7c",
    storageBucket: "instagram-clone-react-53a7c.appspot.com",
    messagingSenderId: "584010821995",
    appId: "1:584010821995:web:8ae4acb0c1963d81889c2e",
    measurementId: "G-Q4E9F73ZBD"
  });
  const db = firebaseapp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  export { db, auth, storage};
  