import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {
  BELOW_THE_HEADER, COLLAPSED_DRAWER, FIXED_DRAWER, HORIZONTAL_NAVIGATION
} from '../../constants/ActionTypes';
import {toggleCollapsedNav} from '../../actions';

class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      searchBox: false,
      searchText: '',
      mailNotification: false,
      userInfo: false,
      langSwitcher: false,
      appNotification: false,
    };
  }

  onToggleCollapsedNav = () => {
    const {navCollapsed, toggleCollapsedNav} = this.props;
    const val = !navCollapsed;
    toggleCollapsedNav(val);
  };

  handleRequestClose = () => {
    this.setState({
      langSwitcher: false,
      userInfo: false,
      mailNotification: false,
      appNotification: false,
      searchBox: false,
      apps: false
    });
  };

  render() {
    const {
      drawerType, navigationStyle, horizontalNavPosition
    } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-block d-xl-none' : drawerType.includes(COLLAPSED_DRAWER) ? 'd-block' : 'd-none';

    return (
      <AppBar
        className={`app-main-header ${(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) ? 'app-main-header-top' : ''}`}>
        <Toolbar className="app-toolbar" disableGutters={false}>
          {navigationStyle === HORIZONTAL_NAVIGATION
            ? (
              <div className="d-block d-md-none pointer mr-3" onClick={this.onToggleCollapsedNav}>
                <span className="jr-menu-icon">
                  <span className="menu-icon" />
                </span>
              </div>
            )
            : (
              <IconButton
                className={`jr-menu-icon mr-3 ${drawerStyle}`}
                aria-label="Menu"
                onClick={this.onToggleCollapsedNav}>
                <span className="menu-icon" />
              </IconButton>
            )}

          <Link className="app-logo mr-2 d-none d-sm-block" to="/">
            <img src={require('../../assets/images/logo.png')} alt="Jambo" title="Jambo" />
          </Link>

          <div className="ellipse-shape" />
        </Toolbar>
      </AppBar>
    );
  }

}


const mapStateToProps = ({settings}) => {
  const {
    drawerType, locale, navigationStyle, horizontalNavPosition
  } = settings;
  return {
    drawerType, locale, navigationStyle, horizontalNavPosition
  };
};

export default withRouter(connect(mapStateToProps, {toggleCollapsedNav})(Header));
