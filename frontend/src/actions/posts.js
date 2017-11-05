import {API_URL} from '../constants';
import history from '../history';
import {mapObjectToFormData} from '../util';

export const REQUEST_POST = 'REQUEST_POST';

export function requestPostAction(postId) {
  return {
    type: REQUEST_POST,
    postId,
  };
}

export const RECEIVE_POST = 'RECEIVE_POST';

export function receivePostAction(postId, post) {
  return {
    type: RECEIVE_POST,
    post,
  };
}

export const POST_POST_REQUEST = 'POST_POST_REQUEST';

export function postPostRequestAction(post) {
  return {
    type: POST_POST_REQUEST,
    post,
  };
}

export const POST_POST_RESPONSE = 'POST_POST_RESPONSE';

export function postPostResponseAction(post, postId) {
  return {
    type: POST_POST_RESPONSE,
    postId,
    post,
  };
}

export const REQUEST_POSTS_BY_TOPIC = 'REQUEST_POSTS_BY_TOPIC';

export function requestPostsByTopicAction(topicId, offset) {
  return {
    type: REQUEST_POSTS_BY_TOPIC,
    topicId,
    offset,
  };
}

export const RECEIVE_POSTS_BY_TOPIC = 'RECEIVE_POSTS_BY_TOPIC';

export function receivePostsByTopicAction(
    topicId, offset, postsByTopicResponse) {
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
    return fetch(`${API_URL}/posts/${postId}/`)
        .then(response => response.json())
        .then(post => dispatch(receivePostAction(postId, post)));
  };
}

export function postPost(post, authentication) {
  return dispatch => {
    dispatch(postPostRequestAction(post));
    return fetch(`${API_URL}/posts/`, {
      method: 'POST',
      body: mapObjectToFormData(post),
      credentials: 'include',
    })
        .then(response => response.json())
        .then(json => {
          const postId = json['post_id'];
          dispatch(postPostResponseAction(post, postId));
          // Query the new post immediately to update store
          dispatch(fetchPost(postId));
          history.push(`/questions/${postId}`);
        });
  };
}

export function fetchPostsByTopic(topicId, offset) {
  return dispatch => {
    dispatch(requestPostsByTopicAction(topicId, offset));
    return fetch(`${API_URL}/posts/topic/${topicId}/`, {
      body: offset,
    })
        .then(response => response.json())
        .then(postsByTopicResponse => {
          dispatch(receivePostsByTopicAction(
              topicId, offset, postsByTopicResponse));
          // Query all posts in this topic immediately to update store.
          postsByTopicResponse.forEach(
              postInfo => dispatch(fetchPost(postInfo.id)));
        });
  };
}