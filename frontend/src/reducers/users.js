import reduceReducers from 'reduce-reducers';
import {
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  PUT_USER_CERTIFICATE_REQUEST,
  PUT_USER_CERTIFICATE_RESPONSE,
} from '../actions/users';

function putUserCertificateReducer(state = {
  certificate: false,
  puttingUserCertificate: false,
}, action) {
  switch (action.type) {
    case PUT_USER_CERTIFICATE_REQUEST:
      return {...state, certificate: false, puttingUserCertificate: true};
    case PUT_USER_CERTIFICATE_RESPONSE:
      return {...state, certificate: true, puttingUserCertificate: false};
    default:
      return state;
  }
}

function loginReducer(state = {
  username: null,
  authentication: null,
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, username: action.username};
    case LOGIN_RESPONSE:
      return {
        ...state,
        username: action.username,
        authentication: action.authentication,
      };
    default:
      return state;
  }
}

const userReducer = reduceReducers(putUserCertificateReducer, loginReducer);
export default userReducer;