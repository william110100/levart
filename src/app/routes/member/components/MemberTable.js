import React, {Component} from 'react';
import {isEmpty} from 'lodash';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MemberTableCell from './MemberTableCell';
import MemberDetail from './MemberDetail';
import {getMembers} from '../../../../actions/Member';

class MemberTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      limit: 10,
      total: 0,
      type: 0,
      init: true,
      data: [],
      member_id: null,
      openDetail: false
    };
  }

  componentDidUpdate = async (prevProps) => {
    await this.updateType(prevProps);
  };

  componentDidMount = async () => {
    const {
      type, page, limit
    } = this.state;
    await this.refreshList(type, page, limit);
  };

  handleChangePage = async (event, page) => {
    const {type, status, limit} = this.state;
    this.setState({page});
    await this.refreshList(type, status, page, limit);
  };

  handleChangeRowsPerPage = async (event) => {
    const {value: limit} = event.target;
    const {type, status} = this.state;
    await this.refreshList(type, status, 0, limit);
    this.setState({
      page: 0,
      limit
    });
  };

  handleOpenDetail = () => {
    const {openDetail} = this.state;
    this.setState({
      openDetail: !openDetail
    });
  };

  handleDetail = (member_id) => {
    if (member_id) {
      this.setState({member_id});
    }
  };

  handleRefresh = async () => {
    const {
      type, status, page, limit
    } = this.state;
    await this.refreshList(type, status, page, limit);
  };

  refreshList = async (type, page, limit) => {
    const members = await getMembers({
      type,
      page: page + 1,
      limit
    });
    if (members && members.status) {
      this.setState({
        data: members.data,
        total: members.total
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
    const {type} = this.props;
    if (type !== prevProps.type) {
      this.setState({type});
      const {status, page, limit} = this.state;
      await this.refreshList(type, status, page, limit);
    }
  }

  render(ctx) {
    const {
      data, page, limit, total, init, openDetail, member_id
    } = this.state;
    if (init) {
      return <div>Preparing data...</div>;
    }
    if (isEmpty(data)) {
      return <div>Data not available.</div>;
    }
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
            <tr>
              <th>No.</th>
              <th>Full Name</th>
              <th>Phone No</th>
              <th>Email</th>
              <th>Registered At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <MemberTableCell
                key={data.uid}
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
        <MemberDetail
          user_id={member_id}
          openDetail={this.handleOpenDetail}
          open={openDetail}
          refresh={this.handleRefresh}
        />
      </div>
    );
  }
}

export default MemberTable;
