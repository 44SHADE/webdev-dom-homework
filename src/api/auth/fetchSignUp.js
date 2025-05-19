import { postSignUpStatusError } from '../../services/errorStatusMap.js';

export function signUp(user) {
  return fetch('https://wedev-api.sky.pro/api/user', {
    method: 'POST',
    body: JSON.stringify(user),
  }).then((response) => {
    if (postSignUpStatusError.has(response.status)) {
      throw postSignUpStatusError.get(response.status);
    }
    return response.json();
  });
}
