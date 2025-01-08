import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { getDetailUserLocation } from '../../../../actions/UserLocation';
import SimpleMap from '../../../../components/Maps/SimpleMap';
import { fullTime } from '../../../../util/TimeConverter';

class LocationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      detail: null,
    };
  }

  componentDidMount = async () => {
    const { id } = this.props;
    const detail = await getDetailUserLocation(id);
    this.setState({ detail, init: false });
  };

  handleRequestClose = () => {
    const { openDetail } = this.props;
    openDetail(false);
  };

  render(ctx) {
    const { init, detail } = this.state;
    let dialogContent;
    if (init) {
      dialogContent = <DialogContent>Memuat detail...</DialogContent>;
    } else {
      const {
        target, description, latitude, longitude, generated_place, created_at, target_image
      } = detail;

      let imageContainer;
      if (target_image && target_image.url) {
        imageContainer = (
          <div className="col-12">
            <FormControl style={{marginTop: '16px'}} fullWidth margin="normal">
              <InputLabel htmlFor="profile_picture" shrink>
                Gambar Lokasi Anggota
              </InputLabel>
              <img alt={target.full_name} src={target_image.url} />
            </FormControl>
          </div>
        );
      }

      dialogContent = (
        <DialogContent>
          <form className="row" noValidate autoComplete="off">
            <div className="col-12 col-lg-6">
              <TextField
                id="id_ms"
                label="ID MS"
                value={target.id}
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="full_name"
                label="Nama Lengkap"
                value={target.full_name}
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="phone_no"
                label="Nomor Telepon"
                value={target.phone_no}
                margin="normal"
                disabled
                fullWidth
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
            <div className="col-12">
              <TextField
                id="generated_place"
                label="Nama Lokasi"
                placeholder="Nama lokasi"
                value={generated_place || '-'}
                multiline
                rowsMax="3"
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12">
              <TextField
                id="description"
                label="Deskripsi"
                placeholder="Deskripsi"
                value={description || '-'}
                multiline
                rowsMax="3"
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12">
              <SimpleMap
                lat={latitude}
                lng={longitude}
                title="Lokasi Anggota"
              />
            </div>

            {imageContainer}
          </form>
        </DialogContent>
      );
    }
    return (
      <Dialog
        open
        TransitionComponent={Slide}
        onClose={this.handleRequestClose}
        maxWidth="lg"
      >
        <DialogTitle>Detail Lokasi User</DialogTitle>
        {dialogContent}
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="default">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default LocationDetail;
