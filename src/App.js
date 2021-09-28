import Authenticated from 'components/Routes/Authenticated';
import { createBrowserHistory } from 'history';
import { setAuthorizationHeader } from 'configs/axios';
import users from 'constants/api/users';
import Approval from 'pages/Approval';
import CheckIn from 'pages/CheckIn';
import CheckOut from 'pages/CheckOut';
import Dashboard from 'pages/Dashboard';
import DetailApproval from 'pages/DetailApproval';
import Forgot from 'pages/Forgot';
import Home from 'pages/Home';
import Inforekan from 'pages/Inforekan';
import Modules from 'pages/Modules';
import Overtime from 'pages/Overtime';
import OvertimeIn from 'pages/OvertimeIn';
import OvertimeOut from 'pages/OvertimeOut';
import Presensi from 'pages/Presensi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { populateProfile } from 'store/actions/users';
import Gate from './components/Routes/Gate';
import Unauthenticated from './pages/401';
import NotFound from './pages/404';
import Login from './pages/Login';
import Profile from 'pages/Profile';

function App() {
  const dispatch = useDispatch();
  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

  useEffect(() => {
    let session = null;
    if (localStorage.getItem('WFM:token')) {
      session = JSON.parse(localStorage.getItem('WFM:token'));
      setAuthorizationHeader(`Bearer ${session.token}`);

      users
        .details()
        .then((details) => {
          dispatch(populateProfile(details.data));
        })
        .catch((err) => {
          if (err) {
            // remove token
            localStorage.removeItem('WFM:token');

            // redirect link
            <Redirect push to="/login" />;
            // reload page
            window.location.reload();
          }
        });
    }
  }, [dispatch]);

  return (
    <>
      <Router history={history}>
        <ToastContainer />

        <Switch>
          <Gate path="/login" component={Login}></Gate>
          <Gate path="/private" component={Unauthenticated}></Gate>
          <Route path="/forgot" component={Forgot}></Route>
          {/* Route After Middleware */}
          <Authenticated exact path="/" component={Home}></Authenticated>
          <Authenticated path="/approval" component={Approval}></Authenticated>
          <Authenticated
            exact
            path="/modules"
            component={Modules}></Authenticated>
          <Authenticated
            path="/dashboard"
            component={Dashboard}></Authenticated>
          <Authenticated
            exact
            path="/details"
            component={DetailApproval}></Authenticated>
          <Authenticated
            exact
            path="/inforekan"
            component={Inforekan}></Authenticated>
          <Authenticated
            exact
            path="/presensi"
            component={Presensi}></Authenticated>
          <Authenticated
            exact
            path="/check-in"
            component={CheckIn}></Authenticated>
          <Authenticated
            exact
            path="/check-out/:id"
            component={CheckOut}></Authenticated>
          <Authenticated
            exact
            path="/overtime"
            component={Overtime}></Authenticated>
          <Authenticated
            exact
            path="/overtime-in"
            component={OvertimeIn}></Authenticated>
          <Authenticated
            exact
            path="/overtime-out"
            component={OvertimeOut}></Authenticated>
          <Authenticated
            exact
            path="/profile"
            component={Profile}></Authenticated>
          <Authenticated
            exact
            path="/personal-data"
            component={Profile}></Authenticated>

          <Route path="*" component={NotFound}></Route>
          {/* Route After Middleware */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
