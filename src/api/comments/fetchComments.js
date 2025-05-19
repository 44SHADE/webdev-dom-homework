import { postCommentStatusError } from '../../services/errorStatusMap.js';

export function getComments() {
  return fetch('https://wedev-api.sky.pro/api/v2/alex-khor/comments', {
    method: 'GET',
  }).then((response) => {
    if (response.status !== 200)
      throw new Error(`${response.status} - ${response.statusText}`);
    return response.json();
  });
}

export function postComment(comment) {
  const auth =
    'Bearer ' + ('token' in localStorage ? localStorage.getItem('token') : '');
  return fetch('https://wedev-api.sky.pro/api/v2/alex-khor/comments', {
    method: 'POST',
    body: JSON.stringify({ ...comment, forceError: true }),
    headers: {
      Authorization: auth,
    },
  }).then((response) => {
    if (postCommentStatusError.has(response.status))
      throw postCommentStatusError.get(response.status);
    return response.json();
  });
}
