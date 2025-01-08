import React, { useEffect, useState } from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { isEmpty } from 'lodash';
import TableCell from './TableCell';
import { getAttendances } from '../../../../actions/Attendance';
import Detail from './Detail';

function AttendanceOtherTable(props) {
  const {
    types, start_date, end_date, idUser
  } = props;
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [init, setInit] = useState(true);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  let detailComponent = null;

  const handleOpenDetail = () => {
    setOpenDetail(!openDetail);
  };

  const handleDetail = (id) => {
    if (id) {
      setId(id);
    }
  };

  const refreshList = async ({
    types, start_date, end_date, idUser
  }, page, limit) => {
    const { data, total, status } = await getAttendances({
      types,
      start_date,
      end_date,
      id_user: idUser,
      page: page + 1,
      limit
    });
    if (status) {
      setData(data);
      setTotal(total);
      setInit(false);
    } else {
      setData([]);
      setTotal(0);
      setInit(false);
    }
  };

  const handleChangePage = async (event, page) => {
    setPage(page);
    await refreshList({
      types, start_date, end_date, idUser
    }, page, limit);
  };

  const handleChangeRowsPerPage = async (event) => {
    const { value: limit } = event.target;
    await refreshList({
      types, start_date, end_date, idUser
    }, 0, limit);
    setPage(0);
    setLimit(limit);
  };

  const handleRefresh = async () => {
    await refreshList({
      types, start_date, end_date, idUser
    }, page, limit);
  };

  useEffect(() => {
    async function fetchData() {
      await refreshList({
        types, start_date, end_date, idUser
      }, page, limit);
    }

    fetchData();
  }, [types, start_date, end_date, idUser, page, limit]);

  if (init) {
    return <div>Memuat data...</div>;
  }
  if (isEmpty(data)) {
    return <div>Data tidak tersedia.</div>;
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
            <th>ID User</th>
            <th>Nama Lengkap</th>
            <th>Tipe Kehadiran</th>
            <th>Status</th>
            <th>Waktu Mulai</th>
            <th>Waktu Selesai</th>
            <th>Total Lembur</th>
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

export default AttendanceOtherTable;
