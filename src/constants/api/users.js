import axios from 'configs/axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login: (credentials) => axios.post('auth/token/request', credentials),
  getotp: (credentials) => axios.post('auth/otp/generate', credentials),
  verifotp: (credentials) => axios.post('auth/otp/verification', credentials),
  changePassword: (data) => axios.post('auth/otp/change_password', data),
  allTroops: () => axios.get(`/cms/user/get`),
  details: () => axios.get('auth/token/detail'),
  getProfileUser: (id) => axios.get(`cms/user/get?id${id}`),
  getMyProfile: () => axios.get('/user/profile/get'),
  updateProfile: (data) => axios.post('/user/profile/update', data),
  refresh: () => axios.post('auth/token/refresh'),
  allUnit: () => axios.get('cms/unit/get'),
  allDirektorat: () => axios.get('cms/direktorat/get'),
  allSubUnit: () => axios.get('cms/subunit/get'),
  allPosition: () => axios.get('cms/position/get'),
  listAtasan: (data) => axios.get(`cms/user/get/atasan`, data),
  listAtasanSemua: (data) => axios.get(`cms/user/get/all/atasan`, data),
  listBawahan: (data) => axios.get(`cms/user/get/bawahan`, data),
  listBawahanSemua: (data) => axios.get(`cms/user/get/all/bawahan`, data),
};
