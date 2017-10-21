import {fetchPost} from './posts';

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
    searchResponse,
  };
}

export function search(searchRequest) {
  return dispatch => {
    dispatch(searchRequest(searchRequest));
    fetch('http://api.edufirstonline.com/api/v1/posts/search', {
      body: JSON.stringify(searchRequest),
    })
        .then(response => response.json())
        .then(searchResponse => {
          dispatch(searchResponseAction(searchRequest, searchResponse));
          // Query all posts in this search immeidately to update store.
          searchResponse.posts.forEach(post => dispatch(fetchPost(post.id)));
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
    fetch('http://api.edufirstonline.com/api/v1/posts/suggestions', {
      body: keywords,
    })
        .then(response => response.json())
        .then(suggestionsResponse =>
            dispatch(receiveSuggestionsAction(keywords, suggestionsResponse)));
  };
}