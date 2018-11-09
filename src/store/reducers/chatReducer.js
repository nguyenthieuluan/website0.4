const initialState = {
    chats: []
  };
  
  const chatReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_CHAT':
        return state;
      case 'ADD_CHAT_ERROR':
        console.log('create project error ', action.error);
        return state;
      default: return state;
    }
  };
  
  export default chatReducer;