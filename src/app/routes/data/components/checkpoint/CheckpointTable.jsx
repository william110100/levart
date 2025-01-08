import React, { useEffect, useState } from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { isEmpty } from 'lodash';
import Button from '@material-ui/core/Button';
import TableCell from './TableCell';
import { getCheckpoints } from '../../../../../actions/Checkpoint';
import Detail from './Detail';

function CheckpointTable() {
  const [id, setId] = useState(null);
  const [init, setInit] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  let detailComponent = null;

  const handleOpenDetail = () => {
    setOpenDetail(!openDetail);
  };

  const handleAddNewModal = () => {
    setId(null);
    setOpenDetail(!openDetail);
  };

  const handleDetail = (id) => {
    if (id) {
      setId(id);
    }
  };

  const refreshList = async (page, limit) => {
    const { data, total, status } = await getCheckpoints({
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
    await refreshList(page, limit);
  };

  const handleChangeRowsPerPage = async (event) => {
    const { value: limit } = event.target;
    await refreshList(0, limit);
    setPage(0);
    setLimit(limit);
  };

  const handleRefresh = async () => {
    await refreshList(page, limit);
  };

  useEffect(() => {
    async function fetchData() {
      await refreshList(page, limit);
    }

    fetchData();
  }, [page, limit]);

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
            <th>Nama</th>
            <th>Koordinat Garis Lintang</th>
            <th>Koordinat Garis Bujur</th>
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
      <div className="jr-btn-group">
        <Button variant="contained" color="primary" onClick={handleAddNewModal} className="jr-btn text-white">
          <i className="zmdi zmdi-plus zmdi-hc-fw" />
          <span>Tambah Terminal</span>
        </Button>
      </div>
      {detailComponent}
    </div>
  );
}

export default CheckpointTable;
