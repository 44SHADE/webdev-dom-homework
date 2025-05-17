//post: https://wedev-api.sky.pro/api/user - new user
/* 
req:
{
  "login": "glebka",
  "name": "Глеб Фокин",
  "password": "123456"
} 

Возвращает код 201 и зарегистрированного пользователя
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

import { postSignUpStatusError } from '../errorStatusMap.js';

export function signUp(user) {
  return fetch('https://wedev-api.sky.pro/api/user', {
    method: 'POST',
    body: JSON.stringify(user),
  }).then((response) => {
    if (postSignUpStatusError.has(response.status)) {
      throw postSignUpStatusError(response.status);
    }
    return response.json();
  });
}
