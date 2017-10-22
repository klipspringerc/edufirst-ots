import reduceReducers from 'reduce-reducers';
import {
  POST_POST_REQUEST,
  POST_POST_RESPONSE,
  RECEIVE_POST,
  RECEIVE_POSTS_BY_TOPIC,
  REQUEST_POST,
  REQUEST_POSTS_BY_TOPIC,
} from '../actions/posts';
import {RECEIVE_POSTS_BY_USER, REQUEST_POSTS_BY_USER} from '../actions/users';
import postAnswerReducer from './answer';
import postCommentReducer from './comments';
import putLikeReducer from './likes';
import {searchReducer} from './search';

function requestPostReducer(state = {
  loadingPost: false,
  posts: [],
}, action) {
  switch (action.type) {
    case REQUEST_POST:
      return {...state, loadingPost: true};
    case RECEIVE_POST: {
      const {post} = action;
      let posts;
      if (state.posts.some(p => p.id === post.id)) {
        posts = state.posts.map(p => p.id === posts.id ? post : p);
      } else {
        posts = [...state.posts, post];
      }
      return {...state, loadingPost: false, posts};
    }
    default:
      return state;
  }
}

function postPostReducer(state = {
  postingPost: false,
}, action) {
  switch (action.type) {
    case POST_POST_REQUEST:
      return {...state, postingPost: true};
    case POST_POST_RESPONSE:
      return {...state, postingPost: false};
    default:
      return state;
  }
}

function requestPostsByTopicReducer(state = {
  loadingPostsByTopic: false,
  topics: [],
}, action) {
  switch (action.type) {
    case REQUEST_POSTS_BY_TOPIC:
      return {...state, loadingPostsByTopic: true};
    case RECEIVE_POSTS_BY_TOPIC: {
      const {topicId, postsByTopicResponse} = action;
      const data = state.topics.find(d => d.topicId === topicId);
      let topics;
      if (data) {
        topics = state.topics.map(d => d.topicId === topicId
            ? {...d, posts: postsByTopicResponse}
            : d);
      } else {
        topics = [...state.topics, {topicId, posts: postsByTopicResponse}];
      }
      return {...state, loadingPostsByTopic: false, topics};
    }

    default:
      return state;
  }
}

function requestPostsByUser(state = {
  userPosts: [],
  loadingPostsByUser: false,
}, action) {
  switch (action.type) {
    case REQUEST_POSTS_BY_USER:
      return {...state, loadingPostsByTopic: true};
    case RECEIVE_POSTS_BY_USER: {
      const {posts, userId} = action;
      const data = state.userPosts.find(d => d.userId === userId);
      let userPosts = [];
      if (data) {
        userPosts = state.userPosts.map(d => d.userId === userId
            ? {...d, posts} : d);
      } else {
        userPosts = [...state.userPosts, {userId, posts}];
      }
      return {...state, loadingPostsByUser: false, userPosts};
    }
    default:
      return state;
  }
}

const postsReducer = reduceReducers(requestPostReducer,
    postPostReducer,
    requestPostsByTopicReducer,
    postAnswerReducer,
    postCommentReducer,
    putLikeReducer,
    searchReducer,
    requestPostsByUser);
export default postsReducer;