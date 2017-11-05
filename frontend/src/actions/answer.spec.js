import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {API_URL} from '../constants';
import {
  POST_ANSWER_REQUEST,
  POST_ANSWER_RESPONSE,
  postAnswer,
  postAnswerRequestAction,
  postAnswerResponseAction,
} from './answer';
import {REQUEST_POST} from './posts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('answer', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create an action to create an request to post answer', () => {
    const postId = 1;
    const answerBody = 'answerBody';
    const expectedAction = {
      type: POST_ANSWER_REQUEST,
      postId,
      answerBody,
    };
    expect(postAnswerRequestAction(postId, answerBody)).toEqual(expectedAction);
  });

  it('should create an action to receive an response to post answer', () => {
    const postId = 1;
    const answerBody = 'answerBody';
    const expectedAction = {
      type: POST_ANSWER_RESPONSE,
      postId,
      answerBody,
    };
    expect(postAnswerResponseAction(postId, answerBody))
        .toEqual(expectedAction);
  });

  it('should create POST_ANSWER_RESPONSE when posting answer has been done',
      () => {
        const postId = 1;
        const answerBody = 'answerBody';
        fetchMock.postOnce(`${API_URL}/posts/${postId}/answer/`,
            Promise.resolve({}));
        fetchMock.get(`${API_URL}/posts/${postId}/`, Promise.resolve({}));

        const expectedActions = [
          {type: POST_ANSWER_REQUEST, postId, answerBody},
          {type: POST_ANSWER_RESPONSE, postId, answerBody},
          {type: REQUEST_POST, postId},
        ];

        const store = mockStore({posts: []});
        return store.dispatch(postAnswer(postId, answerBody))
            .then(() => expect(store.getActions()).toEqual(expectedActions));
      });

});