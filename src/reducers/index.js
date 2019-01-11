import { combineReducers } from 'redux';
import members from './members';
import orgs from './orgs';
import pairing from './pairing';
import errors from './errors';

const rootReducer = combineReducers({
  members,
  orgs,
  pairing,
  errors,
});

export default rootReducer;