import {API_URL} from '../constants';
import {mapObjectToFormData} from '../util';
import {fetchPost} from './posts';

export const REQUEST_POSTS_BY_USER = 'REQUEST_POSTS_BY_USER';

export function requestPostsByUserAction(userId) {
  return {
    type: REQUEST_POSTS_BY_USER,
    userId,
  };
}

export const RECEIVE_POSTS_BY_USER = 'RECEIVE_POSTS_BY_USER';

export function receivePostsByUserAction(userId, posts) {
  return {
    type: RECEIVE_POSTS_BY_USER,
    userId,
    posts,
  };
}

export function fetchPostsByUser(userId) {
  return dispatch => {
    dispatch(requestPostsByUserAction(userId));
    return fetch(`${API_URL}/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => {
          dispatch(receivePostsByUserAction(userId, posts));
          posts.forEach(id => dispatch(fetchPost(id)));
        });
  };
}

export const PUT_USER_CERTIFICATE_REQUEST = 'PUT_USER_CERTIFICATE_REQUEST';

export function putUserCertificateRequestAction(userId) {
  return {
    type: PUT_USER_CERTIFICATE_REQUEST,
    userId,
  };
}

export const PUT_USER_CERTIFICATE_RESPONSE = 'PUT_USER_CERTIFICATE_RESPONSE';

export function putUserCertificateResponseAction(userId) {
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
    return fetch(`${API_URL}/users/${userId}/certificate`, {
      method: 'PUT',
      headers,
    })
        .then(response => dispatch(putUserCertificateResponseAction(userId)));
  };
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export function loginRequestAction(username) {
  return {
    type: LOGIN_REQUEST,
    username,
  };
}

export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';

export function loginResponseAction(username, authentication) {
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
    return fetch(`${API_URL}/users/login/`, {
      method: 'POST',
      body: mapObjectToFormData(loginRequest),
      credentials: 'include',
    })
        .then(response => response.json())
        .then(authentication => dispatch(
            loginResponseAction(username, authentication)));
  };
}

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';

export function signupRequestAction(username, email) {
  return {
    type: SIGNUP_REQUEST,
    username,
    email,
  };
}

export const SIGNUP_RESPONSE = 'SIGNUP_RESPONSE';

export function signupResponseAction(username, email) {
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
    return fetch(`${API_URL}/users/signup/`, {
      method: 'POST',
      body: mapObjectToFormData(signUpRequest),
    })
        .then(response => dispatch(signupResponseAction(username, email)));
  };
}