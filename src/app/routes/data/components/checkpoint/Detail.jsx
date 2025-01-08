import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { fullTime } from '../../../../../util/TimeConverter';
import Map from './Map';
import { addCheckpoint, detailCheckpoint, updateCheckpoint } from '../../../../../actions/Checkpoint';

function Detail(props) {
  const {
    id, openDetail, refresh
  } = props;
  const [init, setInit] = useState(true);
  const [detail, setDetail] = useState({
    name: '',
    latitude: -4.5634051,
    longitude: 136.8823666,
    radius: 10
  });
  let dialogContent;

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const detail = await detailCheckpoint(id);
        setDetail(detail);
      }
      setInit(false);
    }
    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    setDetail({...detail, [event.currentTarget.name]: event.currentTarget.value});
  };

  const handleSetLatLng = (latitude, longitude) => {
    if (latitude && longitude) {
      setDetail({...detail, latitude, longitude });
    }
  };

  const handleRequestClose = () => {
    openDetail(false);
  };

  const handleSave = async () => {
    const payload = new FormData();
    payload.append('name', detail.name);
    payload.append('latitude', detail.latitude);
    payload.append('longitude', detail.longitude);
    payload.append('radius', detail.radius);
    if (id) await updateCheckpoint(id, payload);
    else await addCheckpoint(payload);
    refresh();
    handleRequestClose();
  };

  if (init) {
    dialogContent = <DialogContent>Memuat detail...</DialogContent>;
  } else {
    const {
      name, latitude, longitude, radius, created_at, updated_at
    } = detail;
    dialogContent = (
      <DialogContent>
        <form className="row" noValidate autoComplete="off">
          <div className="col-12">
            <TextField
              id="name"
              label="Nama"
              name="name"
              value={name}
              margin="normal"
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div className="col-12 col-lg-4">
            <TextField
              id="radius"
              name="radius"
              label="Radius (m)"
              value={radius}
              margin="normal"
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div className="col-12 col-lg-4">
            <TextField
              id="latitude"
              name="latitude"
              label="Koordinat Garis Lintang"
              value={latitude}
              margin="normal"
              disabled
              fullWidth
            />
          </div>
          <div className="col-12 col-lg-4">
            <TextField
              id="longitude"
              name="longitude"
              label="Koordinat Garis Bujur"
              value={longitude}
              margin="normal"
              disabled
              fullWidth
            />
          </div>
          <div className="col-12">
            <Map lat={latitude} useRadius lng={longitude} radius={radius} setLatLng={handleSetLatLng} />
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
              label="Waktu Diperbarui"
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
      <DialogTitle>
        {id ? 'Ubah ' : 'Tambah '}
        Detail Terminal
      </DialogTitle>
      {dialogContent}
      <DialogActions>
        <Button onClick={handleRequestClose} color="default">
          Tutup
        </Button>
        <Button onClick={handleSave} color="primary">
          {id ? 'Simpan' : 'Tambah'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Detail;
