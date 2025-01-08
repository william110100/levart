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
          <Redirect exact from={`${match.url}/`} to={`${match.url}checkpoint`} />
          <Route path={`${match.url}/checkpoint`} component={asyncComponent(() => import('./routes/Checkpoint'))} />
          <Route path={`${match.url}/pengumuman`} component={asyncComponent(() => import('./routes/Announcement'))} />
          <Route component={asyncComponent(() => Error404)} />
        </Switch>
      </div>
    );
  }

}

export default Panic;
