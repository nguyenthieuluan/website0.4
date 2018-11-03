import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyA1VJ4NZAhXZcAd2uDiE4EH4U1gJb3PBJw",
  authDomain: "ntl001-186700.firebaseapp.com",
  databaseURL: "https://ntl001-186700.firebaseio.com",
  projectId: "ntl001-186700",
  storageBucket: "ntl001-186700.appspot.com",
  messagingSenderId: "1046784496397"
};
firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots:true});

export default firebase;