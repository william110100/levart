import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { reverseGeocode } from '../../../../../actions/google/Maps';
import { getReportDetail } from 'actions/Report';
import {fullTime} from '../../../../../util/TimeConverter';
import GoogleMap from './map/GoogleMap'
import {ImageMarker} from './map/ImageMarker'
// import GoogleMarker from './map/GoogleMarker';

class InsidenDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      detail: null,
      marker_show: false,
      generated_address: '-',
    };
    this.rtdb = null;
  }

  componentDidUpdate = async (prevProps) => {
    this.updateOpen(prevProps);
    await this.updateId(prevProps);
  };

  handleRequestClose = () => {
    const {openDetail} = this.props;
    this.setState({open: false});
    openDetail(false);
  };

  onMarkerClick = (detail) => {
    let {marker_show} = this.state;
    console.log(marker_show);
    marker_show = !marker_show;
  
    this.setState({marker_show});
  };

  updateOpen(prevProps) {
    const {open} = this.props;
    if (open !== prevProps.open) {
      this.setState({open});
    }
  }

  async updateId(prevProps) {
    const {id} = this.props;
    if (id !== prevProps.id) {
      const detail = await getReportDetail(id);

      const {data} = await reverseGeocode(`${detail.latitude},${detail.longitude}`);
      
      let generated_address = '-' 
      if(data.results) generated_address = data.results[0].formatted_address;
      console.log(generated_address);
      this.setState({
        detail,
        generated_address
      });
    }
  }

  render(ctx) {
    const {open, detail, generated_address} = this.state;
    let dialogContent;
    if (!detail) {
      dialogContent = <DialogContent>Fetching detail...</DialogContent>;
    } else {
      const {
        id, creator, generated_id, evidence,  description, type_description, latitude, longitude, created_at, updated_at
      } = detail;
      dialogContent = (
        <DialogContent>
          <form className="row" noValidate autoComplete="off">
            <div className="row col-12">
              <div className="col-12 col-lg-4">
                <TextField
                  id="creator"
                  label="Dibuat oleh"
                  value={`${creator.id} - ${creator.full_name}`}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </div>
              <div className="col-12 col-lg-4">
                <TextField
                  id="generated_id"
                  label="Generated ID"
                  value={generated_id}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </div>
              <div className="col-12 col-lg-4">
                <TextField
                  id="type"
                  label="Tipe"
                  value={type_description.name}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </div>
              <div className="col-12 col-lg-3">
                <TextField
                  id="latitude"
                  label="Latitude"
                  value={latitude}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </div>
              <div className="col-12 col-lg-3">
                <TextField
                  id="longitude"
                  label="Longitude"
                  value={longitude}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </div>
              <div className="col-12 col-lg-6">
                <TextField
                  id="address"
                  label="Alamat"
                  value={generated_address}
                  margin="normal"
                  multiline
                  disabled
                  fullWidth
                />
              </div>
              <div className="col-12">
                <TextField
                  id="description"
                  label="Deskripsi"
                  value={description}
                  margin="normal"
                  multiline
                  disabled
                  fullWidth
                />
              </div>
            </div>
            <div className="col-12">
              <FormControl style={{marginTop: '16px'}} fullWidth margin="normal">
                <InputLabel htmlFor="evidence" shrink>
                  Gambar Laporan
                </InputLabel>
                <img id="evidence" alt={id} src={evidence.url} />
              </FormControl>
            </div>
            <div className="p-4 embed-responsive embed-responsive-21by9" style={{ height: 'calc(100vh - 180px)' }}>
              <GoogleMap
                center={{ lat: Number(latitude), lng: Number(longitude) }}
                zoom={15}
              >
                <ImageMarker
                    key={id}
                    lat={latitude}
                    lng={longitude}
                    id={id} />
              </GoogleMap>
            </div>
            <div className="col-6">
              <TextField
                id="created_at"
                name="created_at"
                label="Created At"
                value={created_at ? fullTime(created_at) : '-'}
                margin="normal"
                fullWidth
                disabled
              />
            </div>
            <div className="col-6">
              <TextField
                id="updated_at"
                name="updated_at "
                label="Last Updated At"
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
        open={open}
        TransitionComponent={Slide}
        onClose={this.handleRequestClose}
        maxWidth="lg"
      >
        <DialogTitle>Detail Insiden</DialogTitle>
        {dialogContent}
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="default">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default InsidenDetail;
