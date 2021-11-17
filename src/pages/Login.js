import LoginPage from 'components/devices/desktop/pages/LoginPage';
import LoginMobile from 'components/devices/mobile/pages/LoginPage';
import { setAuthorizationHeader } from 'configs/axios';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect, useState } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { populateProfile } from 'store/actions/users';
import swal from 'sweetalert';
import users from '../constants/api/users';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [didMount, setDidMount] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [{ username, password }, setState] = useForm({
    username: '',
    password: '',
  });

  const submitFunction = (event) => {
    event.preventDefault();
    setIsSubmit(!isSubmit);

    // api get token authorization
    users
      .login({ username, password })
      .then((res) => {
        // set authorization with bearer token
        setAuthorizationHeader(`Bearer ${res.data.access_token}`);

        // ToastHandler('success', 'Login Success 👋', 1000);

        // api get details users
        users
          .details()
          .then((details) => {
            dispatch(populateProfile(details.data));
            // store data token to local storage
            localStorage.setItem(
              'WFM:token',
              JSON.stringify({
                token: res.data.access_token,
                username: username,
                refresh_token: res.data.refresh_token,
              }),
            );

            const redirect = localStorage.getItem('WFM:redirect');

            // store data user to cookies
            const userCookie = {
              name: details.data.name,
              avatar: details.data.image_url
                ? details.data.image_url
                : details.data.thumb_url,
            };

            /**
             * set expires user cookies
             * date + 7 * 24 * 60 * 60 * 1000
             * meaning
             * tanggal + 7hari * 24jam * 60menit * 60detik * 1000ms
             */
            const expires = new Date(
              new Date().getTime() + 1 * 24 * 60 * 60 * 1000,
            );

            document.cookie = `WFM:user=${JSON.stringify(
              userCookie,
            )}; expires=${expires.toUTCString()}; path:/`;
            swal({
              title: 'Login berhasil!',
              icon: 'success',
              button: 'Close!',
            });

            setTimeout(() => {
              // redirect link
              history.push(redirect || '/');
              setIsSubmit(false);
            }, 300);
          })
          .catch((error) => {
            setIsSubmit(false);
          });
      })
      .catch((err) => {
        setIsSubmit(false);
      });
  };

  useEffect(() => {
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <>
      {isDesktop && (
        <LoginPage
          isSubmit={isSubmit}
          username={username}
          password={password}
          setState={setState}
          onSubmit={submitFunction}
        />
      )}
      {isMobile && (
        <LoginMobile
          isSubmit={isSubmit}
          username={username}
          password={password}
          setState={setState}
          onSubmit={submitFunction}
        />
      )}
    </>
  );
};

export default withRouter(Login);
