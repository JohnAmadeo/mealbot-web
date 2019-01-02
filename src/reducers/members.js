import { SET_MEMBERS, SET_CROSS_MATCH_TRAIT } from "../actions/members";
import { CREATE_ORG, SELECT_ORG } from "../actions/orgs";

const initialState = {
  members: [],
  traits: [],
  crossMatchTraitId: null,
};

export default function members(state = initialState, action) {
  switch(action.type) {
    case CREATE_ORG:
      return {
        ...state,
        members: [],
        traits: [],
        crossMatchTraitId: null,
      };
    case SET_MEMBERS:
      return {
        ...state,
        members: action.members,
        traits: action.traits,
        crossMatchTraitId: action.crossMatchTraitId,
      };
    case SELECT_ORG:
      return {
        ...state,
        members: action.members,
        traits: action.traits,
        crossMatchTraitId: action.traits.indexOf(action.crossMatchTrait),
      };
    case SET_CROSS_MATCH_TRAIT:
      return {
        ...state,
        crossMatchTraitId: state.traits.indexOf(action.crossMatchTrait),
      };
    default:
      return state;
  }
}