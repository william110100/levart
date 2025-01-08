import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';
import Error404 from '../../../components/Error404';

class Member extends React.Component {

  render() {
    const {match} = this.props;
    return (
      <div className="app-wrapper">
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/general`} />
          <Route path={`${match.url}/general`} component={asyncComponent(() => import('./routes/GeneralMember'))} />
          <Route component={asyncComponent(() => Error404)} />
        </Switch>
      </div>
    );
  }

}

export default Member;
