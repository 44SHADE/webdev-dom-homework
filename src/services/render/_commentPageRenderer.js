import { commentsListenersInit } from '../../events/commentListeners.js';

export function commentsPageRenderer() {
  const container = document.querySelector('#app');
  const hasName = 'name' in localStorage;
  const isLogin = 'token' in localStorage;

  container.innerHTML = `      
    <div class="container" id="container-comments">
        <ul class="comments"></ul>
        <div class="add-form ${isLogin ? '' : '-add-form-hidden'}" id="add-comment-form">
          <input
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
            value=${hasName ? localStorage.getItem('name') : ''}
            ${hasName ? 'readonly' : ''}
          >
          <textarea
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
          ></textarea>
          <div class="add-form-row">
            <button class="button add-form-button" id="add-comment-button">Написать</button>
          </div>
        </div>
        <a class="signin-link">Чтобы добавить комментарий, авторизуйтесь</a>
      </div>`;

  commentsListenersInit();
}
