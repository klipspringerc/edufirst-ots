import {POST_ANSWER_REQUEST, POST_ANSWER_RESPONSE} from '../actions/answer';

export default function postAnswerReducer(state = {
  postingAnswer: false,
}, action) {
  switch (action.type) {
    case POST_ANSWER_REQUEST:
      return {...state, postingAnswer: true};
    case POST_ANSWER_RESPONSE:
      return {...state, postingAnswer: false};
  }
}