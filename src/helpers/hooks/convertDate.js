export default function convertDate(type, fullDate) {
  let date = fullDate ? new Date(fullDate) : new Date();

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

  let dateDay = {
    weekday: 'short',
  };

  if (type === 'fullDayMonthYear') {
    return date.toLocaleDateString('id-ID', options);
  } else if (type === 'fullDate') {
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds()
    );
  } else if (type === 'date') {
    return date.toLocaleString('id-ID', options);
  } else if (type === 'fullTime') {
    return (
      date.getHours() +
      ' : ' +
      (date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`) +
      ' : ' +
      (date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`)
    );
  } else if (type === 'hours') {
    return date.getHours();
  } else if (type === 'minutes') {
    return date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  } else if (type === 'second') {
    return date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
  } else if (type === 'day') {
    return date.toLocaleString('id-ID', onlyDay);
  } else if (type === 'dateOnly') {
    return date.getDate();
  } else if (type === 'longMonth') {
    return date.toLocaleString('id-ID', onlyMonth);
  } else if (type === 'month') {
    return date.getMonth() + 1;
  } else if (type === 'fullYear') {
    return date.getFullYear();
  } else if (type === 'hoursMinutes') {
    return date.getHours() + date.getMinutes() / 100;
  } else if (type === 'getTime') {
    let date1 = date.getDate();
    return date.getTime(date1);
  } else if (type === 'timeAm') {
    return (
      date.getHours() +
      ':' +
      (date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`) +
      (date.getHours() > 12 ? ' PM' : ' AM')
    );
  } else if (type === 'dateStyle') {
    return (
      date.getDate() +
      '.' +
      (date.getMonth() + 1) +
      '.' +
      date.getFullYear() +
      ', ' +
      date.toLocaleString('id-ID', dateDay)
    );
  }
}
