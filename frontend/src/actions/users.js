import {fetchPost} from './posts';
import {API_URL} from '../constants';
export const REQUEST_POSTS_BY_USER = 'REQUEST_POSTS_BY_USER';

function requestPostsByUserAction(userId) {
  return {
    type: REQUEST_POSTS_BY_USER,
    userId,
  };
}

export const RECEIVE_POSTS_BY_USER = 'RECEIVE_POSTS_BY_USER';

function receivePostsByUserAction(userId, posts) {
  return {
    type: RECEIVE_POSTS_BY_USER,
    userId,
    posts,
  };
}

export function fetchPostsByUser(userId) {
  return dispatch => {
    dispatch(requestPostsByUserAction(userId));
    fetch(`http://api.edufirstonline.com/api/v1/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => {
          dispatch(receivePostsByUserAction(userId, posts));
          posts.forEach(id => dispatch(fetchPost(id)));
        });
  };
}

export const PUT_USER_CERTIFICATE_REQUEST = 'PUT_USER_CERTIFICATE_REQUEST';

function putUserCertificateRequestAction(userId) {
  return {
    type: PUT_USER_CERTIFICATE_REQUEST,
    userId,
  };
}

export const PUT_USER_CERTIFICATE_RESPONSE = 'PUT_USER_CERTIFICATE_RESPONSE';

function putUserCertificateResponseAction(userId) {
  return {
    type: PUT_USER_CERTIFICATE_RESPONSE,
    userId,
  };
}

export function putUserCertificate(userId, token) {
  return dispatch => {
    dispatch(putUserCertificateRequestAction(userId));
    const headers = new Headers();
    headers.append('token', token);
    fetch(`http://api.edufirstonline.com/users/${userId}/certificate`, {
      method: 'PUT',
      headers,
    })
        .then(response => dispatch(putUserCertificateResponseAction(userId)));
  };
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';

function loginRequestAction(username) {
  return {
    type: LOGIN_REQUEST,
    username,
  };
}

export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';

function loginResponseAction(username, authentication) {
  return {
    type: LOGIN_RESPONSE,
    username,
    authentication,
  };
}

export function login(loginRequest) {
  return dispatch => {
    const {username} = loginRequest;
    dispatch(loginRequestAction(username));
    fetch(`${API_URL}/users/login`, {
      method: 'POST',
      body: loginRequest,
    })
        .then(response => response.json())
        .then(authentication => dispatch(
            loginResponseAction(username, authentication)));
  };
}

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';

function signupRequestAction(username, email) {
  return {
    type: SIGNUP_REQUEST,
    username,
    email,
  };
}

export const SIGNUP_RESPONSE = 'SIGNUP_RESPONSE';

function signupResponseAction(username, email) {
  return {
    type: SIGNUP_RESPONSE,
    username,
    email,
  };
}

export function signup(signUpRequest) {
  return dispatch => {
    const {username, email} = signUpRequest;
    dispatch(signupRequestAction(username, email));
    fetch('http://api.edufirstonline.com/api/v1/users/signup', {
      method: 'POST',
      body: signUpRequest
    })
        .then(response => dispatch(signupResponseAction(username, email)));
  };
}