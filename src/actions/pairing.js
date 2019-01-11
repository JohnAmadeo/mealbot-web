import axios from 'axios';
import moment from 'moment';

import { ADD_ERROR } from './errors';
import { url, apiConfig, faxios } from '../api';

const fpairs = [
  [
    {
      member1: {
        name: 'John',
        email: 'jadk157@gmail.com',
      },
      member2: {
        name: 'Amanda',
        email: 'amanda@gmail.com',
      },
    },
    {
      member1: {
        name: 'Darren',
        email: 'darren172@gmail.com',
      },
      member2: {
        name: 'Kailey',
        email: 'kailey091@gmail.com',
      },
    },
  ],
  [
    {
      member1: {
        name: 'John',
        email: 'jadk157@gmail.com',
      },
      member2: {
        name: 'Kailey',
        email: 'kailey091@gmail.com',
      },
    },
    {
      member1: {
        name: 'Darren',
        email: 'darren172@gmail.com',
      },
      member2: {
        name: 'Amanda',
        email: 'amanda@gmail.com',
      },

    },
  ] 
];

function toUTCDateString(date) {
  const d = date.clone();
  d.utc();
  return d.format();
}

/*
 * action types
 */

export const ADD_ROUND = 'ADD_ROUND';
export const CHANGE_ROUND_DATE = 'CHANGE_ROUND_DATE';
export const REMOVE_ROUND = 'REMOVE_ROUND';
export const SET_PAIRS = 'SET_PAIRS';
export const SET_ROUNDS = 'SET_ROUNDS';
export const SET_ROUND_FOCUS = 'SET_ROUND_FOCUS';
export const SET_SELECTED_ROUND_PAIRS_ID = 'SET_SELECTED_ROUND_PAIRS_ID';

export function addRound(auth, org, round) {
  return dispatch => {
    let config = apiConfig(auth);
    config.params = {
      ...config.params,
      org,
      round: toUTCDateString(round),
    };
    return axios.post(url('round'), {}, config)
    // return faxios.post()
      .then(result => dispatch({
        type: ADD_ROUND,
        round,
      }))
      .catch(err => dispatch({
        type: ADD_ERROR,
        error: 'Failed to add a new round',
      }))
  };
}

export function changeRoundDate(auth, org, roundId, round) {
  return dispatch => {
    let config = apiConfig(auth);
    config.params = {
      org,
      roundId,
      round,
    };
    return axios.post(url('round'), {}, config)
    // return faxios.post()
      .then(result => dispatch({
        type: CHANGE_ROUND_DATE,
        roundId,
        round,
      }))
      .catch(err => dispatch({
        type: ADD_ERROR,
        error: `Failed to change the date of round ${roundId} to ${round}`,
      }))
  };
}

export function fetchPairs(auth, org) {
  return dispatch => {
    let config = apiConfig(auth);
    config.params = {
      ...config.params,
      org,
    };

    return axios.get(url('pairs'), config)
      .then(result => {
        const roundPairs = result.data.roundPairs;
        dispatch({
          type: SET_PAIRS,
          roundPairs,
          selectedRoundPairsId:
            roundPairs.length > 0 ? roundPairs.length - 1 : null,
        });
      })
      .catch(err => dispatch({
        type: ADD_ERROR,
        error: 'Failed to fetch pairs from the most recent round',
      }))
  };
}

export function fetchRounds(auth, org) {
  return dispatch => {
    let config = apiConfig(auth);
    config.params = {
      ...config.params,
      org,
    };

    return axios.get(url('rounds'), config)
      .then(result => dispatch({
        type: SET_ROUNDS,
        rounds: result.data.rounds.map(round => moment(round)), 
      }))
      .catch(err => dispatch({
        type: ADD_ERROR,
        error: 'Failed to fetch rounds',
      }))
  };
} 

export function removeRound(auth, org, roundId) {
  return dispatch => {
    let config = apiConfig(auth);
    config.params = {
      org,
      roundId,
    };

    return axios.delete(url('round'), config)
    // return faxios.delete()
      .then(result => dispatch({
        type: REMOVE_ROUND,
        roundId,
      }))
      .catch(err => dispatch({
        type: ADD_ERROR,
        error: `Failed to add remove the round ${roundId}`,
      }))
  };
}

export function setRoundFocus(isFocused, roundId) {
  return { type: SET_ROUND_FOCUS, roundId, isFocused };
}

export function setSelectedRoundPairsId(roundPairsId) {
  return { type: SET_SELECTED_ROUND_PAIRS_ID, roundPairsId };
}