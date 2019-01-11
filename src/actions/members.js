import { url, apiConfig } from '../api';
import { ADD_ERROR } from './errors';
import axios from 'axios';

/*
 * action types
 */

export const SET_MEMBERS = 'SET_MEMBERS';
export const SET_TRAITS = 'SET_TRAITS';
export const SET_CROSS_MATCH_TRAIT = 'SET_CROSS_MATCH_TRAIT';

/*
 * action creators
 */

export function fetchMembers(auth, org) {
  return dispatch => {
    const config = apiConfig(auth);
    config.params.org = org;

    return axios.get(url('members'), config)
      .then(result => {
        const { members, traits, crossMatchTrait } = result.data;
        dispatch({
          type: SET_MEMBERS,
          members,
          traits,
          crossMatchTraitId: traits.indexOf(crossMatchTrait),
        });
      });
  };
}
export function uploadMembers(auth, org, csv) {
  return dispatch => {
    let config = apiConfig(auth);
    config.params.org = org;
    // config.headers['Content-Type'] = 'multipart/form-data';

    let formData = new FormData();
    formData.append('members', csv);

    // TODO: how do you attach a form on a POST request
    // Do we need to set the Content-Type to form/multipart
    return axios.post(url('members'), formData, config)
      .then(result => {
        console.log(result);
        dispatch({ 
          type: SET_MEMBERS, 
          members: result.data.members, 
          traits: result.data.traits,
          crossMatchTraitId: null, 
        });
      })
      .catch(err => dispatch({
        type: ADD_ERROR,
        // TODO: use error message from server to make message more descriptive
        error: 'Could not upload CSV of members',
      }));
  };
}

export function setCrossMatchTrait(auth, org, trait) {
  return dispatch => {
    let config = apiConfig(auth);
    config.params.org = org;

    return axios.post(url('crossmatchtrait'), { trait }, config)
      .then(result => dispatch({
        type: SET_CROSS_MATCH_TRAIT,
        crossMatchTrait: trait,
      }))
      .catch(err => dispatch({
        type: ADD_ERROR,
        error: 'Could not change the cross-match trait',
      }));
  }
}