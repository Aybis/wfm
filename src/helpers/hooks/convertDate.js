export default function convertDate(type, fullDate) {
  let date = new Date(fullDate);
  let options = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
  };
  let onlyDay = {
    weekday: 'long',
  };
  let onlyMonth = {
    month: 'long',
  };

  if (type === 'fullDayMonthYear') {
    return date.toLocaleDateString('id-ID', options);
  } else if (type === 'date') {
    return date.toLocaleString('id-ID', options);
  } else if (type === 'fullTime') {
    return (
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      (date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}`)
    );
  } else if (type === 'hours') {
    return date.getHours();
  } else if (type === 'minutes') {
    return date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  } else if (type === 'second') {
    return date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}`;
  } else if (type === 'day') {
    return date.toLocaleString('id-ID', onlyDay);
  } else if (type === 'dateOnly') {
    return date.getDate();
  } else if (type === 'longMonth') {
    return date.toLocaleString('id-ID', onlyMonth);
  } else if (type === 'month') {
    return date.getMonth();
  } else if (type === 'fullYear') {
    return date.getFullYear();
  }
}
