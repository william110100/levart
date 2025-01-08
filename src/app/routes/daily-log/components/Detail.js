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
import { fullTime } from '../../../../util/TimeConverter';
import { detailDailyLog } from '../../../../actions/DailyLog';
import Map from './Map';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      detail: null
    };
  }

  componentDidMount = async () => {
    const { id } = this.props;
    const detail = await detailDailyLog(id);
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
      dialogContent = <DialogContent>Fetching detail...</DialogContent>;
    } else {
      const {
        id_user, creator, latitude, longitude, title, description, created_at, file_log, generated_address
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
                value={creator.full_name}
                margin="normal"
                fullWidth
                disabled
                />
            </div>
            <div className="col-12">
              <TextField
                id="title"
                name="title"
                label="Judul Laporan"
                value={title}
                margin="normal"
                fullWidth
                disabled
              />
            </div>
            <div className="col-12">
              <TextField
                id="description"
                name="description"
                label="Deskripsi"
                value={description}
                margin="normal"
                fullWidth
                disabled
                multiline
                rowsMax="5"
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
                <InputLabel htmlFor="profile_picture" shrink>
                  Gambar log
                </InputLabel>
                <img alt={title} src={file_log.url} />
              </FormControl>
            </div>
            <div className="col-12">
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
          </form>
        </DialogContent>
      );
    }
    return (
      <Dialog
        open
        TransitionComponent={Slide}
        onClose={this.handleRequestClose}
        maxWidth="md"
      >
        <DialogTitle>Detail Laporan Harian</DialogTitle>
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

export default Detail;
