import {API_URL} from '../constants';
import {fetchPost} from './posts';
import {mapObjectToFormData} from '../util';

export const POST_COMMENT_REQUEST = 'POST_COMMENT_REQUEST';

function postCommentRequestAction(postId, commentType, body) {
  return {
    type: POST_COMMENT_REQUEST,
    postId,
    commentType,
    body,
  };
}

export const POST_COMMENT_RESPONSE = 'POST_COMMENT_RESPONSE';

function postCommentResponseAction(postId, commentType, body) {
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
    fetch(`${API_URL}/posts/${postId}/comments/`, {
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