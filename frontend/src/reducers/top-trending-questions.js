import {
  RECEIVE_TOP_TRENDING_QUESTIONS,
  REQUEST_TOP_TRENDING_QUESTIONS,
} from '../actions/top-trending-questions';

function topTrendingQuestions(state = {
  loadingTopTrendingQuestions: false,
  topTrendingQuestions: []
}, action) {
  switch (action.type) {
    case REQUEST_TOP_TRENDING_QUESTIONS:
      return {
        ...state,
        loadingTopTrendingQuestions: true,
      };
    case RECEIVE_TOP_TRENDING_QUESTIONS:
      return {
        ...state,
        loadingTopTrendingQuestions: false,
        topTrendingQuestions: action.topTrendingQuestions,
      };
    default:
      return state;
  }
}

export default topTrendingQuestions;