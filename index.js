import { addComment, replyListener } from './api/events/commentListeners.js';
import { renderer } from './api/utils/commentsRenderer.js';
import { commentsDataArray } from './api/data/commentsData.js';
import { formattingDate } from './api/utils/formattingDate.js';
import { getComments } from './api/services/client-api/comments/fetchComments.js';

getComments().then((data) => {
  const res = data.comments.map((comment) => {
    return {
      name: comment.author.name,
      text: comment.text,
      date: formattingDate(comment.date),
      count: comment.likes,
      isLiked: comment.isLiked,
    };
  });

  commentsDataArray.push(...res);
  renderer(res);
});

const sendCommentBtn = document.querySelector('.add-form-button');
sendCommentBtn.addEventListener(
  'click',
  addComment.bind(null, renderer, commentsDataArray),
);

replyListener(commentsDataArray);
