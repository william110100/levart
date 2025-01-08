import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import 'assets/vendors/style';
import RTL from '../util/RTL';
import asyncComponent from '../util/asyncComponent';
import defaultTheme from './themes/defaultTheme';
import AppLocale from '../lngProvider';

import MainApp from '../app';
import SignIn from './SignIn';
import { getUser, handleCallback, setInitUrl } from '../actions';
import Auth from './Auth';
import { ADMIN, CHIEF_GROUP } from '../constants/RoleGroup';

const RestrictedRoute = ({component: Component, token, ...rest}) => (
  <Route
    {...rest}
    render={(props) => (token
      ? <Component {...props} />
      : (
        <Redirect
          to={{
            pathname: '/signin',
            state: {from: props.location}
          }}
        />
      ))}
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.token && !nextProps.authUser) {
      nextProps.getUser();
    }
    return null;
  }

  componentDidMount() {
    const {initURL, history, setInitUrl} = this.props;
    if (initURL) {
      setInitUrl(history.location.pathname);
    }
  }

  render() {
    const {
      match, location, locale, token, initURL, isDirectionRTL, authUser
    } = this.props;
    if (location.pathname === '/') {
      if (token === null) {
        return (<Redirect to="/signin" />);
      }
      if (initURL === '' || initURL === '/' || initURL === '/signin') {
        if(authUser.id_role === ADMIN)
          return (<Redirect to="/anggota" />);
        else if(CHIEF_GROUP.includes(authUser.id_role))
          return (<Redirect to="/kehadiran/lainnya" />);
        else
          return (<Redirect to="/kehadiran/harian" />);
      }
      return (<Redirect to={initURL} />);

    }
    const applyTheme = createMuiTheme(defaultTheme);

    if (isDirectionRTL) {
      applyTheme.direction = 'rtl';
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
      applyTheme.direction = 'ltr';
    }

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <MuiThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}>
            <RTL>
              <div className="app-main">
                <Switch>
                  <Route exact path="/signin" component={SignIn} />
                  <Route
                    exact
                    path="/auth/callback"
                    component={(props) => {
                      handleCallback(props.location.search);
                      return <Auth />;
                    }} />
                  <RestrictedRoute
                    path={`${match.url}`}
                    token={token}
                    component={MainApp} />
                  <Route
                    component={asyncComponent(() => import('../components/Error404'))} />
                </Switch>
              </div>
            </RTL>
          </IntlProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({settings, auth}) => {
  const {sideNavColor, locale, isDirectionRTL} = settings;
  const {authUser, token, initURL} = auth;
  return {
    sideNavColor, token, locale, isDirectionRTL, authUser, initURL
  };
};

export default connect(mapStateToProps, {setInitUrl, getUser})(App);
