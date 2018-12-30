import { combineReducers } from 'redux';
import members from './members';
import orgs from './orgs';

const rootReducer = combineReducers({
  members,
  orgs,
});

export default rootReducer;