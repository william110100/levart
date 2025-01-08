import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import PanicTableCell from './PanicTableCell';
import { getPanics } from '../../../../actions/Panic';
import PanicDetail from './PanicDetail';
import { messaging } from '../../../../libraries/init-fcm';
import { updateMyAdmin } from '../../../../actions/Admin';
import siren from '../../../../assets/sounds/warning-siren.wav';

class PanicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      limit: 10,
      total: 0,
      status: 0,
      init: true,
      data: [],
      panic_id: null,
      openDetail: false
    };
  }

  componentDidUpdate = async (prevProps) => {
    await this.updateStatus(prevProps);
  };

  componentDidMount = async () => {
    const {
      status, page, limit
    } = this.state;
    await this.refreshList(status, page, limit);
    await this.attachNotification();
  };

  handleChangePage = async (event, page) => {
    const { status, limit } = this.state;
    this.setState({ page });
    await this.refreshList(status, page, limit);
  };

  handleChangeRowsPerPage = async (event) => {
    const { value: limit } = event.target;
    const { status } = this.state;
    await this.refreshList(status, 0, limit);
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

  handleDetail = (panic_id) => {
    if (panic_id) {
      this.setState({ panic_id });
    }
  };

  handleRefresh = async () => {
    const {
      status, page, limit
    } = this.state;
    await this.refreshList(status, page, limit);
  };

  handleExportCSV = async () => {
    const { status } = this.state;
    // eslint-disable-next-line no-restricted-globals
    if (status !== 0) open(`/api/panics/export/csv?status=${status}`, '_blank');
    // eslint-disable-next-line no-restricted-globals
    else open('/api/panics/export/csv', '_blank');
  }

  refreshList = async (status, page, limit) => {
    const panics = await getPanics({
      status,
      page: page + 1,
      limit
    });
    if (panics && panics.status) {
      this.setState({
        data: panics.data,
        total: panics.total
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
    const audioController = {
      dom: document.getElementById('audio-sirene'),
      isFirstLoad: true
    };
    navigator.serviceWorker.addEventListener('message', ({ data }) => {
      const { notification } = data;
      if (notification.title === 'Panic') {
        this.handleRefresh();
        audioController.dom.play().then(() => {
        }).catch((error) => {
          console.error('on play audio', error);
        });
      }
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
      const { notification } = payload;
      if (notification.title === 'Panic') this.handleRefresh();
    });
  };

  async updateStatus(prevProps) {
    const { status } = this.props;
    if (status !== prevProps.status) {
      this.setState({ status });
      const { page, limit } = this.state;
      await this.refreshList(status, page, limit);
    }
  }

  render(ctx) {
    const {
      data, page, limit, total, init, openDetail, panic_id
    } = this.state;
    let detailComponent = null;
    let exportButton = null;
    if (init) {
      return <div>Memuat data...</div>;
    }
    if (isEmpty(data)) {
      return <div>Data tidak tersedia.</div>;
    }

    if (!isEmpty(data)) {
      exportButton = (
        <div className="jr-btn-group">
          <Button variant="contained" color="primary" onClick={this.handleExportCSV} className="jr-btn text-white">
            <span>Export ke CSV</span>
          </Button>
        </div>
      );
    }

    if (openDetail) {
      detailComponent = (
        <PanicDetail
          panic_id={panic_id}
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
              <th>Diminta Oleh</th>
              <th>Waktu Kejadian</th>
              <th className="status-cell text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <PanicTableCell
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
        { exportButton }
        {detailComponent}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio id="audio-sirene">
          <source src={siren} type="audio/wav" />
        </audio>
      </div>
    );
  }
}

export default PanicTable;
