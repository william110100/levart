import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableCell from './TableCell';
import Detail from './Detail';
import { getDailyLogs } from '../../../../actions/DailyLog';

function DailyLogTable(props) {
  const { start_date, end_date } = props;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [init, setInit] = useState(true);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  let detailComponent = null;

  const handleOpenDetail = () => {
    setOpenDetail(!openDetail);
  };

  const handleDetail = (id) => {
    setId(id);
  };

  const refreshList = async (start_date, end_date, page, limit) => {
    const { data, total } = await getDailyLogs({
      start_date,
      end_date,
      page: page + 1,
      limit
    });
    setTotal(total);
    setData(data);
    setInit(false);
  };

  useEffect(() => {
    const { start_date, end_date } = props;

    async function fetchData() {
      await refreshList(start_date, end_date, page, limit);
    }

    fetchData();
  }, [props, limit, page]);

  const handleRefresh = async () => {
    await refreshList(start_date, end_date, page, limit);
  };

  const handleChangePage = async (event, page) => {
    setPage(page);
    await refreshList(start_date, end_date, page, limit);
  };

  const handleChangeRowsPerPage = async (event) => {
    const { value: limit } = event.target;

    await refreshList(start_date, end_date, 0, limit);
    setPage(0);
    setLimit(limit);
  };

  if (init) {
    return (<div>Memuat data...</div>);
  }
  if (isEmpty(data)) {
    return (<div>Data tidak tersedia.</div>);
  }

  if (openDetail) {
    detailComponent = (
      <Detail
        id={id}
        openDetail={handleOpenDetail}
        refresh={handleRefresh}
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
            <th>Judul Laporan</th>
            <th>Waktu Dibuat</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <TableCell
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
      {detailComponent}
    </div>
  );
}

export default DailyLogTable;
