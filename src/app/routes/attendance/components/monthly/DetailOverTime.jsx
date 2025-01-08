import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import { getAttendances } from 'actions/Attendance';
import '../style.css';
import { fullTime } from 'util/TimeConverter';

function DetailOverTime(props) {
  const {
    openDetail, id_user, start_date, end_date
  } = props;
  const [page] = useState(1);
  const [limit] = useState(1000);
  const [init, setInit] = useState(true);
  const [detail, setDetail] = useState(null);

  let dialogContent;
  let footerAction;

  useEffect(() => {
    async function fetchData() {
      const {data, status} = await getAttendances({
        id_user, start_date, end_date, page, limit, types: 7
      });
      if (status) {
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
    if (detail.length !== 0) {
      dialogContent = (
        <DialogContent>
          <form className="row" noValidate autoComplete="off">
            <div className="col-12 col-lg-4">
              <TextField
                id="id"
                name="id"
                label="ID MS"
                value={detail[0].user.id}
                margin="normal"
                fullWidth
                disabled
                  />
            </div>
            <div className="col-12 col-lg-4">
              <TextField
                id="full_name"
                label="Nama Lengkap"
                name="full_name"
                value={detail[0].user.full_name}
                margin="normal"
                fullWidth
                disabled
                  />
            </div>
            <div className="col-12 col-lg-4">
              <TextField
                id="checkpoint"
                label="Terminal"
                name="checkpoint"
                value={detail[0].checkpoint ? detail[0].checkpoint.name : '-'}
                margin="normal"
                fullWidth
                disabled
                  />
            </div>
            {detail.map((d, i) => (
              <>
                <div className="col-12">
                  <TextField
                    id="approved_by"
                    label="Disetujui Oleh"
                    name="approved_by"
                    value={d.approval_by ? d.approval_by.full_name : '-'}
                    margin="normal"
                    fullWidth
                    disabled
                  />
                </div>
                <div className="col-12">
                  <TextField
                    id="description"
                    label="Catatan"
                    name="description"
                    value={d.description ? d.description : '-'}
                    margin="normal"
                    fullWidth
                    disabled
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <TextField
                    id="created_at"
                    label="Waktu Dibuat"
                    name="created_at"
                    value={fullTime(d.created_at)}
                    margin="normal"
                    fullWidth
                    disabled
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <TextField
                    id="updated_at"
                    label="Waktu Diperbarui"
                    name="updated_at"
                    value={fullTime(d.updated_at)}
                    margin="normal"
                    fullWidth
                    disabled
                  />
                </div>
              </>
            ))}
          </form>
        </DialogContent>
      );
    } else {
      dialogContent = (
        <DialogContent>
          <form className="row" noValidate autoComplete="off">
            <div>Tidak ada data lembur</div>
          </form>
        </DialogContent>
      );
    }

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

export default DetailOverTime;
