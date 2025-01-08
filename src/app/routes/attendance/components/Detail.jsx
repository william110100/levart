import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { fullTime } from '../../../../util/TimeConverter';
import Map from './Map';
import { detailAttendance, updateAttendances } from '../../../../actions/Attendance';

const otherAttendance = [5, 6, 7, 8, 9, 10, 11];

function Detail(props) {
  const { openDetail, refresh, id } = props;
  const [init, setInit] = useState(true);
  const [detail, setDetail] = useState(null);
  let dialogContent;
  let footerAction;
  let statusMeta;

  useEffect(() => {
    async function fetchData() {
      const detail = await detailAttendance(id);
      setDetail(detail);
      setInit(false);
    }
    fetchData();
  }, [id]);

  const handleRequestClose = () => {
    openDetail(false);
  };

  const rejectAttendance = async () => {
    await updateAttendances(id, {approval_status: 2});
    refresh();
    handleRequestClose();
  };

  const acceptAttendance = async () => {
    await updateAttendances(id, {approval_status: 1});
    refresh();
    handleRequestClose();
  };

  if (init) {
    dialogContent = <DialogContent>Memuat data detail...</DialogContent>;
    footerAction = <></>;
  } else {
    const {
      id_user, user, latitude, longitude, generated_address, file_absence, type, checkpoint, start_at, end_at, approval_status, approval_by
    } = detail;
    let approval_description;
    footerAction = (
      <DialogActions>
        <Button onClick={handleRequestClose} color="default">
          Tutup
        </Button>
      </DialogActions>
    );
    statusMeta = (
      <>
        <div className="col-12 col-lg-4">
          <TextField
            id="type"
            name="type"
            label="Tipe Kehadiran"
            value={type.name}
            margin="normal"
            fullWidth
            disabled
          />
        </div>
        <div className="col-12 col-lg-4">
          <TextField
            id="latitude"
            name="latitude"
            label="Koordinat Garis Lintang"
            value={latitude}
            margin="normal"
            fullWidth
            disabled
          />
        </div>
        <div className="col-12 col-lg-4">
          <TextField
            id="longitude"
            name="longitude"
            label="Koordinat Garis Bujur"
            value={longitude}
            margin="normal"
            fullWidth
            disabled
          />
        </div>
      </>
    );
    switch (approval_status) {
      case 1: approval_description = 'Disetujui'; break;
      case 2: approval_description = 'Ditolak'; break;
      default: approval_description = 'Menunggu Persetujuan';
    }
    if (otherAttendance.includes(detail?.id_type)) {
      statusMeta = (
        <>
          <div className="col-12 col-lg-4">
            <TextField
              id="type"
              name="type"
              label="Tipe Kehadiran"
              value={type.name}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          <div className="col-12 col-lg-4">
            <TextField
              id="approval_description"
              name="approval_description"
              label="Status"
              value={approval_description}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          <div className="col-12 col-lg-4">
            <TextField
              id="approval_by"
              name="approval_by"
              label="Diproses Oleh"
              value={approval_by ? approval_by.full_name : '-'}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          <div className="col-12 col-lg-6">
            <TextField
              id="latitude"
              name="latitude"
              label="Koordinat Garis Lintang"
              value={latitude}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          <div className="col-12 col-lg-6">
            <TextField
              id="longitude"
              name="longitude"
              label="Koordinat Garis Bujur"
              value={longitude}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
        </>
      );
      if (!approval_status) {
        footerAction = (
          <DialogActions>
            <Button onClick={acceptAttendance} color="primary">
              Setujui
            </Button>
            <Button onClick={rejectAttendance} color="secondary">
              Tolak
            </Button>
            <Button onClick={handleRequestClose} color="default">
              Tutup
            </Button>
          </DialogActions>
        );
      }
    }
    dialogContent = (
      <DialogContent>
        <form className="row" noValidate autoComplete="off">
          <div className="col-12 col-lg-4">
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
          <div className="col-12 col-lg-4">
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
              id="checkpoint"
              label="Terminal"
              name="checkpoint"
              value={checkpoint ? checkpoint.name : '-'}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          {statusMeta}
          <div className="col-12">
            <TextField
              id="generated_address"
              name="generated_address"
              label="Alamat Google Maps"
              value={generated_address || ''}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          <div className="col-12">
            <Map lat={latitude} useMarker lng={longitude} />
          </div>
          <div className="col-12">
            <FormControl style={{marginTop: '16px'}} fullWidth margin="normal">
              <InputLabel htmlFor="file_absence" shrink>
                Gambar Kehadiran
              </InputLabel>
              <img id="file_absence" alt={user.full_name} src={file_absence.url} />
            </FormControl>
          </div>
          <div className="col-6">
            <TextField
              id="start_at"
              name="start_at"
              label="Waktu Mulai"
              value={start_at ? fullTime(start_at) : '-'}
              margin="normal"
              fullWidth
              disabled
            />
          </div>
          <div className="col-6">
            <TextField
              id="end_at"
              name="end_at"
              label="Waktu Selesai"
              value={end_at ? fullTime(end_at) : '-'}
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
      <DialogTitle>Detail Kehadiran</DialogTitle>
      {dialogContent}
      {footerAction}
    </Dialog>
  );
}

export default Detail;
