import { SET_MEMBERS, SET_CROSS_MATCH_TRAIT } from "../actions/members";
import { SELECT_ORG } from "../actions/orgs";

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
    case SELECT_ORG:
      const crossMatchTraitId = action.crossMatchTraitId;
      return {
        ...state,
        members: action.members,
        traits: action.traits,
        crossMatchTraitId: crossMatchTraitId ? crossMatchTraitId : null,
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