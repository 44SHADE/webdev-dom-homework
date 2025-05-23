import { postLoginStatusError } from '../../services/errorStatusMap.js';

export function login(user) {
  return fetch('https://wedev-api.sky.pro/api/user/login', {
    method: 'POST',
    body: JSON.stringify(user),
  }).then((response) => {
    if (postLoginStatusError.has(response.status)) {
      throw postLoginStatusError.get(response.status);
    }
    return response.json();
  });
}
