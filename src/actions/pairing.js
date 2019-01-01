import axios from 'axios';
import moment from 'moment';

import { ADD_ERROR } from './errors';
import { url, apiConfig, faxios } from '../api';

var l = console.log;

const fpairs = [
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
      name: 'John',
      email: 'jadk157@gmail.com',
    },
    member2: {
      name: 'Amanda',
      email: 'amanda@gmail.com',
    },
  },
];

const frounds = [
    moment().add(-5, 'days'),
    moment().add(5, 'days'),
    moment().add(10, 'days'),
    moment().add(15, 'days'),
    // moment().add(20, 'days'),
    // moment().add(25, 'days'),
];

/*
 * action types
 */

export const ADD_ROUND = 'ADD_ROUND';
export const CHANGE_ROUND_DATE = 'CHANGE_ROUND_DATE';
export const REMOVE_ROUND = 'REMOVE_ROUND';
export const SET_PAIRS = 'SET_PAIRS';
export const SET_ROUNDS = 'SET_ROUNDS';
export const SET_ROUND_FOCUS = 'SET_ROUND_FOCUS';

export function addRound(auth, org, round) {
  return dispatch => {
    let config = apiConfig(auth);
    config.params = {
      ...config.params,
      org,
      round,
    };
    // return axios.post(url('round'), {}, config)
    return faxios.post()
      .then(result => l(dispatch({
        type: ADD_ROUND,
        round,
      })))
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
    // return axios.post(url('round'), {}, config)
    return faxios.post()
      .then(result => l(dispatch({
        type: CHANGE_ROUND_DATE,
        roundId,
        round,
      })))
      .catch(err => dispatch({
        type: ADD_ERROR,
        error: `Failed to change the date of round ${roundId} to ${round}`,
      }))
  };
}

export function fetchPairs(auth, org, roundId) {
  return dispatch => {
    let config = apiConfig(auth);
    config.params = {
      ...config.params,
      org,
      roundId,
    };

    // return axios.get(url('pairs'), config)
    return faxios.get({ data: { pairs: fpairs } })
      .then(result => l(dispatch({
        type: SET_PAIRS,
        pairs: result.data.pairs,
      })))
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

    // return axios.get(url('rounds'), config)
    return faxios.get({ data: { rounds: frounds }})
      .then(result => l(dispatch({
        type: SET_ROUNDS,
        rounds: result.data.rounds, 
      })))
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
    // return axios.delete(url('round'), {}, config)
    return faxios.delete()
      .then(result => l(dispatch({
        type: REMOVE_ROUND,
        roundId,
      })))
      .catch(err => dispatch({
        type: ADD_ERROR,
        error: `Failed to add remove the round ${roundId}`,
      }))
  };
}

export function setRoundFocus(isFocused, roundId) {
  return { type: SET_ROUND_FOCUS, roundId, isFocused };
}