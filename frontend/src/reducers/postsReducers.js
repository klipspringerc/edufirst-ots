import {POST_ANSWER_REQUEST, POST_ANSWER_RESPONSE} from '../actions/answer';

function answerReducer(state = {
  postingAnswer: false,
  posts: [],
}, action) {
  switch (action.type) {
    case POST_ANSWER_REQUEST:
      return {
        ...state,
        postingAnswer: true,
      };
    case POST_ANSWER_RESPONSE: {
      const {postId, answerBody} = action;
    }
  }
}