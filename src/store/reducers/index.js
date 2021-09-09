import { combineReducers } from 'redux';
import users from './users';
import absensi from './absensi';
import presence from './presence';
import employee from './employee';
import dashboard from './dashboard';

export default combineReducers({
  users,
  absensi,
  presence,
  employee,
  dashboard,
});
