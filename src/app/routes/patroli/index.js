import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';
import Error404 from '../../../components/Error404';

class Patroli extends React.Component {

  render() {
    const {match} = this.props;
    return (
      <div className="app-wrapper">
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
          <Route path={`${match.url}/list`} component={asyncComponent(() => import('./routes/PatroliList'))} />
          <Route path={`${match.url}/jadwal`} component={asyncComponent(() => import('./routes/PatroliSchedule'))} />
          <Route component={asyncComponent(() => Error404)} />
        </Switch>
      </div>
    );
  }

}

export default Patroli;
