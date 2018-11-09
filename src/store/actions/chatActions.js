// auto generate
export const createChat = (chat) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    chat.createAt = new Date();
    const firestore = getFirestore();
    const authorId = getState().firebaseReducer.auth.uid;
    firestore.collection('chats').add({
      //...project,
      count: 0,
      message: [chat],
      uid: authorId,
      createdAt: new Date()
    }).catch((error) => {
      console.log(error)
    }).then(() => {
      console.log('success')
    });
  }
};

export const createMessage = (message) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const authorId = getState().firebaseReducer.auth.uid;

    firestore.collection("chats").doc("yoJz7QUYaqv0CyfdLXX6").update({
      message: firebase.firestore.FieldValue.arrayUnion({
        content: message.content,
        createAt: new Date(),
        uid: message.uid
      })
    })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }
};



// export const createChat = (chat) => {
//   return (dispatch, getState, {getFirebase, getFirestore}) => {
//     const firestore = getFirestore();
//     //const profile = getState().firebaseReducer.profile;
//     const authorId = getState().firebaseReducer.auth.uid;
//     console.log(authorId);
//     firestore.collection('chats').add({
//       //...chat,
//       count: 0,
//       messages: [chat],
//       uid: authorId,
//       createdAt: new Date()
//     }).then(() => {
//       dispatch({type: 'ADD_CHAT', chat})
//     }).catch((error) => {
//       dispatch({type: 'ADD_CHAT_ERROR', error})
//     });
//   }
// };