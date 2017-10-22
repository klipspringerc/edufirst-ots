import {
  POST_COMMENT_REQUEST,
  POST_COMMENT_RESPONSE,
} from '../actions/comments';

export default function postCommentReducer(state = {
  postingComment: false,
}, action) {
  switch (action.type) {
    case POST_COMMENT_REQUEST:
      return {...state, postingComment: true};
    case POST_COMMENT_RESPONSE:
      return {...state, postingComment: false};
  }
}