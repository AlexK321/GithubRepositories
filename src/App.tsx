import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AuthContext, { initialState } from './AuthContext';
import styles from './App.module.scss';
import Repositories from './components/Repositories/Repositories';
import Login from './components/Login/Login';
import Repository from './components/Repository/Repository';
import Layout from './components/Layout/Layout';

export interface IInitialState {
  isLoggedIn: Boolean | string;
  user: any;// eslint-disable-line
  clientId: string;
  redirectUri: string;
  clientSecret: string;
  proxyUrl: string;
}

const App: React.FC = () => {
  const [authState, setAuthState] = useState<IInitialState>(initialState);
  // if (loading) return <Loading/>;

  // if (error) return <Error/>;

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
      }}
    >
      <div className={styles.App}>
        <Router>
          <Switch>
            <Route component={Repositories} exact path="/" />
            <Route component={Login} exact path="/login" />
            <Route component={Repository} exact path="/repository/:id" />
            <Route component={Layout} exact path="/layout" />
            <Redirect to="/layout" />
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
