import axios from 'axios';

import errorHandler from './errorHandler';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_ABSENSI}`,
  timeout: 1000,
});

instance.interceptors.response.use((response) => response.data, errorHandler);
// export { default as setHeader } from './setHeader';

export default instance;
