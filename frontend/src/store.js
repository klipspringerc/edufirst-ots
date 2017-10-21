import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import reducers from './reducers';

const initialState = {
  // user: {
  //   username: 'zpiao1',
  //   id: '1'
  // }
  showSearchResults: false,
  machineGeneratedResult: null,
  similarQuestions: [],
  folded: true,
  topTrendingQuestions:[],
  loadingTopTrendingQuestions: false,
  showSearchBox: false
};
const middleware = [promise(), thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const reducer = (state, action) => reducers.reduce((state, f) => f(state, action), state);

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware),
);

export default store;