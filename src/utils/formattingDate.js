export function formattingDate(nonFormatDate = null) {
  const dateObj = nonFormatDate ? new Date(nonFormatDate) : new Date();
  const formatted = dateObj.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return formatted.replace(',', '');
}
