'use strict';

import { commentsRenderer } from './src/services/render/commentsRenderer.js';
import { commentsDataArray } from './src/data/commentsData.js';
import { formattingDate } from './src/utils/formattingDate.js';
import { getComments } from './src/api/comments/fetchComments.js';
import { disabledOrEnabledBtn } from './src/utils/disabledOrEnabledBtn.js';
import { createLoaderText } from './src/utils/createLoaderText.js';
import { commentsPageRenderer } from './src/services/render/_commentPageRenderer.js';

commentsPageRenderer();
const loaderTextEl = createLoaderText(
  'container-comments',
  'p',
  'add-comment-form',
  'Идет загрузка комментариев подождите...',
);
const changeStateFormBtn = disabledOrEnabledBtn('add-comment-button');
changeStateFormBtn(true, "Don't touch!");

getComments()
  .then((data) => {
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
    changeStateFormBtn(false, 'Написать');
    loaderTextEl.remove();
    commentsRenderer(res);
  })
  .catch((reason) => {
    if (reason instanceof Error)
      alert(
        'Не удалось получить комментарии, попробуйте перезагрузить страницу',
      );
    console.error(reason);
  });
