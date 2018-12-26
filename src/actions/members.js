import { fetchMembers } from '../fakeapi';
import { ADD_ERROR } from './errors';

/*
 * action types
 */

export const SET_MEMBERS = 'SET_MEMBERS';
export const SET_TRAITS = 'SET_TRAITS';
export const SET_CROSS_MATCH_TRAIT = 'SET_CROSS_MATCH_TRAIT';

/*
 * action creators
 */

export function uploadMembers(csv) {
  return dispatch => {
    return fetchMembers(csv)
      // TODO: add '.then(resp => resp.json())'
      .then(result => dispatch({ 
          type: SET_MEMBERS, 
          members: result.members, 
          traits: result.traits, 
      }))
      .catch(err => dispatch({
        type: ADD_ERROR,
        // TODO: use error message from server to make message more descriptive
        error: 'Could not upload CSV of members',
      }));
  };
}

export function setCrossMatchTrait(traitId) {
  return { type: SET_CROSS_MATCH_TRAIT, crossMatchTraitId: traitId };
}