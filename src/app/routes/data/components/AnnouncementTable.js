import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AnnouncementTableCell from './AnnouncementTableCell';
import { getAnnouncements } from '../../../../actions/Announcement';
import AnnouncementDetail from './AnnouncementDetail';

class AnnouncementTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      limit: 10,
      total: 0,
      init: true,
      data: [],
      id: null,
      openDetail: false
    };
  }

  componentDidUpdate = async (prevProps) => {
    await this.updateType(prevProps);
  };

  componentDidMount = async () => {
    const { type, page, limit } = this.state;
    await this.refreshList(type, page, limit);
  };

  handleChangePage = async (event, page) => {
    const { type, limit } = this.state;
    this.setState({ page });
    await this.refreshList(type, page, limit);
  };

  handleChangeRowsPerPage = async (event) => {
    const { value: limit } = event.target;
    const { type } = this.state;
    await this.refreshList(type, 1, limit);
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

  handleDetail = (id) => {
    if (id) {
      this.setState({ id });
    }
  };

  handleRefresh = async () => {
    const { type, page, limit } = this.state;
    await this.refreshList(type, page, limit);
  };

  refreshList = async (type, page, limit) => {
    const announcements = await getAnnouncements({ type, page: page + 1, limit });
    if (announcements) {
      this.setState({
        data: announcements.data,
        total: announcements.total
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

  async updateType(prevProps) {
    const { type } = this.props;
    if (type !== prevProps.type) {
      this.setState({ type });
      const { page, limit } = this.state;
      await this.refreshList(type, page, limit);
    }
  }

  render(ctx) {
    const {
      data, page, limit, total, init, openDetail, id
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
        <AnnouncementDetail
          id={id}
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
              <th>Announcement Title</th>
              <th>Created By</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <AnnouncementTableCell
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
        <div className="jr-btn-group">
          <Button variant="contained" color="primary" onClick={this.handleOpenDetail} className="jr-btn text-white">
            <i className="zmdi zmdi-plus zmdi-hc-fw" />
            <span>Add new announcement</span>
          </Button>
        </div>
        {detailComponent}
      </div>
    );
  }
}

export default AnnouncementTable;
