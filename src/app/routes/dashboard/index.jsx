import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';
import Error404 from '../../../components/Error404';

function DashboardRoutes(props) {
  const { match } = props;

  return (
    <div className="app-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}peta-petugas`} />
        <Route path={`${match.url}/peta-petugas`} component={asyncComponent(() => import('./routes/OfficerMap'))} />
        <Route component={asyncComponent(() => Error404)} />
      </Switch>
    </div>
  );

}

export default DashboardRoutes;
