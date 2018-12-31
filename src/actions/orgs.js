import axios from 'axios';
import { fakeFetch } from '../fakeapi';
import { ADD_ERROR } from './errors';

import { apiConfig, url } from '../api';

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
          const config = apiConfig(auth);
          const org = result.data.orgs[0];
          config.params.org = org;

          axios.get(url('org'), config)
            .then(result => {
              console.log(result);
              const { members, traits, crossMatchTraitId } = result.data;
              dispatch({
                type: SELECT_ORG,
                org,
                members,
                traits,
                crossMatchTraitId,
              });
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
      .then(result => dispatch({
        type: CREATE_ORG,
        org,
      }))
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
    const config = apiConfig(auth);
    config.params.org = org;

    return axios.get(url('org'), config)
      .then(result => {
        const { members, traits, crossMatchTrait } = result.data;
        dispatch({
          type: SELECT_ORG,
          org,
          members,
          traits,
          crossMatchTrait,
        });
      });
  }
}
