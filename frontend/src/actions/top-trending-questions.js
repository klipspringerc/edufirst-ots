export const REQUEST_TOP_TRENDING_QUESTIONS = 'REQUEST_TOP_TRENDING_QUESTIONS';

function requestTopTrendingQuestionsAction() {
  return {
    type: REQUEST_TOP_TRENDING_QUESTIONS,
  };
}

export const RECEIVE_TOP_TRENDING_QUESTIONS = 'RECEIVE_TOP_TRENDING_QUESTIONS';

function receiveTopTrendingQuestionsAction(json) {
  return {
    type: RECEIVE_TOP_TRENDING_QUESTIONS,
    topTrendingQuestions: json.data.topTrendingQuestions,
  };
}

const TOP_TRENDING_QUESTIONS = [
  {
    title: 'Q1',
    id: 1,
  }, {
    title: 'Q2',
    id: 2,
  }];

export function fetchTopTrendingQuestions() {
  return dispatch => {
    dispatch(requestTopTrendingQuestionsAction());
    // TODO replace by actual API call
    return new Promise((resolve, reject) =>
        setTimeout(() => resolve(TOP_TRENDING_QUESTIONS), 1000))
        .then(json => dispatch(receiveTopTrendingQuestionsAction({
          data: {topTrendingQuestions: json},
        })));
  };
}