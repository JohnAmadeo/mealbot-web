import { fetchOrgs } from './orgs';
import { fetchMembers } from './members';
import { fetchRounds, fetchPairs } from './pairing';
import { ADD_ERROR } from './errors';

/*
 * action creators
 */

export function fetchDashboardData(auth) {
  return (dispatch, getState) => {
    return dispatch(fetchOrgs(auth))
      .then(() => {
        const { orgs, selectedOrgId } = getState().orgs;
        if (orgs.length > 0) {
          const org = orgs[selectedOrgId];
          return Promise.all([
            dispatch(fetchMembers(auth, org)),
            dispatch(fetchRounds(auth, org)),
            dispatch(fetchPairs(auth, org)),
          ]);
        }
      })
      .catch(err => dispatch({
        type: ADD_ERROR,
        error: `Failed to fetch dashboard data`,
      }))
  }
}

// export function fetchDashboardData(auth) {
//   return (dispatch, getState) => {
//     return dispatch(fetchOrgs(auth))
//       .then(() => {
//         console.log('Done fetching orgs');
//         const org = getState().orgs.orgs[getState().orgs.selectedOrgId];
//         return dispatch(fetchMembers(auth, org));
//       })
//       .then(() => {
//         const org = getState().orgs.orgs[getState().orgs.selectedOrgId];
//         return dispatch(fetchRounds(auth, org));
//       })
//       .then(() => {
//         const org = getState().orgs.orgs[getState().orgs.selectedOrgId];
//         return dispatch(fetchPairs(auth, org));
//       })
//       .catch(err => dispatch({
//         type: ADD_ERROR,
//         error: err,
//       }))
//   }
// }