import axios from 'configs/axios/routeAbsensi';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // collectData
  all: () => axios.get('absensi/all'),
  getHoliday: (page) => axios.get(`holiday`),
  overtimeAll: () => axios.get('overtime/all'),

  //dashboard
  dashboard: () => axios.get('absensi/dashboard-user-daily'),
  reportUserByUnit: (data) => axios.get(`absensi/report-user-by-unit`, data),
  dashboardMonthly: (params) =>
    axios.get('absensi/dashboard-user-monthly', params),

  // personal
  checkIn: (data) => axios.post('absensi/check-in', data),
  checkOut: (data, absensi) => axios.post(`absensi/check-out/${absensi}`, data),
  dailyPersonal: (user) => axios.get(`absensi/daily-personal?user_id=${user}`),
  reportPersonal: (data) => axios.get(`absensi/report-personal`, data),
  exportPersonal: (data) => axios.get('absensi/export-personal', data),
  dashboardReportPersonal: (data) =>
    axios.get(`absensi/dashboard-report-personal`, data),
  weeklyPersonal: (user) =>
    axios.get(`absensi/weekly-personal?user_id=${user}`),

  // end point hari libur
  insertHoliday: (data) => axios.post('holiday', data),
  deleteHoliday: (holiday) => axios.delete('holiday/', holiday),
  updateHoliday: (holiday) => axios.put('holiday', holiday),

  // end point lemburan
  overtime: (data) => axios.post('overtime', data),
  overtimeListApproval: () => axios.get('overtime/list-approve'),
  overtimeListPersonal: () => axios.get('report-personal'),
  overtimeIn: (data) => axios.post('overtime/check-in/', data),
  overtimeOut: (data) => axios.get('overtime/check-out/', data),

  // end point push notif to WA
  notifWa: (data) => axios.post('notifikasi/notif-to-subordinate', data),
};
