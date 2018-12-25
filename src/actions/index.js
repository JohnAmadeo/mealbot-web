/*
 * action types
 */

export const SET_MEMBERS = 'SET_MEMBERS';

/*
 * other constants
 */

// Make an enum for cross_match_trait??

/*
 * action creators
 */

export function setMembers(members) {
  return { type: SET_MEMBERS, members };
}