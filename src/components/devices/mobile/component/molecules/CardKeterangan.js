import convertDate from 'helpers/hooks/convertDate';

export default function CardKeterangan({ shift = 0, kondisi, children }) {
  let masukPagi = 8.15;
  let masukSiang = 11.15;
  let masukMalam = 21.15;

  if (kondisi !== 'sehat' || kondisi === '') {
    return children;
  } else {
    if (shift <= 1) {
      return convertDate('hoursMinutes') > masukPagi && children;
    } else if (shift === '2') {
      return convertDate('hoursMinutes') > masukSiang && children;
    } else if (shift === '3') {
      return convertDate('hoursMinutes') > masukMalam && children;
    } else {
      return false;
    }
  }
}
