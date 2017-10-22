import {PUT_LIKE_REQUEST, PUT_LIKE_RESPONSE} from '../actions/likes';

export default function putLikeReducer(state = {
  puttingLike: false,
}, action) {
  switch (action.type) {
    case PUT_LIKE_REQUEST:
      return {...state, puttingLike: true};
    case PUT_LIKE_RESPONSE:
      return {...state, puttingLike: false};
    default:
      return state;
  }
}