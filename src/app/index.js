import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {isIOS, isMobile} from 'react-device-detect';
import Header from '../components/Header/index';
import Sidebar from '../containers/SideNav/index';
import Footer from '../components/Footer';
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from '../constants/ActionTypes';
import asyncComponent from '../util/asyncComponent';
import TopNav from '../components/TopNav';

class App extends React.Component {

  render() {
    const {
      match, drawerType, navigationStyle, horizontalNavPosition
    } = this.props;
    let drawerStyle = 'mini-drawer';
    if (drawerType.includes(FIXED_DRAWER)) drawerStyle = 'fixed-drawer';
    else if (drawerType.includes(COLLAPSED_DRAWER)) drawerStyle = 'collapsible-drawer';

    // set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height');
    } else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height');
    }

    return (
      <div className={`app-container ${drawerStyle}`}>

        <Sidebar />
        <div className="app-main-container">
          <div
            className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER)
            && <TopNav styleName="app-top-header" />}
            <Header />
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER)
            && <TopNav />}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
                <Route path={`${match.url}panic`} component={asyncComponent(() => import('./routes/panic'))} />
                <Route path={`${match.url}data`} component={asyncComponent(() => import('./routes/data'))} />
                <Route path={`${match.url}patroli`} component={asyncComponent(() => import('./routes/patroli'))} />
                <Route path={`${match.url}laporan`} component={asyncComponent(() => import('./routes/laporan'))} />
                <Route path={`${match.url}kehadiran`} component={asyncComponent(() => import('./routes/attendance'))} />
                <Route path={`${match.url}member`} component={asyncComponent(() => import('./routes/member'))} />
                <Route path={`${match.url}static`} component={asyncComponent(() => import('./routes/static'))} />
                <Route path={`${match.url}anggota`} component={asyncComponent(() => import('./routes/user'))} />
                <Route path={`${match.url}dashboard`} component={asyncComponent(() => import('./routes/dashboard'))} />
                <Route component={asyncComponent(() => import('../components/Error404'))} />
              </Switch>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {drawerType, navigationStyle, horizontalNavPosition} = settings;
  return {drawerType, navigationStyle, horizontalNavPosition};
};
export default withRouter(connect(mapStateToProps)(App));
