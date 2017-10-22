export const REQUEST_POST = 'REQUEST_POST';

function requestPostAction(postId) {
  return {
    type: REQUEST_POST,
    postId,
  };
}

export const RECEIVE_POST = 'RECEIVE_POST';

function receivePostAction(postId, post) {
  return {
    type: RECEIVE_POST,
    post,
  };
}

export const POST_POST_REQUEST = 'POST_POST_REQUEST';

function postPostRequestAction(post) {
  return {
    type: POST_POST_REQUEST,
    post,
  };
}

export const POST_POST_RESPONSE = 'POST_POST_RESPONSE';

function postPostResponseAction(post, postId) {
  return {
    type: POST_POST_RESPONSE,
    postId,
    post,
  };
}

export const REQUEST_POSTS_BY_TOPIC = 'REQUEST_POSTS_BY_TOPIC';

function requestPostsByTopicAction(topicId, offset) {
  return {
    type: REQUEST_POSTS_BY_TOPIC,
    topicId,
    offset,
  };
}

export const RECEIVE_POSTS_BY_TOPIC = 'RECEIVE_POSTS_BY_TOPIC';

function receivePostsByTopicAction(topicId, offset, postsByTopicResponse) {
  return {
    type: RECEIVE_POSTS_BY_TOPIC,
    topicId,
    offset,
    postsByTopicResponse,
  };
}

export function fetchPost(postId) {
  return dispatch => {
    dispatch(requestPostAction(postId));
    fetch(`http://api.edufirstonline.com/api/v1/posts/${postId}`)
        .then(response => response.json())
        .then(post => dispatch(receivePostAction(postId, post)));
  };
}

export function postPost(post, authentication) {
  return dispatch => {
    dispatch(postPostRequestAction(post));
    fetch('http://api.edufirstonline.com/api/v1/posts/', {
      method: 'POST',
      body: JSON.stringify({post, authentication}),
    })
        .then(response => response.text())
        .then(postId => {
          dispatch(postPostResponseAction(post, postId));
          // Query the new post immediately to update store
          dispatch(fetchPost(postId));
        });
  };
}

export function fetchPostsByTopic(topicId, offset) {
  return dispatch => {
    dispatch(requestPostsByTopicAction(topicId, offset));
    fetch(`http://api.edufirstonline.com/api/v1/posts/topic/${topicId}`, {
      body: offset,
    })
        .then(response => response.json())
        .then(postsByTopicResponse => {
          dispatch(receivePostsByTopicAction(
              topicId, offset, postsByTopicResponse));
          // Query all posts in this topic immeidately to update store.
          postsByTopicResponse.forEach(
              postInfo => dispatch(fetchPost(postInfo.id)));
        });
  };
}