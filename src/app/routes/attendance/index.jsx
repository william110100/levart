import React from 'react';
import {Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';
import Error404 from '../../../components/Error404';

class Attendance extends React.Component {

  render() {
    const {match} = this.props;
    return (
      <div className="app-wrapper">
        <Switch>
          <Route path={`${match.url}/harian`} component={asyncComponent(() => import('./routes/Attendance'))} />
          <Route path={`${match.url}/bulanan`} component={asyncComponent(() => import('./routes/AttendanceMonthly'))} />
          <Route path={`${match.url}/lainnya`} component={asyncComponent(() => import('./routes/AttendanceOther'))} />
          <Route path={`${match.url}/shift`} component={asyncComponent(() => import('./routes/AttendanceShift'))} />
          <Route path={`${match.url}/statistik`} component={asyncComponent(() => import('./routes/AttendanceStatistic'))} />
          <Route component={asyncComponent(() => Error404)} />
        </Switch>
      </div>
    );
  }

}

export default Attendance;
