import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import Repositories from './components/Repositories/Repositories';
import Repository from './components/Repository/Repository';
import Layout from './components/Layout/Layout';

const App: React.FC = () => {
  // if (loading) return <Loading/>;

  // if (error) return <Error/>;

  return (
    <div className={styles.App}>
      <Router>
        <Switch>
          <Route component={Repositories} exact path="/" />
          <Route component={Repository} exact path="/repository/:id" />
          <Route component={Layout} exact path="/layout" />
          <Redirect to="/layout" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
