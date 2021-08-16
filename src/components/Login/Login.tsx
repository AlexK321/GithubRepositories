import React, { useState, useEffect, useContext, FC } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../AuthContext';

const Login: FC = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: '', isLoading: false });

  const { clientId, redirectUri } = authState;

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;

    const hasCode = url.includes('?code=');

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split('?code=');

      window.history.pushState({}, '', newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        code: newUrl[1],
      };

      const { proxyUrl } = authState;

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxyUrl, {
        method: 'POST',
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((responseData) => {
          localStorage.setItem('isLoggedIn', JSON.stringify('true'));
          localStorage.setItem('user', JSON.stringify(responseData));
          setAuthState({ ...authState, isLoggedIn: true, user: responseData });
        })
        .catch(() => {
          setData({
            isLoading: false,
            errorMessage: 'Sorry! Login failed',
          });
        });
    }
  }, [authState, setAuthState, data]);

  if (authState.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <section className="container">
        <div>
          <h1>Welcome</h1>
          <span>Super amazing app</span>
          <span>{data.errorMessage}</span>
          <div className="login-container">
            {data.isLoading ? (
              <div className="loader-container">
                <div className="loader" />
              </div>
            ) : (
              <>
                {
                  // Link to request GitHub access
                }
                <a
                  className="login-link"
                  href={`https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=${redirectUri}`}
                  onClick={() => {
                    setData({ ...data, errorMessage: '' });
                  }}
                >
                  <p>Icon</p>
                  <span>Login with GitHub</span>
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
