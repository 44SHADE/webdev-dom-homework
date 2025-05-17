'use strict';

import { commentsRenderer } from './api/services/client-api/render/commentsRenderer.js';
import { commentsDataArray } from './api/data/commentsData.js';
import { formattingDate } from './api/utils/formattingDate.js';
import { getComments } from './api/services/client-api/comments/fetchComments.js';
import { disabledOrEnabledBtn } from './api/utils/disabledOrEnabledBtn.js';
import { createLoaderText } from './api/utils/createLoaderText.js';
import { commentsPageRenderer } from './api/services/client-api/render/_commentPageRenderer.js';

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
