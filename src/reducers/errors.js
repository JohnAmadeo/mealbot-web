import { ADD_ERROR } from "../actions/errors";

export default function errors(state = [], action) {
  switch (action.type) {
    case ADD_ERROR:
      return [...state, action.error];
    default:
      return state;
  }
}