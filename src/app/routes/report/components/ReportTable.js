import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ReportTableCell from './ReportTableCell';
import { getReports } from '../../../../actions/Report';
import ReportDetail from './ReportDetail';
import { messaging } from '../../../../libraries/init-fcm';
import { updateMyAdmin } from '../../../../actions/Admin';

class ReportTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      limit: 10,
      total: 0,
      type: 0,
      status: 0,
      init: true,
      data: [],
      report_id: null,
      openDetail: false
    };
  }

  componentDidUpdate = async (prevProps) => {
    await this.updateType(prevProps);
    await this.updateStatus(prevProps);
    await this.attachNotification();
  };

  componentDidMount = async () => {
    const {
      type, status, page, limit
    } = this.state;
    await this.refreshList(type, status, page, limit);
  };

  handleChangePage = async (event, page) => {
    const { type, status, limit } = this.state;
    this.setState({ page });
    await this.refreshList(type, status, page, limit);
  };

  handleChangeRowsPerPage = async (event) => {
    const { value: limit } = event.target;
    const { type, status } = this.state;
    await this.refreshList(type, status, 0, limit);
    this.setState({
      page: 0,
      limit
    });
  };

  handleOpenDetail = () => {
    const { openDetail } = this.state;
    this.setState({
      openDetail: !openDetail
    });
  };

  handleDetail = (report_id) => {
    if (report_id) {
      this.setState({ report_id });
    }
  };

  handleRefresh = async () => {
    const {
      type, status, page, limit
    } = this.state;
    await this.refreshList(type, status, page, limit);
  };

  refreshList = async (type, status, page, limit) => {
    const reports = await getReports({
      type,
      status,
      page: page + 1,
      limit
    });
    if (reports && reports.status) {
      this.setState({
        data: reports.data,
        total: reports.total
      });
    } else {
      this.setState({
        data: null,
        total: 0
      });
    }
    this.setState({
      init: false
    });
  };

  attachNotification = async () => {
    navigator.serviceWorker.addEventListener('message', ({data}) => {
      const {notification} = data.firebaseMessaging.payload;
      if (notification.title === 'Report') this.handleRefresh();
    });
    try {
      const token = await messaging.getToken();
      await updateMyAdmin({
        fcm_token: token
      });
    } catch (error) {
      if (error.code === 'messaging/token-unsubscribe-failed') {
        await this.attachNotification();
      } else console.error('Err::', error);
    }

    messaging.onTokenRefresh(async () => {
      try {
        const token = await messaging.getToken();
        await updateMyAdmin({
          fcm_token: token
        });
      } catch (error) {
        if (error.code === 'messaging/token-unsubscribe-failed') {
          await this.attachNotification();
        } else {
          console.error('Err::', error);
        }
      }
    });
    messaging.onMessage((payload) => {
      const {notification} = payload;
      if (notification.title === 'Report') this.handleRefresh();
    });
  }

  async updateType(prevProps) {
    const { type } = this.props;
    if (type !== prevProps.type) {
      this.setState({ type });
      const { status, page, limit } = this.state;
      await this.refreshList(type, status, page, limit);
    }
  }

  async updateStatus(prevProps) {
    const { status } = this.props;
    if (status !== prevProps.status) {
      this.setState({ status });
      const { type, page, limit } = this.state;
      await this.refreshList(type, status, page, limit);
    }
  }

  render(ctx) {
    const {
      data, page, limit, total, init, openDetail, report_id
    } = this.state;
    let detailComponent = null;
    if (init) {
      return <div>Preparing data...</div>;
    }
    if (isEmpty(data)) {
      return <div>Data not available.</div>;
    }

    if (openDetail) {
      detailComponent = (
        <ReportDetail
          report_id={report_id}
          openDetail={this.handleOpenDetail}
          refresh={this.handleRefresh}
        />
      );
    }
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
            <tr>
              <th>No.</th>
              <th>Creator</th>
              <th>Reported At</th>
              <th>Report Type</th>
              <th className="status-cell text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <ReportTableCell
                key={data.id}
                data={data}
                number={page * limit + (index + 1)}
                openDetail={this.handleOpenDetail}
                onDetailClick={this.handleDetail}
              />
            ))}
          </tbody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={total}
                rowsPerPage={limit}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </table>
        {detailComponent}
      </div>
    );
  }
}

export default ReportTable;
