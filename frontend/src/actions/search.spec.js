import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {API_URL} from '../constants';
import {REQUEST_POST} from './posts';
import {
  search,
  SEARCH_REQUEST,
  SEARCH_RESPONSE_MACHINE_ANSWER,
  SEARCH_RESPONSE_SIMILAR_POSTS,
  searchRequestAction,
  searchResponseMachineAnswerAction,
  searchResponseSimilarPostsAction,
} from './search';

const searchRequest = {keywords: 'keyword', offset: 0};
const similarPosts = [{id: 1, title: 'title', body: 'keyword'}];
const machineAnswer = {
  pods: [
    {
      title: 'title',
      img: {src: 'src', alt: 'alt'},
      text: 'text',
    }],
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('search', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create an action to search', () => {
    const expectedAction = {type: SEARCH_REQUEST, searchRequest,};

    expect(searchRequestAction(searchRequest)).toEqual(expectedAction);
  });

  it('should create an action to receive similar posts for search', () => {
    const expectedAction = {
      type: SEARCH_RESPONSE_SIMILAR_POSTS,
      searchRequest,
      similarPosts,
    };

    expect(searchResponseSimilarPostsAction(searchRequest, similarPosts))
        .toEqual(expectedAction);
  });

  it('should create an action to receive machine answer for search', () => {
    const expectedAction = {
      type: SEARCH_RESPONSE_MACHINE_ANSWER,
      searchRequest,
      machineAnswer,
    };

    expect(searchResponseMachineAnswerAction(searchRequest, machineAnswer))
        .toEqual(expectedAction);
  });

  it('should create SEARCH_RESPONSE_SIMILAR_POSTS and' +
      ' SEARCH_RESPONSE_MACHINE_ANSWER when searching has been done', () => {
    const post = similarPosts[0];
    const postId = post.id;

    const expectedActions = [
      {type: SEARCH_REQUEST, searchRequest},
      {type: SEARCH_RESPONSE_SIMILAR_POSTS, searchRequest, similarPosts},
      {type: SEARCH_RESPONSE_MACHINE_ANSWER, searchRequest, machineAnswer},
      {type: REQUEST_POST, postId},
    ];

    fetchMock.postOnce(`${API_URL}/posts/search/`,
        JSON.stringify(similarPosts));
    fetchMock.postOnce(`${API_URL}/wolf/search/`,
        JSON.stringify(machineAnswer));
    fetchMock.get(`${API_URL}/posts/${postId}/`, JSON.stringify(post));

    const store = mockStore({posts: []});

    return store.dispatch(search(searchRequest))
        .then(() => expect(store.getActions().sort(actionCompareFunction))
            .toEqual(expectedActions.sort(actionCompareFunction)));
  });
});

function actionCompareFunction(a, b) {
  if (a.type < b.type) {
    return -1;
  } else if (a.type > b.type) {
    return 1;
  } else {
    return 0;
  }
}