import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';
import Error404 from '../../../components/Error404';

class Lapor extends React.Component {

  render() {
    const {match} = this.props;
    return (
      <div className="app-wrapper">
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/insiden`} />
          <Route path={`${match.url}/insiden`} component={asyncComponent(() => import('./routes/Insiden'))} />
          <Route path={`${match.url}/harian`} component={asyncComponent(() => import('./routes/Harian'))} />
          <Route component={asyncComponent(() => Error404)} />
        </Switch>
      </div>
    );
  }

}

export default Lapor;
