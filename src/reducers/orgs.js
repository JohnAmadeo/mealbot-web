import { CREATE_ORG, SET_ORGS, SELECT_ORG } from "../actions/orgs";

const initialState = {
  orgs: [],
  selectedOrgId: null,
};

export default function orgs(state = initialState, action) {
  switch (action.type) {
    case CREATE_ORG:
      return {
        ...state,
        orgs: [action.org, ...state.orgs],
        selectedOrgId: 0,
      };
    case SET_ORGS:
      return {
        ...state,
        orgs: action.orgs,
        selectedOrgId: action.orgs.length > 0 ? 0 : null,
      };
    case SELECT_ORG:
      return {
        ...state,
        selectedOrgId: state.orgs.indexOf(action.org),
      };
    default:
      return state;
  }
}