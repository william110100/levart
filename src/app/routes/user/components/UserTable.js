import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import UserTableCell from './UserTableCell';
import UserDetail from './UserDetail';
import { searchUsers } from '../../../../actions/User';
import NewUser from './NewUser';

function UserTable(props) {
  const {id_role, id_checkpoint, full_name} = props;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [init, setInit] = useState(true);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [addNew, setAddNew] = useState(false);
  let detailComponent = null;

  const refreshList = async ({
    id_role, id_checkpoint, full_name, page, limit
  }) => {
    const users = await searchUsers({
      id_role,
      id_checkpoint,
      full_name,
      page: page + 1,
      limit
    });
    if (users && users.status) {
      setData(users.data);
      setTotal(users.total);
    } else {
      setData(null);
      setTotal(0);
    }
    setInit(false);
  };

  useEffect(() => {
    (async () => {
      await refreshList({
        id_role, id_checkpoint, full_name, page, limit
      });
    })();
  }, [id_role, id_checkpoint, full_name, page, limit]);

  const handleChangePage = async (event, page) => {
    setPage(page);
    await refreshList({
      id_role, full_name, page, limit
    });
  };

  const handleChangeRowsPerPage = async (event) => {
    const {value: limit} = event.target;
    await refreshList({ id_role, page: 0, limit });
    setPage(0);
    setLimit(limit);
  };

  const handleOpenDetail = () => {
    setOpenDetail(!openDetail);
  };

  const handleAddNewModal = () => {
    setAddNew(!addNew);
  };

  const handleDetail = (id) => {
    if (id) setId(id);
  };

  const handleRefresh = async () => {
    await refreshList({
      id_role, full_name, page, limit
    });
  };

  if (init) {
    return <div>Memuat data...</div>;
  }
  if (isEmpty(data)) {
    return <div>Data tidak tersedia.</div>;
  }

  if (openDetail) {
    detailComponent = (
      <UserDetail
        id={id}
        openDetail={() => setOpenDetail(!openDetail)}
        refresh={handleRefresh}
      />
    );
  } else if (addNew) {
    detailComponent = (
      <NewUser
        refresh={handleRefresh}
        openNew={handleAddNewModal}
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
            <th>Wewenang</th>
            <th>Waktu Dibuat</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <UserTableCell
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
          <span>Tambah Anggota</span>
        </Button>
      </div>
      {detailComponent}
    </div>
  );
}

export default UserTable;
