import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {getAttendanceShift} from '../../../../../actions/AttendanceShift';
import {
  PRESENT, ABSENCE, OFF, PERMIT
} from '../../../../../constants/ShiftTypeColor';
import '../style.css';
import DetailTableCell from './DetailTableCell';
import { CountSummaryAttendance } from '../../SummaryAttendanceHelper';

function DetailUserMonthlyAttendance(props) {
  const {
    openDetail, id_user, start_date, end_date
  } = props;
  const [page] = useState(1);
  const [limit] = useState(1000);
  const [init, setInit] = useState(true);
  const [detail, setDetail] = useState(null);
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsence, setTotalAbsence] = useState(0);
  const [totalPermit, setTotalPermit] = useState(0);
  const [totalOff, setTotalOff] = useState(0);

  let dialogContent;
  let footerAction;

  useEffect(() => {
    async function fetchData() {
      const {data, status} = await getAttendanceShift({
        id_user, start_date, end_date, page, limit
      });
      if (status) {
        const {
          present, absent, permit, off
        } = CountSummaryAttendance(data);
        setTotalPresent(present);
        setTotalPermit(permit);
        setTotalAbsence(absent);
        setTotalOff(off);

        setDetail(data);
      } else {
        setDetail([]);
      }
      setInit(false);
    }
    fetchData();
  }, [id_user, start_date, end_date, page, limit]);

  const handleRequestClose = () => {
    openDetail(false);
  };

  if (init) {
    dialogContent = <DialogContent>Memuat data detail...</DialogContent>;
    footerAction = <></>;
  } else {
    footerAction = (
      <DialogActions>
        <Button onClick={handleRequestClose} color="default">
          Tutup
        </Button>
      </DialogActions>
    );
    dialogContent = (
      <DialogContent>
        <div className="table-responsive-material">
          <table className="default-table table-unbordered table table-xl table-hover">
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
              {detail.map((d, index) => (
                <DetailTableCell
                  key={d.id}
                  data={d}
                  number={index + 1}
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
        </div>
      </DialogContent>
    );
  }

  return (
    <Dialog
      open
      TransitionComponent={Slide}
      onClose={handleRequestClose}
      maxWidth="xl"
        >
      <DialogTitle>Detail Kehadiran Bulanan</DialogTitle>
      {dialogContent}
      {footerAction}
    </Dialog>
  );
}

export default DetailUserMonthlyAttendance;
