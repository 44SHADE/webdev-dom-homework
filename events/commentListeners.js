import xssValidate from '../utils/xssValidate.js';

const nameInput = document.querySelector('.add-form-name');
const commentArea = document.querySelector('.add-form-text');

export function addComment(fnRender, commentsDataArr) {
  const date = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedDate = date.split(',').join(' ');
  const userName = xssValidate(nameInput.value);
  const commentText = xssValidate(commentArea.value);
  if (!userName || !commentText) {
    alert('Поля имени и комментария должны быть заполнены.');
    return null;
  }

  const commentData = {
    name: userName,
    text: commentText,
    date: formattedDate,
    count: 0,
    isLiked: false,
  };

  commentsDataArr.push(commentData);
  fnRender(commentsDataArr);
  nameInput.value = '';
  commentArea.value = '';
}

export function replyListener(commentsDataArr) {
  const container = document.querySelector('.comments');
  container.addEventListener('click', (evt) => {
    const li =
      evt.target.tagName.toLowerCase() !== 'li'
        ? evt.target.offsetParent
        : evt.target;
    const originCommentIndex = li.getAttribute('data-index');
    const commentToReply = commentsDataArr[originCommentIndex];
    commentArea.value = `Ответ @${commentToReply.name} на сообщение: "${commentToReply.text}" \n> `;
  });
}
