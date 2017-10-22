import {API_URL} from '../constants';
import {fetchPost} from './posts';
import {mapObjectToFormData} from '../util';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';

function searchRequestAction(searchRequest) {
  return {
    type: SEARCH_REQUEST,
    searchRequest,
  };
}

export const SEARCH_RESPONSE = 'SEARCH_RESPONSE';

function searchResponseAction(searchRequest, searchResponse) {
  return {
    type: SEARCH_RESPONSE,
    searchRequest,
    searchResponse,
  };
}

export function search(searchRequest) {
  return dispatch => {
    dispatch(searchRequestAction(searchRequest));
    fetch(`${API_URL}/posts/search/`, {
      method: 'POST',
      body: mapObjectToFormData(searchRequest),
    })
        .then(response => response.json())
        .then(searchResponse => {
          dispatch(searchResponseAction(searchRequest, searchResponse));
          // Query all posts in this search immediately to update store.
          searchResponse.forEach(post => dispatch(fetchPost(post.id)));
        });
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
    fetch(`${API_URL}/posts/suggestions/`, {
      body: keywords,
    })
        .then(response => response.json())
        .then(suggestionsResponse =>
            dispatch(receiveSuggestionsAction(keywords, suggestionsResponse)));
  };
}

export const CLEAR_SERACH_RESULTS = 'CLEAR_SEARCH_RESULTS';

export function clearSearchResults() {
  return {
    type: CLEAR_SERACH_RESULTS,
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