import React, { useRef, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AuthContext, { initialState } from './AuthContext';
import styles from './App.module.scss';
import Repositories from './components/Repositories/Repositories';
import TrackingHead from './components/TrackingHead/TrackingHead';
import CubeLoader from './components/CubeLoader/CubeLoader';
import Login from './components/Login/Login';
import Repository from './components/Repository/Repository';
import Layout from './components/Layout/Layout';
import './utils/i18next';

export interface IInitialState {
  isLoggedIn: Boolean | string;
  user: any;// eslint-disable-line
  clientId: string;
  redirectUri: string;
  clientSecret: string;
  proxyUrl: string;
}

const App: React.FC = () => {
  const app = useRef<HTMLDivElement>(null);
  const [authState, setAuthState] = useState<IInitialState>(initialState);

  return (
    <Suspense fallback={<CubeLoader />}>
      <AuthContext.Provider
        value={{
          authState,
          setAuthState,
        }}
      >
        <div className={styles.App} ref={app}>
          <TrackingHead app={app} />
          <Router>
            <Switch>
              <Route component={Repositories} exact path="/" />
              <Route component={Login} exact path="/login" />
              <Route component={Repository} exact path="/repository" />
              <Route component={Layout} exact path="/layout" />
              <Redirect to="/layout" />
            </Switch>
          </Router>
        </div>
      </AuthContext.Provider>
    </Suspense>
  );
};

export default App;
