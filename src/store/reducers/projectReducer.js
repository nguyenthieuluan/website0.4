const initialState = {
  projects: [
    {id: '1', title: 'help me find peach', content: 'blah blah blah'},
    {id: '2', title: 'collect all the starts', content: 'blah blah blah'},
    {id: '3', title: 'egg hunt with me', content: 'blah blah blah'}
  ]
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return state;
    case 'ADD_PROJECT_ERROR':
      console.log('create project error ', action.error);
      return state;
    default: return state;
  }
};

export default projectReducer;