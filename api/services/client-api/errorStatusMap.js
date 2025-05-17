export const postCommentStatusError = new Map();

postCommentStatusError.set(
  400,
  new Error(
    'Bad Request Error - Status - 400:Минимальная длина для имени и сообщения - три (3) символа',
  ),
);
postCommentStatusError.set(
  401,
  new Error(
    'Unauthorized - Status - 401:Для отправки комментария сначала авторзуйтесь',
  ),
);
postCommentStatusError.set(
  500,
  new Error(
    'Internal Server Error - Status - 500:Сервер болеет, зайдите позже или отправьте комментарий повторно',
  ),
);

export const postSignUpStatusError = new Map();

postSignUpStatusError.set(
  400,
  new Error(
    'Bad Request Error - Status - 400:Такой пользователь уже существует',
  ),
);

export const postLoginStatusError = new Map();

postLoginStatusError.set(
  400,
  new Error(
    'Bad Request Error - Status - 400:Такого пользователя нет или вы ввели неправильные данные',
  ),
);
