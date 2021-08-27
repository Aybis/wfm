import convertDate from 'helpers/hooks/convertDate';

export default function CardKeterangan({ shift = 0, kondisi, children }) {
  let masukPagi = 8.15;
  let masukSiang = 11.15;
  let masukMalam = 21.15;

  if (kondisi !== 'sehat' || kondisi === '') {
    console.log(kondisi);
  } else if (shift <= 1 && convertDate('hoursMinutes') > masukPagi) {
    console.log(shift);
  } else if (shift === 2 && convertDate('hoursMinutes') > masukSiang) {
    console.log(shift);
  } else if (shift === 3 && convertDate('hoursMinutes') > masukMalam) {
    console.log(shift);
  } else {
    return false;
  }

  return children;
}
