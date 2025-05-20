import { commentsDataArray } from '../data/commentsData.js';
import { postComment } from '../api/comments/fetchComments.js';
import { loginPageRenderer } from '../services/render/_loginPageRenderer.js';
import { commentsRenderer } from '../services/render/commentsRenderer.js';
import { disabledOrEnabledBtn } from '../utils/disabledOrEnabledBtn.js';
import { formattingDate } from '../utils/formattingDate.js';
import { xssValidate } from '../utils/xssValidate.js';

export function addComment(fnRender, commentsDataArr) {
  const nameInput = document.querySelector('.add-form-name');
  const commentArea = document.querySelector('.add-form-text');
  const date = formattingDate();
  const userName = xssValidate(nameInput.value);
  const commentText = xssValidate(commentArea.value);
  if (!userName || !commentText) {
    alert('Нельзя отправить пустой комментарий!');
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

function replyListener(commentsDataArr) {
  const container = document.querySelector('.comments');
  const commentArea = document.querySelector('.add-form-text');
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

export function commentsListenersInit() {
  const sendCommentBtn = document.querySelector('.add-form-button');
  sendCommentBtn.addEventListener(
    'click',
    addComment.bind(null, commentsRenderer, commentsDataArray),
  );
  const signinLink = document.querySelector('.signin-link');
  signinLink.addEventListener('click', () => {
    loginPageRenderer();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  replyListener(commentsDataArray);
  commentsRenderer(commentsDataArray);
}
