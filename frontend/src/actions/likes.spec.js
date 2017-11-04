import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {API_URL} from '../constants';

import {
  PUT_LIKE_REQUEST,
  PUT_LIKE_RESPONSE,
  putLike,
  putLikeRequestAction,
  putLikeResponseAction,
} from './likes';
import {REQUEST_POST} from './posts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('likes', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create an action to create a request to put a like', () => {
    const postId = 1;
    const expectedAction = {
      type: PUT_LIKE_REQUEST,
      postId,
    };
    expect(putLikeRequestAction(postId)).toEqual(expectedAction);
  });

  it('should create an action to receive a response to put a like', () => {
    const postId = 1;
    const expectedAction = {
      type: PUT_LIKE_RESPONSE,
      postId,
    };
    expect(putLikeResponseAction(postId)).toEqual(expectedAction);
  });

  it('should create PUT_LIKE_RESPONSE when putting like has been done', () => {
    const postId = 1;
    fetchMock.putOnce(`${API_URL}/posts/${postId}/like/`, Promise.resolve({}));
    fetchMock.get(`${API_URL}/posts/${postId}/`, Promise.resolve({}));

    const expectedActions = [
      {type: PUT_LIKE_REQUEST, postId},
      {type: PUT_LIKE_RESPONSE, postId},
      {type: REQUEST_POST, postId},
    ];

    const store = mockStore({posts: []});
    return store.dispatch(putLike(postId, {}))
        .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});