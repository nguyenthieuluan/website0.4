import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

//tln001
const config = {
  apiKey: "AIzaSyA1VJ4NZAhXZcAd2uDiE4EH4U1gJb3PBJw",
  authDomain: "ntl001-186700.firebaseapp.com",
  databaseURL: "https://ntl001-186700.firebaseio.com",
  projectId: "ntl001-186700",
  storageBucket: "ntl001-186700.appspot.com",
  messagingSenderId: "1046784496397"
};

// myAwesomeApp
// var config = {
//   apiKey: "AIzaSyB87hMqpPNJVLD2gLeAMND9k_l6oCdBZE4",
//   authDomain: "myawesomeapp-8628a.firebaseapp.com",
//   databaseURL: "https://myawesomeapp-8628a.firebaseio.com",
//   projectId: "myawesomeapp-8628a",
//   storageBucket: "myawesomeapp-8628a.appspot.com",
//   messagingSenderId: "4058864788"
// };

firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots:true});

export default firebase;