import LoadingCircle from 'components/devices/universal/atoms/LoadingCircle';
import Authenticated from 'components/Routes/Authenticated';
import { setAuthorizationHeader } from 'configs/axios';
import users from 'constants/api/users';
import { createBrowserHistory } from 'history';
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
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { populateProfile } from 'store/actions/users';
import Gate from './components/Routes/Gate';
import Unauthenticated from './pages/401';
import NotFound from './pages/404';
import Login from './pages/Login';

function App() {
  const dispatch = useDispatch();
  const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL,
  });

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
            // remove cookies
            document.cookie.split(';').forEach(function (c) {
              document.cookie = c
                .replace(/^ +/, '')
                .replace(
                  /=.*/,
                  '=;expires=' + new Date().toUTCString() + ';path=/',
                );
            });
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
          <Authenticated
            exact
            path="/approval"
            component={Approval}></Authenticated>
          <Authenticated
            exact
            path="/modules"
            component={Modules}></Authenticated>
          <Authenticated
            exact
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
          ) : (
          <div className="flex justify-center items-center h-screen bg-dark">
            <LoadingCircle />
          </div>
          );
          {/* Route After Middleware */}
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
