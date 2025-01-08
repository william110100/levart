import React, { useEffect, useState } from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { isEmpty } from 'lodash';
import Button from '@material-ui/core/Button';
import { getSchedule } from '../../../../actions/PatroliSchedule';
import ShiftDetail from './ShiftDetail';
import ShiftTableCell from './ShiftTableCell';
import UploadShift from './UploadShift';

function PatroliShiftTable(props) {
  const { start_date, end_date, id_user } = props;
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [init, setInit] = useState(true);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [addNew, setAddNew] = useState(false);
  let detailComponent = null;

  const handleOpenDetail = () => {
    setOpenDetail(!openDetail);
  };

  const handleAddNewModal = () => {
    setAddNew(!addNew);
  };

  const handleDetail = (id) => {
    if (id) {
      setId(id);
    }
  };

  const refreshList = async ({ start_date, end_date, id_user }, page, limit) => {
    const { data, total, status } = await getSchedule({
      id_user,
      start_date,
      end_date,
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
    await refreshList({ start_date, end_date, id_user }, page, limit);
  };

  const handleChangeRowsPerPage = async (event) => {
    const { value: limit } = event.target;
    await refreshList({ start_date, end_date, id_user }, 0, limit);
    setPage(0);
    setLimit(limit);
  };

  const handleRefresh = async () => {
    await refreshList({ start_date, end_date, id_user }, page, limit);
  };

  useEffect(() => {
    async function fetchData() {
      await refreshList({ start_date, end_date, id_user }, page, limit);
    }

    fetchData();
  }, [start_date, end_date, id_user, page, limit]);

  if (openDetail) {
    detailComponent = (
      <ShiftDetail
        id={id}
        openDetail={handleOpenDetail}
        refresh={handleRefresh}
      />
    );
  } else if (addNew) {
    detailComponent = (
      <UploadShift
        refresh={handleRefresh}
        openNew={handleAddNewModal}
      />
    );
  }

  if (init) {
    return <div>Memuat data...</div>;
  }
  if (isEmpty(data)) {
    return (
      <div>
        <div>Data tidak tersedia.</div>
        <div className="jr-btn-group">
          <Button variant="contained" color="primary" onClick={handleAddNewModal} className="jr-btn text-white">
            <i className="zmdi zmdi-plus zmdi-hc-fw" />
            <span>Unggah Penjadwalan Shift</span>
          </Button>
        </div>
        {detailComponent}
      </div>
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
            <th>Tanggal</th>
            <th>Route</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <ShiftTableCell
              key={data.id}
              data={data}
              number={page * limit + (index + 1)}
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
      <div className="jr-btn-group">
        <Button variant="contained" color="primary" onClick={handleAddNewModal} className="jr-btn text-white">
          <i className="zmdi zmdi-plus zmdi-hc-fw" />
          <span>Unggah Penjadwalan Shift</span>
        </Button>
      </div>
      {detailComponent}
    </div>
  );
}

export default PatroliShiftTable;
