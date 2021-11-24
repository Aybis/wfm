import axios from 'configs/axios/routeAbsensi';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // collectData
  all: () => axios.get('absensi/all'),

  //dashboard
  // dashboard: () => axios.get('absensi/dashboard-user-daily'),
  // reportUserByUnit: (data) => axios.get(`absensi/report-user-by-unit`, data),
  // dashboardMonthly: (params) =>
  //   axios.get('absensi/dashboard-user-monthly', params),

  // functional absensi
  checkIn: (data) => axios.post('absensi/check-in', data),
  checkOut: (data, absensi) => axios.post(`absensi/check-out/${absensi}`, data),

  // end point data personal absensi
  fetchDailyPersonal: (data) =>
    axios.get(`absensi/user/daily/?user_id=${data}`),
  fetchWeeklyPersonal: (data) => axios.get(`absensi/user/weekly`, data),
  fetchReportPersonal: (data) => axios.get('absensi/user/report', data),
  fetchSummaryPersonal: (data) => axios.get('absensi/user/summary', data),
  exportPersonal: (data) => axios.get('absensi/export-personal', data),

  // end point dashboard absensi
  fetchDataDashboardPresent: (data) => axios.get('absensi/users/present', data),
  fetchDataDashboardStatus: (data) => axios.get('absensi/users/status', data),
  fetchDataDashboardDaily: () => axios.get('absensi/users/daily'),
  fetchDataDashboardMonthly: (data) => axios.get('absensi/users/monthly', data),
  fetchDataDashboardByUnit: (data) =>
    axios.get('absensi/users/report-by-unit', data),

  // personal
  // dailyPersonal: (user) => axios.get(`absensi/daily-personal?user_id=${user}`),
  // reportPersonal: (data) => axios.get(`absensi/report-personal`, data),
  // dashboardReportPersonal: (data) =>
  //   axios.get(`absensi/dashboard-report-personal`, data),
  // weeklyPersonal: (user) =>
  //   axios.get(`absensi/weekly-personal?user_id=${user}`),

  // end point hari libur
  getHoliday: (page) => axios.get(`holiday`),
  insertHoliday: (data) => axios.post('holiday', data),
  deleteHoliday: (holiday) => axios.delete('holiday/', holiday),
  updateHoliday: (holiday) => axios.put('holiday', holiday),

  // end point lemburan
  fetchOvertimeAll: () => axios.get('overtime/all'),
  overtimeTodayPersonal: (data) => axios.get('overtime/today-personal', data),
  overtimeListApproval: (data) => axios.get('overtime/list-approve', data),
  overtimeListPersonal: (data) => axios.get('overtime/report-personal', data),

  // param username
  overtimeApprove: (data, lemburan) =>
    axios.post(`overtime/approved/${lemburan}`, data),
  overtimeIn: (data) => axios.post('overtime/check-in/', data),
  overtimeOut: (data, lemburan) =>
    axios.post(`overtime/check-out/${lemburan}`, data),

  // endpoint atasan dan bawahan
  atasanAll: (data) => axios.get('user/supervisors', data),
  atasan: (data) => axios.get('user/supervisor', data),
  bawahanAll: (data) => axios.get('user/subordinates', data),
  bawahan: (data) => axios.get('user/subordinate', data),

  // end point push notif to WA
  notifWa: (data) => axios.post('notifikasi/notif-to-subordinate', data),
};
