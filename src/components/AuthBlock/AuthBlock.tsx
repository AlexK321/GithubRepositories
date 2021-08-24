import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../AuthContext';

const AuthBlock: React.FC = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const history = useHistory();

  if (authState.isLoggedIn === false) {
    history.push('/login');
  }

  const signOut = (): void => {
    localStorage.clear();
    setAuthState({ ...authState, isLoggedIn: false, user: '' });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      {authState.isLoggedIn && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <img
            alt=""
            src={authState.user.avatar_url}
            width="100px"
            height="100px"
            style={{ display: 'flex', justifyContent: 'space-evenly' }}
          />
          <Button variant="contained" color="secondary" onClick={signOut}>
            Выйти
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthBlock;
