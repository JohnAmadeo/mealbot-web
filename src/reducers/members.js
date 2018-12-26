import { SET_MEMBERS, SET_TRAITS, SET_CROSS_MATCH_TRAIT } from "../actions/members";

  switch(action.type) {
    case SET_MEMBERS:
      return action.members;
    case SET_CROSS_MATCH_TRAIT:
      return {
        ...state,
        crossMatchTraitId: action.crossMatchTraitId,
      };
    default:
      return state;
  }
}