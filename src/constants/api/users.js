import axios from 'configs/axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login: (credentials) => axios.post('auth/token/request', credentials),
  getotp: (credentials) => axios.post('auth/otp/generate', credentials),
  verifotp: (credentials) => axios.post('auth/otp/verification', credentials),
  changePassword: (data) => axios.post('auth/otp/change_password', data),
  allTroops: () => axios.get(`/cms/user/get`),
  details: () => axios.get('auth/token/detail'),
  refresh: () => axios.post('auth/token/refresh'),
  allUnit: () => axios.get('cms/unit/get'),
};
