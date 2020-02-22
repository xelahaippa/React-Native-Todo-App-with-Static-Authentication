import { GET_NAME,
  UPDATE_TODO
 } from '../actions/types';

const INITIAL_STATE = {
  name: 'ToDo App',
  todoStored: []
};

  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_NAME:
        return { ...state, name: action.payload };
      case UPDATE_TODO:
        return { ...state, todoStored: action.payload };
      default:
        return state;
    }
  };
