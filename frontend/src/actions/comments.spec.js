import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {API_URL} from '../constants';
import {
  POST_COMMENT_REQUEST,
  POST_COMMENT_RESPONSE,
  postComment,
  postCommentRequestAction,
  postCommentResponseAction,
} from './comments';
import {REQUEST_POST} from './posts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('comments', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create an action to create a request to post comment', () => {
    const postId = 1;
    const commentType = 'post';
    const body = 'body';
    const expectedAction = {
      type: POST_COMMENT_REQUEST,
      postId,
      commentType,
      body,
    };
    expect(postCommentRequestAction(postId, commentType, body))
        .toEqual(expectedAction);
  });

  it('should create an action to receive a response to post comment', () => {
    const postId = 1;
    const commentType = 'post';
    const body = 'body';
    const expectedAction = {
      type: POST_COMMENT_RESPONSE,
      postId,
      commentType,
      body,
    };
    expect(postCommentResponseAction(postId, commentType, body))
        .toEqual(expectedAction);
  });

  it('should create POST_COMMENT_RESPONSE when posting comment has been done',
      () => {
        const postId = 1;
        const commentType = 'post';
        const body = 'body';

        fetchMock.postOnce(`${API_URL}/posts/${postId}/comments/`,
            Promise.resolve({}));
        fetchMock.get(`${API_URL}/posts/${postId}/`, Promise.resolve({}));

        const expectedActions = [
          {type: POST_COMMENT_REQUEST, postId, commentType, body},
          {type: POST_COMMENT_RESPONSE, postId, commentType, body},
          {type: REQUEST_POST, postId},
        ];

        const store = mockStore({posts: []});
        return store.dispatch(postComment(postId, commentType, body))
            .then(() => expect(store.getActions()).toEqual(expectedActions));
      });
});