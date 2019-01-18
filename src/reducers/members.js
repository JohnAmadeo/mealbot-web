import { SET_MEMBERS, SET_CROSS_MATCH_TRAIT, RESET_MEMBERS } from "../actions/members";
import { CREATE_ORG } from "../actions/orgs";

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
        members: action.members.sort((a, b) => a.name < b.name),
        traits: action.traits,
        crossMatchTraitId: action.crossMatchTraitId,
      };
    case SET_CROSS_MATCH_TRAIT:
      return {
        ...state,
        crossMatchTraitId: state.traits.indexOf(action.crossMatchTrait),
      };
    case RESET_MEMBERS:
      return initialState;
    default:
      return state;
  }
}