import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchTopTrendingQuestions,
  RECEIVE_TOP_TRENDING_QUESTIONS,
  receiveTopTrendingQuestionsAction,
  REQUEST_TOP_TRENDING_QUESTIONS,
  requestTopTrendingQuestionsAction,
  TOP_TRENDING_QUESTIONS as topTrendingQuestions,
} from './top-trending-questions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const json = {data: {topTrendingQuestions}};
describe('top-trending-questions', () => {
  it('should create an action to request top trending questions', () => {
    const expectedAction = {type: REQUEST_TOP_TRENDING_QUESTIONS};

    expect(requestTopTrendingQuestionsAction()).toEqual(expectedAction);
  });

  it('should create an action to receive top trending questions', () => {
    const expectedAction = {
      type: RECEIVE_TOP_TRENDING_QUESTIONS,
      topTrendingQuestions,
    };

    expect(receiveTopTrendingQuestionsAction(json)).toEqual(expectedAction);
  });

  it('should create RECEIVE_TOP_TRENDING_QUESTIONS when fetching top' +
      ' trending questions has been done', () => {
    const expecteActions = [
      {type: REQUEST_TOP_TRENDING_QUESTIONS},
      {type: RECEIVE_TOP_TRENDING_QUESTIONS, topTrendingQuestions},
    ];

    const store = mockStore({});

    return store.dispatch(fetchTopTrendingQuestions())
        .then(() => expect(store.getActions()).toEqual(expecteActions));
  });
});