export const REQUEST_TOP_TRENDING_QUESTIONS = 'REQUEST_TOP_TRENDING_QUESTIONS';

export function requestTopTrendingQuestionsAction() {
  return {
    type: REQUEST_TOP_TRENDING_QUESTIONS,
  };
}

export const RECEIVE_TOP_TRENDING_QUESTIONS = 'RECEIVE_TOP_TRENDING_QUESTIONS';

export function receiveTopTrendingQuestionsAction(json) {
  return {
    type: RECEIVE_TOP_TRENDING_QUESTIONS,
    topTrendingQuestions: json.data.topTrendingQuestions,
  };
}

export const TOP_TRENDING_QUESTIONS = [
  {
    title: 'How do you split a list into evenly sized chunks',
    id: 25,
  }, {
    title: 'Does Django scale?',
    id: 4,
  },
  {
    title: 'Node and Nodejs',
    id: 31,
  },];

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