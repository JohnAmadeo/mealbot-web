/*
 * action types
 */

export const ADD_ERROR = 'ADD_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

// TODO: Incomplete; remove error granularly instead of removing all errors
export function removeError() {
  return { type: REMOVE_ERROR };
}
