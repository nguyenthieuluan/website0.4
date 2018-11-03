const initialState = {
  authError: null
};

const authReducer = ( state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'login error'
      };
    case 'SIGNOUT_SUCCESS':
      return state;
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        authError: null
      };
    case 'SIGNIN_ERROR':
      return {
        ...state,
        authError: action.error.message
      };
    default:
      return state
  }
};

export default authReducer;