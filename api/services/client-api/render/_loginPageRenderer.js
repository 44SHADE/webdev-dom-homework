import { loginListenersInit } from '../../../events/loginListeners.js';

export function loginPageRenderer() {
  const container = document.querySelector('#app');

  container.innerHTML = `      
          <div class="container">
            <div class="add-form" id="signup-form">
              <input class="add-form-text -login-input" placeholder="Логин" type="text" />
              <input class="add-form-text -password-input" placeholder="Пароль" type="password" />
              <div class="add-form-row">
                <button class="button" id="signin-btn-confirm">
                  Войти
                </button>
                <button class="button" id="signin-btn-cancel">Отмена</button>
              </div>
            </div>
            <a class="signup-link">Регистрация</a>
          </div>`;

  loginListenersInit();
}
