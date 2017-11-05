import {API_URL} from '../constants';

export const REQUEST_TOPICS = 'REQUEST_TOPICS';

export function requestTopicsAction() {
  return {
    type: REQUEST_TOPICS,
  };
}

export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';

export function receiveTopicsAction(topics) {
  return {
    type: RECEIVE_TOPICS,
    topics,
  };
}

export function fetchTopics() {
  return dispatch => {
    dispatch(requestTopicsAction());
    return fetch(`${API_URL}/topics/`)
        .then(response => response.json())
        .then(topics => dispatch(receiveTopicsAction(topics)));
  };
}