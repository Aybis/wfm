import axios from './routeAbsensi';

// eslint-disable-next-line import/no-anonymous-default-export
export default (content = null) => {
  if (content) {
    axios.defaults.headers.post['Content-Type'] = content;
  } else {
    delete axios.defaults.headers.post['Content-Type'];
  }
};
