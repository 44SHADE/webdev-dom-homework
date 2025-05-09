export function getComments() {
  return fetch('https://wedev-api.sky.pro/api/v1/alex-khor/comments', {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((reason) => console.error(reason));
}

export function postComment(comment) {
  return fetch('https://wedev-api.sky.pro/api/v1/alex-khor/comments', {
    method: 'POST',
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .catch((reason) => console.error(reason));
}
