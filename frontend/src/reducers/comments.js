import {
  POST_COMMENT_REQUEST,
  POST_COMMENT_RESPONSE,
} from '../actions/comments';

export default function postComments(state = {
  postingComment: false,
  comments: [],
}, action) {
  switch (action.type) {
    case POST_COMMENT_REQUEST:
      return {
        ...state,
        postingComment: true,
      };
    case POST_COMMENT_RESPONSE: {
      const {answerId, userId} = action;
      const newComments = action.comments;
      const data = state.comments.find(
          data => data.answerId === action.answerId);
      if (data) {
        return {
          ...state,
          postingComment: false,
          comments: state.comments.map(data => {
            if (data.answerId === answerId) {
              return {
                answerId,
                comments: newComments,
              };
            } else {
              return data;
            }
          }),
        };
      } else {
        return {
          ...state,
          postingComment: false,
          comments: [
            ...state.comments, {
              answerId,
              comments: newComments,
            }],
        };
      }
    }
    default:
      return state;
  }
}