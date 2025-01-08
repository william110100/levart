import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';
import { connect } from 'react-redux';
import { userSignIn } from '../../actions';
import { CHIEF_GROUP, SPV_GROUP } from '../../constants/RoleGroup';
import {
  Attendance,
  DailyLog,
  Dashboard, DataMgmt, Location, Member, Panic, Patroli, Report, Static
} from './MenuFragment';

function SidenavContent(props) {
  const { authUser, history } = props;
  const [user] = useState(authUser);
  const [activeLi] = useState(null);
  let menu;

  const closest = (el, selector) => {
    let matchesFn;
    // find vendor prefix
    ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some((fn) => {
      if (typeof document.body[fn] === 'function') {
        matchesFn = fn;
        return true;
      }
      return false;
    });

    let parent;

    // traverse parents
    while (el) {
      parent = el.parentElement;
      if (parent && matchesFn && parent[matchesFn](selector)) {
        return parent;
      }
      // eslint-disable-next-line no-param-reassign
      el = parent;
    }
    return null;
  };

  useEffect(() => {
    const pathname = `${history.location.pathname}`;// get current path

    const menuLi = document.getElementsByClassName('menu');
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function (event) {
        const parentLiEle = closest(this, 'li');
        if (menuLi[i].classList.contains('menu') && parentLiEle !== null) {
          event.stopPropagation();

          if (menuLi[i].classList.contains('open')) {
            menuLi[i].classList.remove('open', 'active');
          } else {
            menuLi[i].classList.add('open', 'active');
          }
        } else {
          for (let j = 0; j < menuLi.length; j++) {
            const parentLi = closest(this, 'li');
            if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
              menuLi[j].classList.remove('open');
            } else if (menuLi[j].classList.contains('open')) {
              menuLi[j].classList.remove('open');
            } else {
              menuLi[j].classList.add('open');
            }
          }
        }
      };
    }

    const activeLi = document.querySelector(`a[href="${pathname}"]`);// select current a element
    const activeNav = closest(activeLi, 'ul'); // select closest ul
    if (activeNav) {
      if (activeNav.classList.contains('sub-menu')) {
        closest(activeNav, 'li')
          .classList
          .add('open');
      } else {
        closest(activeLi, 'li')
          .classList
          .add('open');
      }
    }
  }, [history.location.pathname]);

  useEffect(() => {
    const activeNav = closest(activeLi, 'ul'); // select closest ul
    if (activeNav) {
      if (activeNav.classList.contains('sub-menu')) closest(activeNav, 'li').classList.add('open');
      closest(activeLi, 'li').classList.add('open');
    }
  });
  menu = (
    <>
      <Patroli />
      <Report />
      <Member />
    </>
  );

  // if (SPV_GROUP.includes(user.id_role)) {
  //   menu = (
  //     <>
  //       <Attendance />
  //       <Location />
  //     </>
  //   );
  // } else if (CHIEF_GROUP.includes(user.id_role)) {
  //   menu = (
  //     <>
  //       <Attendance />
  //       <Location />
  //     </>
  //   );
  // } else {
  //   menu = (
  //     <>
  //       <Dashboard />
  //       <Panic />
  //       <Report />
  //       <DailyLog />
  //       <DataMgmt />
  //       <Attendance />
  //       <Member />
  //       <Location />
  //       <Static />
  //     </>
  //   );
  // }

  return (
    <CustomScrollbars className=" scrollbar">
      <ul className="nav-menu">
        <li className="nav-header">
          <IntlMessages id="sidebar.main" />
        </li>
        {menu}
      </ul>
    </CustomScrollbars>
  );
}

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

export default withRouter(connect(mapStateToProps, { userSignIn })(SidenavContent));
