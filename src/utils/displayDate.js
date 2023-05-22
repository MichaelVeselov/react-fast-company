export function displayDate(data) {
  const date = new Date(parseInt(data));
  const dateNow = new Date();
  const yearDiff = dateNow.getFullYear() - date.getFullYear();

  if (yearDiff === 0) {
    const dayDiff = dateNow.getDate() - date.getDate();

    if (dayDiff === 0) {
      const hourDiff = dateNow.getHours() - date.getHours();

      if (hourDiff === 0) {
        const minutesDiff = dateNow.getMinutes() - date.getMinutes();

        if (minutesDiff >= 0 && minutesDiff < 5) return '1 minute ago';
        if (minutesDiff >= 5 && minutesDiff < 10) return '5 minutes ago';
        if (minutesDiff >= 10 && minutesDiff < 30) return '10 minutes ago';

        return '30 minutes ago';
      }
      return `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
    }

    return date.toLocaleString('default', {
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    date.getFullYear() +
    '.' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '.' +
    date.getDate().toString().padStart(2, '0')
  );
}
