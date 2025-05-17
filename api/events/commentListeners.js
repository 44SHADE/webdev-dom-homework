import { postComment } from '../services/client-api/comments/fetchComments.js';
import { disabledOrEnabledBtn } from '../utils/disabledOrEnabledBtn.js';
import { formattingDate } from '../utils/formattingDate.js';
import { xssValidate } from '../utils/xssValidate.js';

const nameInput = document.querySelector('.add-form-name');
const commentArea = document.querySelector('.add-form-text');

export function addComment(fnRender, commentsDataArr) {
  const date = formattingDate();
  const userName = xssValidate(nameInput.value);
  const commentText = xssValidate(commentArea.value);
  if (!userName || !commentText) {
    alert('Поля имени и комментария должны быть заполнены.');
    return null;
  }

  const commentData = {
    name: userName,
    text: commentText,
    date: date,
    count: 0,
    isLiked: false,
  };

  const changeStateFormBtn = disabledOrEnabledBtn('add-comment-button');
  changeStateFormBtn(true, 'Подождите...');

  postComment(commentData)
    .then(() => {
      changeStateFormBtn(false, 'Написать');
      commentsDataArr.push(commentData);
      fnRender(commentsDataArr);
      nameInput.value = '';
      commentArea.value = '';
    })
    .catch((reason) => {
      if (reason instanceof Error) alert(reason.message.split(':')[1]);
      if (reason.message.includes('500')) {
        nameInput.value = userName;
        commentArea.value = commentText;
      }
      changeStateFormBtn(false, 'Написать');
      console.error(reason);
    });
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
