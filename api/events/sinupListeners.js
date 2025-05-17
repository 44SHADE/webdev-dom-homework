import { signUp } from '../services/client-api/auth/fetchSignUp.js';
import { commentsPageRenderer } from '../services/client-api/render/_commentPageRenderer.js';
import { xssValidate } from '../utils/xssValidate.js';

export function signupListenersInit() {
  const cancelBtn = document.querySelector('#signup-btn-cancel');
  const confirmBtn = document.querySelector('#signup-btn-confirm');

  cancelBtn.addEventListener('click', () => {
    commentsPageRenderer();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  confirmBtn.addEventListener('click', () => {
    const nameInput = document.querySelector('.-name-input');
    const loginInput = document.querySelector('.-login-input');
    const passwordInput = document.querySelector('.-password-input');
    const user = {
      name: xssValidate(nameInput.value),
      login: xssValidate(loginInput.value).toLowerCase(),
      password: xssValidate(passwordInput.value),
    };
    signUp(user)
      .then((data) => {
        const user = data.user;
        if (user) {
          localStorage.setItem('login', user.login);
          localStorage.setItem('name', user.name);
          localStorage.setItem('token', user.token);
        }
        commentsPageRenderer();

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      })
      .catch((reason) => {
        if (reason instanceof Error) alert(reason.message.split(':')[1]);
        nameInput.value = '';
        loginInput.value = '';
        passwordInput.value = '';
        console.error(reason);
      });
  });
}
/* 
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
