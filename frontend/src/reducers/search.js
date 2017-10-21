import reduceReducers from 'reduce-reducers';
import {
  HIDE_SEARCH_BOX,
  SEARCH_REQUEST,
  SEARCH_RESPONSE,
  SHOW_SEARCH_BOX,
} from '../actions/search';

export function search(state = {
  showSearchResults: false,
  machineGeneratedResult: null,
  similarQuestions: [],
}, action) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return state;
    case SEARCH_RESPONSE:
      return {
        ...state,
        showSearchResults: true,
        machineGeneratedResult: action.machineGeneratedResult,
        similarQuestions: action.similarQuestions,
      };
    default:
      return state;
  }
};

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
