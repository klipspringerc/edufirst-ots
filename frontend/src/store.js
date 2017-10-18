import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_PENDING':
      return {...state, fetching: true};
    case 'FETCH_USERS_REJECTED':
      return {...state, fetching: false, error: action.payload};
    case 'FETCH_USERS_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload,
      };
    default:
      return state;
  }
};

const middleware = applyMiddleware(promise(), thunk, createLogger());
const store = createStore(reducer, middleware);
export default store;