import { combineReducers } from 'redux';
import members from './members';
import orgs from './orgs';
import pairing from './pairing';

const rootReducer = combineReducers({
  members,
  orgs,
  pairing,
});

export default rootReducer;