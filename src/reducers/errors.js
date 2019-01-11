import { ADD_ERROR, REMOVE_ERROR } from "../actions/errors";
import { fn } from '../utils';

export default function errors(state = [], action) {
  switch (action.type) {
    case ADD_ERROR:
      return [...state, action.error];
    // TODO: Incomplete; remove error granularly instead of removing all errors
    case REMOVE_ERROR:
      return [];
    default:
      return state;
  }
}