import {API_URL} from '../constants';
import {mapObjectToFormData} from '../util';
import {fetchPost} from './posts';

export const POST_ANSWER_REQUEST = 'POST_ANSWER_REQUEST';

function postAnswerRequestAction(postId, answerBody) {
  return {
    type: POST_ANSWER_REQUEST,
    postId,
    answerBody,
  };
}

export const POST_ANSWER_RESPONSE = 'POST_ANSWER_RESPONSE';

function postAnswerResponseAction(postId, answerBody) {
  return {
    type: POST_ANSWER_RESPONSE,
    postId,
    answerBody,
  };
}

export function postAnswer(postId, body, authentication) {
  return dispatch => {
    dispatch(postAnswerRequestAction(postId, body));
    fetch(`${API_URL}/posts/${postId}/answer/`, {
      body: mapObjectToFormData(
          {body, authentication: {userId: '', token: ''}}),
      method: 'POST',
      credentials: 'same-origin',
    })
        .then(response => {
          dispatch(postAnswerResponseAction(postId, body));
          // Query the same post immediately again to update the store
          dispatch(fetchPost(postId));
        })
        .catch(err => console.error(err));
  };
}