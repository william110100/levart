import React, {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import Button from '@material-ui/core/Button';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import qs from 'query-string';
import HarianTableCell from './HarianTableCell';
import HarianDetail from './HarianDetail';
import { getDailyLogs } from '../../../../../actions/DailyLog';

function HarianTable(props) {
  const {fullName, startDate, endDate} = props;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [init, setInit] = useState(true);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  let exportButton = null;

  const handleChangePage = async (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = async (event) => {
    const {value: limit} = event.target;
    setPage(0);
    setLimit(limit);
  };

  const handleOpenDetail = () => {
    setOpenDetail(!openDetail);
  };

  const handleDetail = (id) => {
    if (id) {
      setId(id);
    }
  };

  const handleRefresh = async () => {
    const {
      full_name, page, limit
    } = this.state;
    await this.refreshList(full_name, page, limit);
  };

  const refreshList = async (full_name, start_date, end_date, page, limit) => {
    const logs = await getDailyLogs({
      full_name,
      start_date,
      end_date,
      page: page + 1,
      limit
    });
    if (logs && logs.status) {
      setData(logs.data);
      setTotal(logs.total);
    } else {
      setData(null);
      setTotal(0);
    }
    setInit(false);
  };

  const handleExportCSV = async () => {
    const qsObject = {
      start_date: startDate,
      end_date: endDate
    };
    if (fullName) qsObject.full_name = fullName;
    const query = qs.stringify(qsObject);
    // eslint-disable-next-line no-restricted-globals
    open(`/api/daily-logs/export/csv?${query}`, '_blank');
  };

  const handleExportXLSX = async () => {
    let url = `/api/daily-logs/export/xlsx?start_date=${startDate}&end_date=${endDate}`;
    if (fullName) url += `&full_name=${fullName}`;
    // eslint-disable-next-line no-restricted-globals
    open(url, '_blank');
  };

  useEffect(() => {
    async function getData() {
      await refreshList(fullName, startDate, endDate, page, limit);
    }
    getData();
  }, [fullName, startDate, endDate, page, limit]);

  if (!isEmpty(data)) {
    exportButton = (
      <div className="jr-btn-group">
        <Button variant="contained" color="primary" onClick={handleExportCSV} className="jr-btn text-white">
          <span>Export ke CSV</span>
        </Button>
        <Button variant="contained" color="primary" onClick={handleExportXLSX} className="jr-btn text-white">
          <span>Export ke XLSX</span>
        </Button>
      </div>
    );
  } else {
    exportButton = null;
  }

  let content = <div>Preparing data...</div>;
  if (init) { content = <div>Preparing data...</div>; } else if (isEmpty(data)) { content = <div>Data not available.</div>; } else {
    content = (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
            <tr>
              <th>No.</th>
              <th>Pembuat</th>
              <th>Waktu Dibuat</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <HarianTableCell
                key={data.id}
                data={data}
                number={page * limit + (index + 1)}
                openDetail={handleOpenDetail}
                onDetailClick={handleDetail}
        />
            ))}
          </tbody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={total}
                rowsPerPage={limit}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
        />
            </TableRow>
          </TableFooter>
        </table>
        { exportButton }
        <HarianDetail
          id={id}
          openDetail={handleOpenDetail}
          open={openDetail}
          refresh={handleRefresh}
  />
      </div>
    );
  }

  return content;
}

export default HarianTable;
