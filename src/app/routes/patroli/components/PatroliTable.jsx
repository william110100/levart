import React, {useState, useEffect} from 'react';
import {isEmpty} from 'lodash';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PatroliTableCell from './PatroliTableCell';
import PatroliDetail from './PatroliDetail';
import { getPatroli } from '../../../../actions/Patroli';

function PatroliTable(props) {
  const {fullName} = props;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState(0);
  const [init, setInit] = useState(true);
  const [data, setData] = useState([]);
  const [patroliId, setPatroliId] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const refreshList = async (fullName, page, limit) => {
    const members = await getPatroli({
      full_name: fullName,
      page: page + 1,
      limit
    });
    if (members && members.status) {
      setData(members.data);
      setTotal(members.total);
    } else {
      setData(null);
      setTotal(0);
    }
    setInit(false);
  };

  useEffect(() => {
    async function getData() {
      await refreshList(fullName, page, limit);
    }
    getData();
  }, [fullName, page, limit]);

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

  const handleDetail = (patroli_id) => {
    if (patroli_id) {
      setPatroliId(patroli_id);
    }
  };

  const handleRefresh = async () => {
    await this.refreshList(fullName, page, limit);
  };

  let content = <div>Preparing data...</div>;
  if (init) { content = <div>Preparing data...</div>; } else if (isEmpty(data)) { content = <div>Data not available.</div>; } else {
    content = (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
            <tr>
              <th>No.</th>
              <th>Full Name</th>
              <th>Kendaraan</th>
              <th>Rute</th>
              <th>Waktu Dibuat</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <PatroliTableCell
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
        <PatroliDetail
          patroli_id={patroliId}
          openDetail={handleOpenDetail}
          open={openDetail}
          refresh={handleRefresh}
    />
      </div>
    );
  }

  return content;
}

export default PatroliTable;
