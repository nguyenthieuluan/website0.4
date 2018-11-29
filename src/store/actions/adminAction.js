
export const uploadFile = (file) => {
    console.log('action: '+ file.name);
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      firestore.collection('musics').add({
        fileName: file.name,
        url: file.url,
        updateAt: new Date()
      }).then(()=>{
        dispatch({ type: 'UPLOAD_FILE', file})
      }).catch((error)=>{
        dispatch({ type: 'UPLOAD_FILE_ERROR', error})
      });
    }
  };
