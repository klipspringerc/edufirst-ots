import {applyMiddleware, combineReducers, createStore} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {createLogger} from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import comments from './reducers/comments';
import likes from './reducers/likes';
import {search, searchBox} from './reducers/search';
import toggleFold from './reducers/toggle-fold';
import topTrendingQuestions from './reducers/top-trending-questions';

const initialState = {
  // user: {
  //   username: 'zpiao1',
  //   id: '1'
  // },
  search: {
    showSearchResults: false,
    machineGeneratedResult: null,
    similarQuestions: [],
  },
  searchBox: {
    showSearchBox: false,
  },
  topTrendingQuestions: {
    loadingTopTrendingQuestions: false,
    topTrendingQuestions: [],
  },
  fold: {
    folded: true,
  },
  comments: {
    comments: [],
    loadingComments: false,
    postingComments: false,
  },
  likes: {
    postingLikes: false,
    likes: [],
  },
};
const middleware = [promise(), thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const reducer = combineReducers({
  search, searchBox, topTrendingQuestions, comments, likes,
  fold: toggleFold,
  form: formReducer,
});

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware),
);

export default store;