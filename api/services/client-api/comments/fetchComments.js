import { postStatusError } from '../errorStatusMap.js';

export function getComments() {
  return fetch('https://wedev-api.sky.pro/api/v1/alex-khor/comments', {
    method: 'GET',
  }).then((response) => {
    if (response.status !== 200)
      throw new Error(`${response.status} - ${response.statusText}`);
    return response.json();
  });
}

export function postComment(comment) {
  return fetch('https://wedev-api.sky.pro/api/v1/alex-khor/comments', {
    method: 'POST',
    body: JSON.stringify({ ...comment, forceError: true }),
  }).then((response) => {
    if (postStatusError.has(response.status))
      throw postStatusError.get(response.status);
    return response.json();
  });
}
