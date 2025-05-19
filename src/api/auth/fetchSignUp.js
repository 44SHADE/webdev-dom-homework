import { postSignUpStatusError } from '../../services/errorStatusMap.js';

export function signUp(user) {
  return fetch('https://wedev-api.sky.pro/api/user', {
    method: 'POST',
    body: JSON.stringify(user),
  }).then((response) => {
    console.log('first res: ', response.status);
    if (postSignUpStatusError.has(response.status)) {
      throw postSignUpStatusError(response.status);
    }
    return response.json();
  });
}
