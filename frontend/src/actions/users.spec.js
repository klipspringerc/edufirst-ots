import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {API_URL} from '../constants';
import {REQUEST_POST} from './posts';
import {
  fetchPostsByUser,
  login,
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  loginRequestAction,
  loginResponseAction,
  PUT_USER_CERTIFICATE_REQUEST,
  PUT_USER_CERTIFICATE_RESPONSE,
  putUserCertificate,
  putUserCertificateRequestAction,
  putUserCertificateResponseAction,
  RECEIVE_POSTS_BY_USER,
  receivePostsByUserAction,
  REQUEST_POSTS_BY_USER,
  requestPostsByUserAction,
  signup,
  SIGNUP_REQUEST,
  SIGNUP_RESPONSE,
  signupRequestAction,
} from './users';

const userId = 'chiukingyee';
const username = userId;
const posts = [1];
const post = {id: 1, title: 'title', body: 'body'};
const postId = posts[0];
const token = 'token';
const authentication = {status: 'success', message: 'message'};
const loginRequest = {username, password: 'password'};
const email = 'chiukingyee@example.com';
const signupRequest = {username, email, password: 'password'};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('users', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create an action to request posts by user', () => {
    const expectedAction = {type: REQUEST_POSTS_BY_USER, userId};

    expect(requestPostsByUserAction(userId)).toEqual(expectedAction);
  });

  it('should create an action to receive posts by user', () => {
    const expectedAction = {type: RECEIVE_POSTS_BY_USER, userId, posts};

    expect(receivePostsByUserAction(userId, posts)).toEqual(expectedAction);
  });

  it('should create RECEIVE_POSTS_BY_USER when fetching posts by user has' +
      ' been done', () => {
    const expectedActions = [
      {type: REQUEST_POSTS_BY_USER, userId},
      {type: RECEIVE_POSTS_BY_USER, userId, posts},
      {type: REQUEST_POST, postId},
    ];
    fetchMock.getOnce(`${API_URL}/users/${userId}/posts`,
        JSON.stringify(posts));
    fetchMock.get(`${API_URL}/posts/${postId}/`, JSON.stringify(post));

    const store = mockStore({});

    return store.dispatch(fetchPostsByUser(userId))
        .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should create an action to request to put user certificate', () => {
    const expectedAction = {type: PUT_USER_CERTIFICATE_REQUEST, userId};

    expect(putUserCertificateRequestAction(userId)).toEqual(expectedAction);
  });

  it('should create an action to respond to put user certificate', () => {
    const expectedAction = {type: PUT_USER_CERTIFICATE_RESPONSE, userId};

    expect(putUserCertificateResponseAction(userId)).toEqual(expectedAction);
  });

  it('should create PUT_USER_CERTIFICATE_RESPONSE when putting user' +
      ' certificate has been done', () => {
    const expectedActions = [
      {type: PUT_USER_CERTIFICATE_REQUEST, userId},
      {type: PUT_USER_CERTIFICATE_RESPONSE, userId},
    ];
    fetchMock.putOnce(`${API_URL}/users/${userId}/certificate`,
        Promise.resolve({}));

    const store = mockStore({});

    return store.dispatch(putUserCertificate(userId))
        .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should create an action to request login', () => {
    const expectedAction = {type: LOGIN_REQUEST, username};

    expect(loginRequestAction(username)).toEqual(expectedAction);
  });

  it('should create an action to response to login', () => {
    const expectedAction = {type: LOGIN_RESPONSE, username, authentication};

    expect(loginResponseAction(username, authentication))
        .toEqual(expectedAction);
  });

  it('should create LOGIN_RESPONSE when logging in has been done', () => {
    const expectedActions = [
      {type: LOGIN_REQUEST, username},
      {type: LOGIN_RESPONSE, username, authentication},
    ];
    fetchMock.postOnce(`${API_URL}/users/login/`,
        JSON.stringify(authentication));

    const store = mockStore({});

    return store.dispatch(login(loginRequest))
        .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should create an action to request signup', () => {
    const expectedAction = {type: SIGNUP_REQUEST, username, email};

    expect(signupRequestAction(username, email)).toEqual(expectedAction);
  });

  it('should create an action to response to signup', () => {
    const expectedAction = {type: SIGNUP_REQUEST, username, email};

    expect(signupRequestAction(username, email))
        .toEqual(expectedAction);
  });

  it('should create SIGNUP_RESPONSE when signing up has been done', () => {
    const expectedActions = [
      {type: SIGNUP_REQUEST, username, email},
      {type: SIGNUP_RESPONSE, username, email},
    ];
    fetchMock.postOnce(`${API_URL}/users/signup/`,
        Promise.resolve({}));

    const store = mockStore({});

    return store.dispatch(signup(signupRequest))
        .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});