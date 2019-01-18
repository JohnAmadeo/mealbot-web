import { 
  ADD_ROUND, 
  CHANGE_ROUND_DATE, 
  REMOVE_ROUND, 
  SET_PAIRS, 
  SET_ROUNDS, 
  SET_ROUND_FOCUS,
  SET_SELECTED_ROUND_PAIRS_ID,
  RESET_PAIRING,
} from "../actions/pairing";
import { fn } from '../utils';

const initialState = {
  roundPairs: [],
  selectedRoundPairsId: null,
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
        roundPairs: action.roundPairs.map(pairs => 
          pairs.sort((a, b) => a.member1.name < b.member1.name)),
        selectedRoundPairsId: action.selectedRoundPairsId,
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
    case SET_SELECTED_ROUND_PAIRS_ID:
      return {
        ...state,
        selectedRoundPairsId: action.roundPairsId,
      }
    case RESET_PAIRING:
      return initialState;
    default:
      return state;
  }
}