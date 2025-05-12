export const postStatusError = new Map();

postStatusError.set(
  400,
  new Error(
    'Bad Request Error - Status - 400:Минимальная длина для имени и сообщения - три (3) символа',
  ),
);
postStatusError.set(
  500,
  new Error(
    'Internal Server Error - Status - 500:Сервер болеет, зайдите позже или отправьте коментарий повторно',
  ),
);
