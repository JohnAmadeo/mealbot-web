import { SET_MEMBERS } from "../actions";

export default function members(state = [], action) {
  switch(action.type) {
    case SET_MEMBERS:
      return action.members;
    default:
      return state;
  }
}