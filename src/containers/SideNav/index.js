import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import SidenavContent from './SidenavContent';
import UserInfo from '../../components/UserInfo';
import {COLLAPSED_DRAWER, FIXED_DRAWER, HORIZONTAL_NAVIGATION} from '../../constants/ActionTypes';
import {toggleCollapsedNav, updateWindowWidth} from '../../actions';

class SideNav extends React.PureComponent {

  componentDidMount() {
    const {updateWindowWidth} = this.props;
    window.addEventListener('resize', () => {
      updateWindowWidth(window.innerWidth);
    });
  }

  onToggleCollapsedNav = () => {
    const {navCollapsed, toggleCollapsedNav} = this.props;
    const val = !navCollapsed;
    toggleCollapsedNav(val);
  };

  render(ctx) {
    const {
      navCollapsed, drawerType, width, navigationStyle
    } = this.props;
    let drawerStyle = 'd-flex';
    if (drawerType.includes(FIXED_DRAWER)) {
      drawerStyle = 'd-xl-flex';
    } else if (drawerType.includes(COLLAPSED_DRAWER)) drawerStyle = '';
    let type = 'permanent';
    if (drawerType.includes(COLLAPSED_DRAWER) || (drawerType.includes(FIXED_DRAWER) && width < 1200)) {
      type = 'temporary';
    }

    if (navigationStyle === HORIZONTAL_NAVIGATION) {
      drawerStyle = '';
      type = 'temporary';
    }
    return (
      <div className={`app-sidebar d-none ${drawerStyle}`}>
        <Drawer
          className="app-sidebar-content"
          variant={type}
          open={type.includes('temporary') ? navCollapsed : true}
          onClose={this.onToggleCollapsedNav}
          classes={{
            paper: 'side-nav',
          }}
        >
          <UserInfo />
          <SidenavContent />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {
    navCollapsed, drawerType, width, navigationStyle
  } = settings;
  return {
    navCollapsed, drawerType, width, navigationStyle
  };
};

export default withRouter(connect(mapStateToProps, {toggleCollapsedNav, updateWindowWidth})(SideNav));
