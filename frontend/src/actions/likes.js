import {fetchPost} from './posts';
import {API_URL} from '../constants';
export const PUT_LIKE_REQUEST = 'PUT_LIKE_REQUEST';

function putLikeRequestAction(postId) {
  return {
    type: PUT_LIKE_REQUEST,
    postId,
  };
}

export const PUT_LIKE_RESPONSE = 'PUT_LIKE_RESPONSE';

function putLikeResponseAction(postId) {
  return {
    type: PUT_LIKE_RESPONSE,
    postId,
  };
}

export function putLike(postId, authentication) {
  return dispatch => {
    dispatch(putLikeRequestAction(postId));
    fetch(`${API_URL}/posts/${postId}/like`, {
      body: JSON.stringify(authentication),
      method: 'PUT'
    })
        .then(response => {
          dispatch(putLikeResponseAction(postId));
          // Query the same post immediately to update the store.
          dispatch(fetchPost(postId));
        });
  };
}