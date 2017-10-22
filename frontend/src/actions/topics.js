import {API_URL} from '../constants';

export const REQUEST_TOPICS = 'REQUEST_TOPICS';

function requestTopicsAction() {
  return {
    type: REQUEST_TOPICS,
  };
}

export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';

function receiveTopicsAction(topics) {
  return {
    type: RECEIVE_TOPICS,
    topics,
  };
}

export function fetchTopics() {
  return dispatch => {
    dispatch(requestTopicsAction());
    fetch(`${API_URL}/topics/`)
        .then(response => response.json())
        .then(topics => dispatch(receiveTopicsAction(topics)));
  };
}