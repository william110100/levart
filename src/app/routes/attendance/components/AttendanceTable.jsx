import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import Button from '@material-ui/core/Button';
import { getAttendanceShift } from '../../../../actions/AttendanceShift';
import Detail from './Detail';
import GeneralTableCell from './GeneralTableCell';
import {
  PRESENT, ABSENCE, OFF, PERMIT
} from '../../../../constants/ShiftTypeColor';
import './style.css';
import { CountSummaryAttendance } from '../SummaryAttendanceHelper';

const generalAttendance = '1,2,3,4,7';

function AttendanceTable(props) {
  const {
    start_date, end_date, idUser, idCheckpoint
  } = props;
  const [page] = useState(0);
  const [limit] = useState(1000);
  const [init, setInit] = useState(true);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  let detailComponent = null;
  let exportButton = null;
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsence, setTotalAbsence] = useState(0);
  const [totalPermit, setTotalPermit] = useState(0);
  const [totalOff, setTotalOff] = useState(0);

  const handleOpenDetail = () => {
    setOpenDetail(!openDetail);
  };

  const handleDetail = (id) => {
    if (id) {
      setId(id);
    }
  };

  const refreshList = async ({
    start_date, end_date, idUser, idCheckpoint
  }, page, limit) => {
    const { data, status } = await getAttendanceShift({
      id_type: generalAttendance,
      start_date,
      end_date,
      id_user: idUser,
      id_checkpoint: idCheckpoint,
      page: page + 1,
      limit
    });
    if (status) {
      const {
        present, absent, permit, off
      } = CountSummaryAttendance(data);
      setTotalPresent(present);
      setTotalPermit(permit);
      setTotalAbsence(absent);
      setTotalOff(off);

      setData(data);
      setInit(false);
    } else {
      setData([]);
      setInit(false);
    }
  };

  const handleRefresh = async () => {
    await refreshList({
      start_date, end_date, idUser, idCheckpoint
    }, page, limit);
  };

  const handleExportCSV = async () => {
    // eslint-disable-next-line no-restricted-globals
    open(`/api/attendances/export/csv?types=${generalAttendance}&start_date=${start_date}&end_date=${end_date}&id_checkpoint=${idCheckpoint}`, '_blank');
  };

  useEffect(() => {
    async function fetchData() {
      await refreshList({
        start_date, end_date, idUser, idCheckpoint
      }, page, limit);
    }

    fetchData();
  }, [start_date, end_date, idUser, idCheckpoint, page, limit]);

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

  if (!isEmpty(data)) {
    exportButton = (
      <div className="jr-btn-group">
        <Button variant="contained" color="primary" onClick={handleExportCSV} className="jr-btn text-white">
          <span>Export ke CSV</span>
        </Button>
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
            <th>Tipe Kehadiran</th>
            <th>Terminal</th>
            <th>Waktu Mulai</th>
            <th>Waktu Selesai</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <GeneralTableCell
              key={data.id}
              data={data}
              number={page * limit + (index + 1)}
              openDetail={handleOpenDetail}
              onDetailClick={handleDetail}
          />
          ))}
        </tbody>
      </table>
      <br />
      <div>
        Keterangan:
        <br />
        <div className="legendBox" style={PRESENT.style} />
        {' '}
        {totalPresent}
        {' '}
        Hadir
        <br />
        <div className="legendBox" style={ABSENCE.style} />
        {' '}
        {totalAbsence}
        {' '}
        Tidak Hadir
        <br />
        <div className="legendBox" style={OFF.style} />
        {' '}
        {totalOff}
        {' '}
        Off
        <br />
        <div className="legendBox" style={PERMIT.style} />
        {' '}
        {totalPermit}
        {' '}
        Cuti
      </div>
      <br />
      { exportButton }
      { detailComponent }
    </div>
  );
}

export default AttendanceTable;
