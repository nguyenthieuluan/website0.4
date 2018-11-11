//
// function makeid(x) {
//   var text = "";
//   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkl mnopqrstuvwxyz0123456789";
//
//   for (var i = 0; i < x; i++)
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   return text;
// }
// // auto generate
// export const createProject = (project) => {
//   return (dispatch, getState, { getFirebase, getFirestore }) => {
//     const firestore = getFirestore();
//     const profile = getState().firebaseReducer.profile;
//     const authorId = getState().firebaseReducer.auth.uid;
//     for (let index = 0; index < 200; index++) {
//       firestore.collection('projects').add({
//           //...project,
//           title: `${200 + index} ${makeid(10)}`,
//           content: makeid(1500),
//           authorFirstName: profile.firstName,
//           authorLastName: profile.lastName,
//           authorId: authorId,
//           createdAt: new Date()
//         }).catch((error)=>{
//           console.log(error)
//         });
//     }
//   }
// };

/// not delete

export const createProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebaseReducer.profile;
    const authorId = getState().firebaseReducer.auth.uid;
    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(()=>{
      dispatch({ type: 'ADD_PROJECT', project})
    }).catch((error)=>{
      dispatch({ type: 'ADD_PROJECT_ERROR', error})
    });
  }
};

export const createComment = (comment) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    console.log(comment);
    const firestore = getFirestore();
    const firebase = getFirebase();
    const profile = getState().firebaseReducer.profile;
    const authorId = getState().firebaseReducer.auth.uid;

    firestore.collection("projects").doc(comment.projectId).update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        content: comment.content,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
      })
    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }
};