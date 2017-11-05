import {API_URL} from '../constants';
import {mapObjectToFormData} from '../util';
import {fetchPost} from './posts';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';

export function searchRequestAction(searchRequest) {
  return {
    type: SEARCH_REQUEST,
    searchRequest,
  };
}

export const SEARCH_RESPONSE_SIMILAR_POSTS = 'SEARCH_RESPONSE_SIMILAR_POSTS';

export function searchResponseSimilarPostsAction(searchRequest, similarPosts) {
  return {
    type: SEARCH_RESPONSE_SIMILAR_POSTS,
    searchRequest,
    similarPosts,
  };
}

export const SEARCH_RESPONSE_MACHINE_ANSWER = 'SEARCH_RESPONSE_MACHINE_ANSWER';

export function searchResponseMachineAnswerAction(searchRequest, machineAnswer) {
  return {
    type: SEARCH_RESPONSE_MACHINE_ANSWER,
    searchRequest,
    machineAnswer,
  };
}

export function search(searchRequest) {
  return dispatch => {
    dispatch(searchRequestAction(searchRequest));

    const searchPosts = fetch(`${API_URL}/posts/search/`, {
      method: 'POST',
      body: mapObjectToFormData(searchRequest),
    })
        .then(response => response.json())
        .then(similarPosts => {
          dispatch(
              searchResponseSimilarPostsAction(searchRequest, similarPosts));
          similarPosts.forEach(post => dispatch(fetchPost(post.id)));
        });

    const searchWolf = fetch(`${API_URL}/wolf/search/`, {
      method: 'POST',
      body: mapObjectToFormData(searchRequest),
    })
        .then(response => response.json())
        .then(machineAnswer => dispatch(
            searchResponseMachineAnswerAction(searchRequest, machineAnswer)));
    return Promise.all([searchPosts, searchWolf]);
  };
}

export const REQUEST_SUGGESTIONS = 'REQUEST_SUGGESTIONS';

function requestSuggestionsAction(keywords) {
  return {
    type: REQUEST_SUGGESTIONS,
    keywords,
  };
}

export const RECEIVE_SUGGESTIONS = 'RECEIVE_SUGGESTIONS';

function receiveSuggestionsAction(keywords, suggestionsResponse) {
  return {
    type: RECEIVE_SUGGESTIONS,
    keywords,
    suggestionsResponse,
  };
}

export function fetchSuggestions(keywords) {
  return dispatch => {
    dispatch(requestSuggestionsAction(keywords));
    return fetch(`${API_URL}/posts/suggestions/`, {
      body: keywords,
    })
        .then(response => response.json())
        .then(suggestionsResponse =>
            dispatch(receiveSuggestionsAction(keywords, suggestionsResponse)));
  };
}

export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';

export function clearSearchResults() {
  return {
    type: CLEAR_SEARCH_RESULTS,
  };
}

export const SHOW_SEARCH_BOX = 'SHOW_SEARCH_BOX';

export function showSearchBox() {
  return {
    type: SHOW_SEARCH_BOX,
  };
}

export const HIDE_SEARCH_BOX = 'HIDE_SEARCH_BOX';

export function hideSearchBox() {
  return {
    type: HIDE_SEARCH_BOX,
  };
}

export const SAVE_QUERY = 'SAVE_QUERY';

export function saveQuery(query) {
  return {
    type: SAVE_QUERY,
    query,
  };
}