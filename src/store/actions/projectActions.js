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