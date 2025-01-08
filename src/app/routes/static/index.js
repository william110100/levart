import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';
import Error404 from '../../../components/Error404';

class Static extends React.Component {

  render() {
    const {match} = this.props;
    return (
      <div className="app-wrapper">
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}static`} />
          <Route path={`${match.url}/terms-agreement`} component={asyncComponent(() => import('./routes/TermsAgreement'))} />
          <Route path={`${match.url}/privacy-policy`} component={asyncComponent(() => import('./routes/PrivacyPolicy'))} />
          <Route component={asyncComponent(() => Error404)} />
        </Switch>
      </div>
    );
  }

}

export default Static;
