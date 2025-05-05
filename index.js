import { addComment, replyListener } from './events/commentListeners.js';
import { renderer } from './utils/commentsRenderer.js';
import { commentsDataArray } from './data/commentsData.js';

const sendCommentBtn = document.querySelector('.add-form-button');
sendCommentBtn.addEventListener(
  'click',
  addComment.bind(null, renderer, commentsDataArray),
);

renderer(commentsDataArray);
replyListener(commentsDataArray);
