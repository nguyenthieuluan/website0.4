const initialState = {
    file: ''
  };
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPLOAD_FILE':
        return state;
      case 'UPLOAD_FILE_ERROR':
        console.log('upload file error ', action.error);
        return state;
      default: return state;
    }
  };
  
  export default adminReducer;