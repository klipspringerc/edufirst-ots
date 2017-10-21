import {POST_LIKE_REQUEST, POST_LIKE_RESPONSE,} from '../actions/likes';

export default (function likes(state = {
  postingLike: false,
  likes: [],
}, action) {
  switch (action.type) {
    case POST_LIKE_REQUEST:
      return {
        ...state,
        postingLike: true,
      };
    case POST_LIKE_RESPONSE: {
      const like = likes.find(data => data.answerId === action.answerId);
      if (like) {
        return {
          ...state,
          postingLike: false,
          likes: state.likes.map(data =>
              data.answerId === action.answerId
                  ? {...data, likes: data.likes + 1}
                  : data,
          ),
        };
      } else {
        return {
          ...state,
          postingLike: false,
          likes: [
            ...state.likes,
            {answerId: action.answerId, likes: 1},
          ],
        };
      }
    }
    default:
      return state;
  }
});