import Authenticated from 'components/Routes/Authenticated';
import { createBrowserHistory } from 'history';
import Forgot from 'pages/Forgot';
import Index from 'pages/Index';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Gate from './components/Routes/Gate';
import Unauthenticated from './pages/401';
import NotFound from './pages/404';
import Login from './pages/Login';
import { setAuthorizationHeader } from 'configs/axios';
import { populateProfile } from 'store/actions/users';
import users from 'constants/api/users';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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

          <Authenticated path="/" component={Index}></Authenticated>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
