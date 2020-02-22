 import { GET_NAME,
  UPDATE_TODO
 } from '../actions/types';


export function getName({ text }) {
  return {
    type: GET_NAME,
    payload: text
  };
}

export function updateTodoList({ todo }) {
  return {
    type: UPDATE_TODO,
    payload: todo
  };
}


