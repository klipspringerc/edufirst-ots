export const SEARCH_REQUEST = 'SEARCH_REQUEST';

function searchRequest(text) {
  return {
    type: SEARCH_REQUEST,
    text,
  };
}

export const SEARCH_RESPONSE = 'SEARCH_RESPONSE';

function searchResponse(text, json) {
  return {
    type: SEARCH_RESPONSE,
    text,
    machineGeneratedResult: json.data.machineGeneratedResult,
    similarQuestions: json.data.similarQuestions,
  };
}

const SEARCH_RESULT = {
  machineGeneratedResult: {
    imageUrl: null,
    text: 'machineGeneratedResult'
  },
  similarQuestions: [
    {
      title: 'Q1',
      author: 'a1',
      votes: 10,
      topAnswer: 'This is an answer',
      questionId: 1,
      authorId: 1,
    }, {
      title: 'Q2',
      author: 'a2',
      votes: 9,
      topAnswer: 'This is another answer',
      questionId: 2,
      authorId: 2,
    }],
};

export function search(text) {
  return dispatch => {
    dispatch(searchRequest(text));
    // TODO replaced by actual API call
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve(SEARCH_RESULT), 1000))
      .then(json => dispatch(searchResponse(text, { data: json })));
  };
}

export const SHOW_SEARCH_BOX = 'SHOW_SEARCH_BOX';
export const HIDE_SEARCH_BOX = 'HIDE_SEARCH_BOX';
export function showSearchBox() {
  return {
    type: SHOW_SEARCH_BOX
  };
}

export function hideSearchBox() {
  return {
    type: HIDE_SEARCH_BOX
  };
}