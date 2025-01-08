import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import LocationTableCell from './LocationTableCell';
import NewUser from './NewUser';
import { getUserLocations } from '../../../../actions/UserLocation';
import LocationDetail from './LocationDetail';

class LocationTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      limit: 10,
      total: 0,
      id_user: 0,
      init: true,
      data: [],
      id: null,
      openDetail: false,
      addNew: false
    };
  }

  componentDidUpdate = async (prevProps) => {
    await this.updateType(prevProps);
  };

  componentDidMount = async () => {
    const {
      id_user, page, limit
    } = this.state;
    await this.refreshList(id_user, page, limit);
  };

  handleChangePage = async (event, page) => {
    const {id_user, limit} = this.state;
    this.setState({page});
    await this.refreshList(id_user, page, limit);
  };

  handleChangeRowsPerPage = async (event) => {
    const {value: limit} = event.target;
    const {id_user} = this.state;
    await this.refreshList(id_user, 0, limit);
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

  handleAddNewModal = () => {
    const { addNew } = this.state;
    this.setState({
      addNew: !addNew
    });
  }

  handleDetail = (id) => {
    if (id) {
      this.setState({id});
    }
  };

  handleRefresh = async () => {
    const {
      id_user, page, limit
    } = this.state;
    await this.refreshList(id_user, page, limit);
  };

  refreshList = async (id_user, page, limit) => {
    const locations = await getUserLocations({
      page: page + 1,
      limit,
      id_user
    });
    if (locations && locations.status) {
      this.setState({
        data: locations.data,
        total: locations.total
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
    const {id_user} = this.props;
    if (id_user !== prevProps.id_user) {
      this.setState({id_user});
      const {page, limit} = this.state;
      await this.refreshList(id_user, page, limit);
    }
  }

  render(ctx) {
    const {
      data, page, limit, total, init, openDetail, id, addNew
    } = this.state;
    let detailComponent = null;
    if (init) {
      return <div>Memuat data...</div>;
    }
    if (isEmpty(data)) {
      return <div>Data tidak tersedia.</div>;
    }

    if (openDetail) {
      detailComponent = (
        <LocationDetail
          id={id}
          openDetail={this.handleOpenDetail}
          refresh={this.handleRefresh}
        />
      );
    } else if (addNew) {
      detailComponent = (
        <NewUser
          refresh={this.handleRefresh}
          openNew={this.handleAddNewModal}
        />
      );
    }
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
            <tr>
              <th>No.</th>
              <th>Nama Lengkap</th>
              <th>Nomor Telepon</th>
              <th>Waktu Dibuat</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <LocationTableCell
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

export default LocationTable;
