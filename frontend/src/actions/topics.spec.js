import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {API_URL} from '../constants';
import {
  fetchTopics,
  RECEIVE_TOPICS,
  receiveTopicsAction,
  REQUEST_TOPICS,
  requestTopicsAction,
} from './topics';

const topics = ['algorithms'];
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('topics', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create an action to request topics', () => {
    const expectedAction = {type: REQUEST_TOPICS};

    expect(requestTopicsAction()).toEqual(expectedAction);
  });

  it('should create an action to receive topics', () => {
    const expectedAction = {type: RECEIVE_TOPICS, topics};

    expect(receiveTopicsAction(topics)).toEqual(expectedAction);
  });

  it('should create RECEIVE_TOPICS when fetching topics has been done', () => {
    const expectedActions = [
      {type: REQUEST_TOPICS},
      {type: RECEIVE_TOPICS, topics},
    ];
    fetchMock.getOnce(`${API_URL}/topics/`, JSON.stringify(topics));

    const store = mockStore({});

    return store.dispatch(fetchTopics())
        .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});