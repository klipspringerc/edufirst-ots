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

export function postAnswer(postId, answerBody, authentication) {
  return dispatch => {
    dispatch(postAnswerRequestAction(postId, answerBody));
    fetch(`http://api.edufirstonline.com/api/v1/posts/${postId}/answers`, {
      body: JSON.stringify({answerBody, authentication}),
      method: 'POST',
      mode: 'cors'
    })
        .then(response => {
          dispatch(postAnswerResponseAction(postId, answerBody));
          // Query the same post immediately again to update the store
          dispatch(fetchPost(postId));
        });
  };
}