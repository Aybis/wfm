export default function convertDate(type, date) {
  let options = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
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
    return date.getDate();
  } else if (type === 'date') {
    return date.getDate('id-ID', options);
  } else if (type === 'longMonth') {
    return date.getMonth('id-ID', options);
  } else if (type === 'month') {
    return date.getMonth();
  } else if (type === 'fullYear') {
    return date.getFullYear();
  }
}
