import {applyMiddleware, combineReducers, createStore} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {createLogger} from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import postsReducer from './reducers/posts';
import {searchBox, searchQueryReducer} from './reducers/search';
import toggleFold from './reducers/toggle-fold';
import topTrendingQuestions from './reducers/top-trending-questions';
import topicsReducer from './reducers/topics';
import userReducer from './reducers/users';

const initialState = {
  user: {
    username: null,
    authentication: null,
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
  posts: {
    postingAnswer: false,
    postingComment: false,
    puttingLike: false,
    loadingPost: false,
    postingPost: false,
    loadingPostsByTopic: false,
    loadingPostsByUser: false,
    showSearchResults: false,
    posts: [],
    machineAnswer: null,
    similarPosts: [],
    keywords: null,
    topics: [],
    userPosts: [],
  },
  topics: {
    topics: [],
    loadingTopics: false,
  },
  searchQuery: {
    searchQuery: '',
  },
};
const middleware = [promise(), thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const reducer = combineReducers({
  searchBox, topTrendingQuestions,
  user: userReducer,
  posts: postsReducer,
  fold: toggleFold,
  form: formReducer,
  topics: topicsReducer,
  searchQuery: searchQueryReducer,
});

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware),
);

export default store;