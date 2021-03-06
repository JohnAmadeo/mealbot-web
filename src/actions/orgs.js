import axios from 'axios';
import { ADD_ERROR } from './errors';

import { apiConfig, url } from '../api';
import { fetchRounds, fetchPairs, RESET_PAIRING } from './pairing';
import { fetchMembers, RESET_MEMBERS } from './members';

/*
 * action types
 */

export const CREATE_ORG = 'CREATE_ORG';
export const SET_ORGS = 'SET_ORGS';
export const SELECT_ORG = 'SELECT_ORG';

/*
 * action creators
 */

export function fetchOrgs(auth) {
  return dispatch => {
    return axios.get(url('orgs'), apiConfig(auth))
      .then(result => {
        dispatch({
          type: SET_ORGS,
          orgs: result.data.orgs,
        });

        if (result.data.orgs.length > 0) {
          const org = result.data.orgs[0];
          dispatch({
            type: SELECT_ORG,
            org,
          });
        }
        return null;
      })
      .catch(err => dispatch({
        type: ADD_ERROR,
        error: 'Failed to fetch list of orgs',
      }));
  }
}

export function createOrg(auth, org) {
  return dispatch => {
    return axios.post(url('org'), { org }, apiConfig(auth))
      .then(result => Promise.all([
        dispatch({ type: CREATE_ORG, org }),
        dispatch({ type: RESET_MEMBERS }),
        dispatch({ type: RESET_PAIRING }),
      ]))
      .catch(err => {
        dispatch({
          type: ADD_ERROR,
          // Use server message to create more expressive error
          error: 'Failed to create org', 
        });
      })
  }
}

export function selectOrg(auth, org) {
  return dispatch => {
    return Promise.all([
      dispatch(fetchMembers(auth, org)),
      dispatch(fetchRounds(auth, org)),
      dispatch(fetchPairs(auth, org)),
      dispatch({
        type: SELECT_ORG,
        org,
      })
    ])
    .catch(_ => dispatch({
      type: ADD_ERROR,
      error: `Failed to fetch data for the organization ${org}`,
    }));
  }
}
