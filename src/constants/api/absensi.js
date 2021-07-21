import axios from 'configs/axios/routeAbsensi';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  all: () => axios.get('absensi/all'),
  checkIn: (data) => axios.post('check-in', data),
  checkOut: (absensi) => axios.post('check-out/', absensi),
  dailyPersonal: (user) => axios.get(`absensi/daily-personal?user_id=${user}`),
  reportPersonal: (user) => axios.get('report-personal', user),
  reportUserByUnit: () => axios.get('report-user-by-unit'),
  weeklyPersonal: () => axios.get('weekly-personal'),
  insertHoliday: (data) => axios.post('holiday', data),
  getHoliday: (page) => axios.get(`holiday?page=${page}`),
  deleteHoliday: (holiday) => axios.delete('holiday/', holiday),
  updateHoliday: (holiday) => axios.put('holiday', holiday),
  overtime: (data) => axios.post('overtime', data),
  overtimeAll: () => axios.get('overtime/all'),
  overtimeListApproval: () => axios.get('overtime/list-approve'),
  overtimeListPersonal: () => axios.get('report-personal'),
  overtimeIn: (data) => axios.post('overtime/check-in/', data),
  overtimeOut: (data) => axios.get('overtime/check-out/', data),
};
