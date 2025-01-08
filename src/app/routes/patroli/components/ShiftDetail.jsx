import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import moment from 'moment-timezone';
import { fullTime, onlyDate } from '../../../../util/TimeConverter';
import { detailShift } from '../../../../actions/AttendanceSchedule';

function ShiftDetail(props) {
  const { openDetail, id } = props;
  const [init, setInit] = useState(true);
  const [detail, setDetail] = useState(null);
  let dialogContent;

  useEffect(() => {
    async function fetchData() {
      const detail = await detailShift(id);
      setDetail(detail);
      setInit(false);
    }
    fetchData();
  }, [id]);

  const handleRequestClose = () => {
    openDetail(false);
  };

  if (init) {
    dialogContent = <DialogContent>Memuat data detail...</DialogContent>;
  } else {
    const {
      id_user, user, date, time_start, time_end, created_by, created_at, updated_at
    } = detail;

    dialogContent = (
      <DialogContent>
        <form className="row" noValidate autoComplete="off">
          <div className="col-12 col-lg-6">
            <TextField
              id="id"
              name="id"
              label="ID MS"
              value={id_user}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          <div className="col-12 col-lg-6">
            <TextField
              id="full_name"
              label="Nama Lengkap"
              name="full_name"
              value={user.full_name}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          <div className="col-12 col-lg-4">
            <TextField
              id="date"
              label="Tanggal"
              name="date"
              value={onlyDate(date)}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          <div className="col-12 col-lg-4">
            <TextField
              id="time_start"
              name="time_start"
              label="Waktu Mulai"
              value={time_start ? moment(time_start, 'HH:mm:ss').tz('Asia/Jayapura').format('HH:mm') : '-'}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          <div className="col-12 col-lg-4">
            <TextField
              id="time_end"
              name="time_end"
              label="Waktu Selesai"
              value={time_end ? moment(time_end, 'HH:mm:ss').tz('Asia/Jayapura').format('HH:mm') : '-'}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          <div className="col-12 col-lg-6">
            <TextField
              id="created_by"
              name="created_by"
              label="Pertama Diunggah Oleh"
              value={`${created_by.full_name} - ${created_by.id}`}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          <div className="col-12 col-lg-6">
            <TextField
              id="updated_by"
              name="updated_by"
              label="Terakhir Diperbarui Oleh"
              value="-"
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          <div className="col-12 col-lg-6">
            <TextField
              id="created_at"
              name="created_at"
              label="Waktu Dibuat"
              value={created_at ? fullTime(created_at) : '-'}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          <div className="col-12 col-lg-6">
            <TextField
              id="updated_at"
              name="updated_at"
              label="Waktu Terakhir Diperbarui"
              value={updated_at ? fullTime(updated_at) : '-'}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
        </form>
      </DialogContent>
    );
  }

  return (
    <Dialog
      open
      TransitionComponent={Slide}
      onClose={handleRequestClose}
      maxWidth="md"
    >
      <DialogTitle>Detail Shift</DialogTitle>
      {dialogContent}
      <DialogActions>
        <Button onClick={handleRequestClose} color="default">
          Tutup
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ShiftDetail;
