import {API_URL} from '../constants';
import {mapObjectToFormData} from '../util';
import {fetchPost} from './posts';

export const POST_COMMENT_REQUEST = 'POST_COMMENT_REQUEST';

export function postCommentRequestAction(postId, commentType, body) {
  return {
    type: POST_COMMENT_REQUEST,
    postId,
    commentType,
    body,
  };
}

export const POST_COMMENT_RESPONSE = 'POST_COMMENT_RESPONSE';

export function postCommentResponseAction(postId, commentType, body) {
  return {
    type: POST_COMMENT_RESPONSE,
    postId,
    commentType,
    body,
  };
}

export function postComment(postId, commentType, body, authentication) {
  return dispatch => {
    dispatch(postCommentRequestAction(postId, commentType, body));
    return fetch(`${API_URL}/posts/${postId}/comments/`, {
      body: mapObjectToFormData({
        commentType,
        post_id: postId,
        body,
        authentication,
      }),
      method: 'POST',
    })
        .then(response => {
          dispatch(postCommentResponseAction(postId, commentType, body));
          // Query the same post immediately to update the store
          dispatch(fetchPost(postId));
        });
  };
}