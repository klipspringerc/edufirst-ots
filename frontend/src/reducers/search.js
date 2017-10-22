import reduceReducers from 'reduce-reducers';
import {
  CLEAR_SERACH_RESULTS,
  HIDE_SEARCH_BOX,
  SEARCH_REQUEST,
  SEARCH_RESPONSE,
  SHOW_SEARCH_BOX,
} from '../actions/search';

export function searchReducer(state = {
  showSearchResults: false,
  machineAnswer: null,
  similarPosts: [],
  keywords: null,
}, action) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        showSearchResults: false,
        keywords: action.searchRequest.keywords,
      };
    case SEARCH_RESPONSE: {
      const {machineAnswer, posts} = action.searchResponse;
      return {
        ...state,
        showSearchResults: true,
        machineAnswer,
        similarPosts: posts,
        keywords: action.searchRequest.keywords,
      };
    }
    case CLEAR_SERACH_RESULTS:
      return {
        ...state,
        showSearchResults: false,
        machineAnswer: false,
        similarPosts: [],
        keywords: null,
      };
    default:
      return state;
  }
}

function showSearchBox(state = {
  showSearchBox: false,
}, action) {
  switch (action.type) {
    case SHOW_SEARCH_BOX:
      return {...state, showSearchBox: true};
    default:
      return state;
  }
}

function hideSearchBox(state = {
  showSearchBox: true,
}, action) {
  switch (action.type) {
    case HIDE_SEARCH_BOX:
      return {...state, showSearchBox: false};
    default:
      return state;
  }
}

export const searchBox = reduceReducers(showSearchBox, hideSearchBox);
