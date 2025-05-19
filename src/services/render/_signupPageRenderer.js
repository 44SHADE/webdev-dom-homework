import { signupListenersInit } from '../../events/signupListeners.js';

export function signupPageRenderer() {
  const container = document.querySelector('#app');

  container.innerHTML = `      
        <div class="container">
          <div class="add-form" id="signup-form">
            <input class="add-form-text -name-input" placeholder="Имя Пользователя" type="text" />
            <input class="add-form-text -login-input" placeholder="Логин" type="text" />
            <input class="add-form-text -password-input" placeholder="Пароль" type="password" />
            <div class="add-form-row">
              <button class="button" id="signup-btn-confirm">
                Зарегистрироваться
              </button>
              <button class="button" id="signup-btn-cancel">Отмена</button>
            </div>
          </div>
        </div>`;

  signupListenersInit();
}
