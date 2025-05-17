/* 
Авторизует пользователя и возвращает Bearer токен авторизации
post: https://wedev-api.sky.pro/api/user/login

req:
{
  "login": "glebka",
  "password": "123456"
}
res:
{
  "user": {
    "id": 1,
    "login": "glebka",
    "password": "123456",
    "name": "Глеб Фокин",
    "token": "bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck"
  }
}
*/

import { postLoginStatusError } from '../errorStatusMap.js';

export function login(user) {
  return fetch('https://wedev-api.sky.pro/api/user/login', {
    method: 'POST',
    body: JSON.stringify(user),
  }).then((response) => {
    if (postLoginStatusError.has(response.status)) {
      throw postLoginStatusError(response.status);
    }
    return response.json();
  });
}
