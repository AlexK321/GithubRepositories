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
    <div>
      {authState.isLoggedIn && (
        <img alt="" src={authState.user.avatar_url} width="100px" height="100px" />
      )}
      <button type="button" onClick={signOut}>
        {' '}
        Выйти{' '}
      </button>
    </div>
  );
};

export default AuthBlock;
