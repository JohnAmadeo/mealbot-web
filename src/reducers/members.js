import { SET_MEMBERS, SET_CROSS_MATCH_TRAIT } from "../actions/members";

const initialState = {
  members: [],
  traits: [],
  crossMatchTraitId: null,
};

export default function members(state = initialState, action) {
  switch(action.type) {
    case SET_MEMBERS:
      return {
        ...state,
        members: action.members,
        traits: action.traits,
        crossMatchTraitId: action.traits.length > 0 ? 0 : null,
      };
    case SET_CROSS_MATCH_TRAIT:
      return {
        ...state,
        crossMatchTraitId: action.crossMatchTraitId,
      };
    default:
      return state;
  }
}