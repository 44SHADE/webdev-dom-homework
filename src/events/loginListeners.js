import { login } from '../api/auth/fetchLogin.js';
import { commentsPageRenderer } from '../services/render/_commentPageRenderer.js';
import { signupPageRenderer } from '../services/render/_signupPageRenderer.js';
import { xssValidate } from '../utils/xssValidate.js';

export function loginListenersInit() {
  const signinLink = document.querySelector('.signup-link');
  const cancelBtn = document.querySelector('#signin-btn-cancel');
  const confirmBtn = document.querySelector('#signin-btn-confirm');

  signinLink.addEventListener('click', () => {
    signupPageRenderer();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  cancelBtn.addEventListener('click', () => {
    commentsPageRenderer();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  confirmBtn.addEventListener('click', () => {
    const loginInput = document.querySelector('.-login-input');
    const passwordInput = document.querySelector('.-password-input');
    const user = {
      login: xssValidate(loginInput.value).toLowerCase(),
      password: xssValidate(passwordInput.value),
    };

    login(user)
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
        passwordInput.value = '';
        console.error(reason);
      });
  });
}
