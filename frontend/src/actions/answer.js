import {API_URL} from '../constants';
import history from '../history';
import {mapObjectToFormData} from '../util';
import {fetchPost} from './posts';

export const POST_ANSWER_REQUEST = 'POST_ANSWER_REQUEST';

export function postAnswerRequestAction(postId, answerBody) {
  return {
    type: POST_ANSWER_REQUEST,
    postId,
    answerBody,
  };
}

export const POST_ANSWER_RESPONSE = 'POST_ANSWER_RESPONSE';

export function postAnswerResponseAction(postId, answerBody) {
  return {
    type: POST_ANSWER_RESPONSE,
    postId,
    answerBody,
  };
}

export function postAnswer(postId, body, authentication) {
  return dispatch => {
    dispatch(postAnswerRequestAction(postId, body));
    return fetch(`${API_URL}/posts/${postId}/answer/`, {
      body: mapObjectToFormData(body),
      method: 'POST',
      credentials: 'include',
    })
        .then(() => {
          dispatch(postAnswerResponseAction(postId, body));
          // Query the same post immediately again to update the store
          dispatch(fetchPost(postId));
          history.push(`/questions/${postId}`);
        });
  };
}