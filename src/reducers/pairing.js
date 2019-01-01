import { SET_PAIRS, SET_ROUNDS, ADD_ROUND, REMOVE_ROUND, CHANGE_ROUND_DATE, SET_ROUND_FOCUS } from "../actions/pairing";
import { fn } from '../utils';

const initialState = {
  pairs: [],
  rounds: [],
  isRoundFocused: [],
};

export default function orgs(state = initialState, action) {
  switch (action.type) {
    case ADD_ROUND:
      return {
        ...state,
        rounds: fn.push(state.rounds, action.round),
        isRoundFocused: fn.push(state.isRoundFocused, false),
      };
    case CHANGE_ROUND_DATE:
      return {
        ...state,
        rounds: fn.replace(state.rounds, action.round, action.roundId),
      };
    case REMOVE_ROUND:
      return {
        ...state,
        rounds: fn.remove(state.rounds, action.roundId),
        isRoundFocused: fn.remove(state.isRoundFocused, action.roundId),
      };
    case SET_PAIRS:
      return {
        ...state,
        pairs: action.pairs,
      };
    case SET_ROUNDS:
      return {
        ...state,
        rounds: action.rounds,
        isRoundFocused: action.rounds.map(_ => false),
      }
    case SET_ROUND_FOCUS:
      return {
        ...state,
        isRoundFocused: fn.replace(
          state.isRoundFocused,
          action.isFocused,
          action.roundId,
        ),
      }
    default:
      return state;
  }
}