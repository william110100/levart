import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import PoiTableCell from './PoiTableCell';
import { getPois } from '../../../../actions/Poi';
import PoiDetail from './PoiDetail';
import NewPOIDetail from './NewPOIDetail';

class PoiTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      limit: 10,
      total: 0,
      type: 0,
      init: true,
      data: [],
      poi_id: null,
      openDetail: false,
      addNew: false
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

  handleDetail = (poi_id) => {
    if (poi_id) {
      this.setState({ poi_id });
    }
  };

  handleAddNewModal = () => {
    const { addNew } = this.state;
    this.setState({
      addNew: !addNew
    });
  }

  handleRefresh = async () => {
    const { type, page, limit } = this.state;
    await this.refreshList(type, page, limit);
  };

  refreshList = async (type, page, limit) => {
    const pois = await getPois({ type, page: page + 1, limit });
    if (pois) {
      this.setState({
        data: pois.data,
        total: pois.total
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
      data, page, limit, total, init, openDetail, poi_id, addNew
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
        <PoiDetail
          poi_id={poi_id}
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
              <th>Name</th>
              <th>Phone No</th>
              <th>Last Updated At</th>
              <th className="status-cell text-right">Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <PoiTableCell
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
          <Button variant="contained" color="primary" onClick={this.handleAddNewModal} className="jr-btn text-white">
            <i className="zmdi zmdi-plus zmdi-hc-fw" />
            <span>Add new POI</span>
          </Button>
        </div>
        {detailComponent}
        <NewPOIDetail
          openAddNew={this.handleAddNewModal}
          open={addNew}
          refresh={this.handleRefresh}
        />
      </div>
    );
  }
}

export default PoiTable;
