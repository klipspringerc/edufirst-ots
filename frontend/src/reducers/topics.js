import {RECEIVE_TOPICS, REQUEST_TOPICS} from '../actions/topics';

export default function topicsReducer(state = {
  topics: [],
  loadingTopics: false,
}, action) {
  switch (action.type) {
    case REQUEST_TOPICS:
      return {...state, loadingTopics: true};
    case RECEIVE_TOPICS:
      return {...state, loadingTopics: false, topics: action.topics};
    default:
      return state;
  }
}