import axios from 'configs/axios/routeAbsensi';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  all: () => axios.get('absensi/all'),
  checkIn: (data) => axios.post('absensi/check-in', data),
  checkOut: (data, absensi) => axios.post(`absensi/check-out/${absensi}`, data),
  dailyPersonal: (user) => axios.get(`absensi/daily-personal?user_id=${user}`),
  reportPersonal: (data) => axios.get(`absensi/report-personal`, data),
  dashboardReportPersonal: (data) =>
    axios.get(`absensi/dashbord-report-personal`, data),
  weeklyPersonal: (user) =>
    axios.get(`absensi/weekly-personal?user_id=${user}`),
  dashboard: () => axios.get('absensi/dashbord-user-daily'),
  reportUserByUnit: () => axios.get('absensi/report-user-by-unit'),
  insertHoliday: (data) => axios.post('holiday', data),
  getHoliday: (page) => axios.get(`holiday`),
  deleteHoliday: (holiday) => axios.delete('holiday/', holiday),
  updateHoliday: (holiday) => axios.put('holiday', holiday),
  overtime: (data) => axios.post('overtime', data),
  overtimeAll: () => axios.get('overtime/all'),
  overtimeListApproval: () => axios.get('overtime/list-approve'),
  overtimeListPersonal: () => axios.get('report-personal'),
  overtimeIn: (data) => axios.post('overtime/check-in/', data),
  overtimeOut: (data) => axios.get('overtime/check-out/', data),
};
