import { fetchOrgs } from './orgs';
import { fetchMembers } from './members';
import { fetchRounds } from './pairing';
import { ADD_ERROR } from './errors';

/*
 * action creators
 */

export function fetchDashboardData(auth) {
  return (dispatch, getState) => {
    return dispatch(fetchOrgs(auth))
      .then(() => {
        console.log('Done fetching orgs');
        const org = getState().orgs.orgs[getState().orgs.selectedOrgId];
        return dispatch(fetchMembers(auth, org));
      })
      .then(() => {
        const org = getState().orgs.orgs[getState().orgs.selectedOrgId];
        return dispatch(fetchRounds(auth, org));
      })
      .catch(err => dispatch({
        type: ADD_ERROR,
        error: err,
      }))
  }
}