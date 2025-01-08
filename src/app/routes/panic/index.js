import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';
import Error404 from '../../../components/Error404';

class Panic extends React.Component {

  render() {
    const {match} = this.props;
    return (
      <div className="app-wrapper">
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/darurat`} />
          <Route path={`${match.url}/darurat`} component={asyncComponent(() => import('./routes/Darurat'))} />
          <Route path={`${match.url}/komunitas-aman`} component={asyncComponent(() => import('./routes/KomunitasAman'))} />
          <Route component={asyncComponent(() => Error404)} />
        </Switch>
      </div>
    );
  }

}

export default Panic;
