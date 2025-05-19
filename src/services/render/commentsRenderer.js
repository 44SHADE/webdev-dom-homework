export function commentsRenderer(commentsData) {
  const container = document.querySelector('.comments');
  if (commentsData.length === 0) return [];

  container.innerHTML = commentsData
    .map(
      (el, index) =>
        ` <li class="comment" data-index=${index}>
        <div class="comment-header">
          <div>${el.name}</div>
          <div>${el.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${el.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${el.count}</span>
            <button class="like-button ${
              el.isLiked ? '-active-like' : null
            }"></button>
          </div>
        </div>
      </li>
      `,
    )
    .join('');

  const comments = document.querySelectorAll('.comment');
  comments.forEach((el, index) => {
    const commentData = commentsData[index];
    const btn = el.querySelector('.like-button');
    const isLogin = 'token' in localStorage;
    btn.addEventListener('click', (evt) => {
      if (isLogin) {
        evt.stopPropagation();
        commentData.count += commentData.isLiked ? -1 : 1;
        commentData.isLiked = !commentData.isLiked;
        commentsRenderer(commentsData);
      } else {
        alert('Сначала авторизуйтесь!');
      }
    });
  });
}
