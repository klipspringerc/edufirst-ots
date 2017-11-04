import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {API_URL} from '../constants';
import {
  fetchPost,
  fetchPostsByTopic,
  POST_POST_REQUEST,
  POST_POST_RESPONSE,
  postPost,
  postPostRequestAction,
  postPostResponseAction,
  RECEIVE_POST,
  RECEIVE_POSTS_BY_TOPIC,
  receivePostAction,
  receivePostsByTopicAction,
  REQUEST_POST,
  REQUEST_POSTS_BY_TOPIC,
  requestPostAction,
  requestPostsByTopicAction,
} from './posts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('posts', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  it('should create an action to request post', () => {
    const postId = 1;
    const expectedAction = {
      type: REQUEST_POST,
      postId,
    };
    expect(requestPostAction(postId)).toEqual(expectedAction);
  });

  it('should create an action to receive post', () => {
    const postId = 1;
    const post = {id: 1, title: 'title', body: 'body'};
    const expectedAction = {
      type: RECEIVE_POST,
      post,
    };
    expect(receivePostAction(postId, post)).toEqual(expectedAction);
  });

  it('should create an action to create a post request to post', () => {
    const post = {title: 'title', body: 'body'};
    const expectedAction = {
      type: POST_POST_REQUEST,
      post,
    };
    expect(postPostRequestAction(post)).toEqual(expectedAction);
  });

  it('should create an action to receive a post response to post', () => {
    const postId = 1;
    const post = {id: postId, title: 'title', body: 'body'};
    const expectedAction = {
      type: POST_POST_RESPONSE,
      postId,
      post,
    };
    expect(postPostResponseAction(post, postId)).toEqual(expectedAction);
  });

  it('should create an action to request posts by topic', () => {
    const topicId = 'algorithms';
    const offset = 0;
    const expectedAction = {
      type: REQUEST_POSTS_BY_TOPIC,
      topicId,
      offset,
    };
    expect(requestPostsByTopicAction(topicId, offset)).toEqual(expectedAction);
  });

  it('should create an action to receive posts by topic', () => {
    const topicId = 'algorithms';
    const offset = 0;
    const postsByTopicResponse = [{id: 1, title: 'title', body: 'body'}];
    const expectedAction = {
      type: RECEIVE_POSTS_BY_TOPIC,
      topicId,
      offset,
      postsByTopicResponse,
    };
    expect(receivePostsByTopicAction(topicId, offset, postsByTopicResponse))
        .toEqual(expectedAction);
  });

  it('should create RECEIVE_POST when fetching posts has been done', () => {
    const postId = 1;
    const post = {id: 1, title: 'title', body: 'body'};
    fetchMock.get(`${API_URL}/posts/${postId}/`, JSON.stringify(post));

    const expectedActions = [
      {type: REQUEST_POST, postId},
      {type: RECEIVE_POST, post},
    ];

    const store = mockStore({posts: []});

    return store.dispatch(fetchPost(postId))
        .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should create POST_POST_RESPONSE when posting post has been done.',
      () => {
        const post = {title: 'title', body: 'body'};
        const postId = 1;
        fetchMock.postOnce(`${API_URL}/posts/`,
            JSON.stringify({'post_id': postId}));
        fetchMock.get(`${API_URL}/posts/${postId}/`,
            JSON.stringify({...post, postId}));

        const expectedActions = [
          {type: POST_POST_REQUEST, post},
          {type: POST_POST_RESPONSE, post, postId},
          {type: REQUEST_POST, postId},
        ];

        const store = mockStore({posts: []});

        return store.dispatch(postPost(post, {}))
            .then(() => expect(store.getActions()).toEqual(expectedActions));
      });

  it('should create RECEIVE_POSTS_BY_TOPIC when fetching posts by topic is' +
      ' done', () => {
    const topicId = 'algorithms';
    const offset = 0;
    const postsByTopicResponse = [{id: 1, title: 'title', body: 'body'}];
    const post = postsByTopicResponse[0];
    const postId = post.id;
    fetchMock.getOnce(`${API_URL}/posts/topic/${topicId}/`,
        JSON.stringify(postsByTopicResponse));
    fetchMock.get(`${API_URL}/posts/${postId}/`,
        JSON.stringify(post));

    const expectedActions = [
      {type: REQUEST_POSTS_BY_TOPIC, topicId, offset},
      {type: RECEIVE_POSTS_BY_TOPIC, topicId, offset, postsByTopicResponse},
      {type: REQUEST_POST, postId},
    ];

    const store = mockStore({posts: []});

    return store.dispatch(fetchPostsByTopic(topicId, offset))
        .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});