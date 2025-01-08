import React from 'react';
import {Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';
import Error404 from '../../../components/Error404';

class Member extends React.Component {

  render() {
    const {match} = this.props;
    return (
      <div className="app-wrapper">
        <Switch>
          <Route exact path={`${match.url}`} component={asyncComponent(() => import('./routes/CMSUser'))} />
          <Route exact path={`${match.url}/lokasi`} component={asyncComponent(() => import('./routes/UserLocation'))} />
          <Route component={asyncComponent(() => Error404)} />
        </Switch>
      </div>
    );
  }

}

export default Member;
