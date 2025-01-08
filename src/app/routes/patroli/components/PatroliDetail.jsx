import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { detailPatroli } from 'actions/Patroli';
import { reverseGeocode } from '../../../../actions/google/Maps';
import {fullTime} from '../../../../util/TimeConverter';
import { database } from '../../../../libraries/init-fcm';
import GoogleMap from './patroli/GoogleMap'
import {ImageMarker} from './patroli/ImageMarker'

class PatroliDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      patroli_detail: null,
      locations: [],
      selectedMarker: null,
      centerLatLng: {lat: -4.5391966, lng: 136.8954289} 
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
    const {selectedMarker: prevSelectedMarker} = this.state;
    const {locations} = this.state;
    let index = null;
    index = locations.findIndex((e) => e.id === detail.id);
    // eslint-disable-next-line no-param-reassign
    locations[index].show = !locations[index].show;
    if (prevSelectedMarker !== index && prevSelectedMarker !== null) {
      // eslint-disable-next-line no-param-reassign
      locations[prevSelectedMarker].show = !locations[prevSelectedMarker].show;
    } else if (prevSelectedMarker === index && !locations[index].show) index = null;
    this.setState({locations, selectedMarker: index});
  };

  updateOpen(prevProps) {
    const {open} = this.props;
    if (open !== prevProps.open) {
      this.setState({open});
    }
  }

  async updateId(prevProps) {
    const {patroli_id} = this.props;
    if (patroli_id !== prevProps.patroli_id) {
      const patroli_detail = await detailPatroli({id: patroli_id});
      const locations = [];
      let centerLatLng = {lat: -4.5391966, lng: 136.8954289};
      this.setState({locations});

      const snapshot = await database.ref('patroli/' + patroli_id).once('value');
      const sp = snapshot.val();
      
      if(sp !== null) {
        for (const key of Object.keys(sp)) {
          const {data} = await reverseGeocode(`${sp[key].latitude},${sp[key].longitude}`);
          let address = '-' 
          if(data.results) address = data.results[0].formatted_address;
        
          locations.push({
            id: key,
            userId: sp[key].user_id,
            lat: sp[key].latitude,
            lng: sp[key].longitude,
            show: false,
            detail: {
              id: key,
              lat: sp[key].latitude,
              lng: sp[key].longitude,
              address,
              created_at: fullTime(sp[key].created_at * 1000)
            }
          });
        }
        centerLatLng = {lat: parseFloat(locations[0].lat), lng: parseFloat(locations[0].lng)}
      }
      this.setState({
        patroli_detail,
        locations,
        centerLatLng 
      });
    }
  }

  render(ctx) {
    const {open, patroli_detail, locations, centerLatLng} = this.state;
    console.log(centerLatLng);
    let dialogContent;
    if (!patroli_detail) {
      dialogContent = <DialogContent>Fetching detail...</DialogContent>;
    } else {
      const {
        routes, vehicle, creator, crews, guests, created_at, updated_at
      } = patroli_detail;
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
                  id="vehicle"
                  label="Kendaraan"
                  value={`${vehicle.type} - ${vehicle.number}`}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </div>
              <div className="col-12 col-lg-4">
                <TextField
                  id="routes"
                  label="Rute"
                  value={routes.map((r) => r.name).join(', ')}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </div>
              <div className="col-6">
                <TextField
                  id="crews"
                  label="Kru"
                  value={crews.map(c => `${c.id} - ${c.full_name}`).join("\n")}
                  margin="normal"
                  multiline
                  disabled
                  fullWidth
                />
              </div>
              <div className="col-6">
                <TextField
                  id="guests"
                  label="Tamu"
                  value={guests ? guests.join("\n") : '-'}
                  margin="normal"
                  multiline
                  disabled
                  fullWidth
                />
              </div>
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
            <div className="p-4 embed-responsive embed-responsive-21by9" style={{ height: 'calc(100vh - 180px)' }}>
              <GoogleMap
                center={{ lat: centerLatLng.lat, lng: centerLatLng.lng }}
                zoom={15}
              >
                {locations.length > 0 && locations.map((m) => (
                  <ImageMarker
                    onClick={this.onMarkerClick}
                    key={m.id}
                    lat={m.lat}
                    lng={m.lng}
                    id={m.userId}
                    show={m.show}
                    detail={m.detail} />
                ))}
              </GoogleMap>
            </div>
            <div className="col-12">
              <TextField
                id="locations"
                name="locations"
                label="Riwayat Perjalanan"
                value={locations ? locations.map(({detail}) => `Koordinat: ${detail.lat}, ${detail.lng}\nAlamat: ${detail.address}\nWaktu: ${detail.created_at}`).join("\n\n") : '-'}
                margin="normal"
                multiline
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
        <DialogTitle>Patroli Detail</DialogTitle>
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

export default PatroliDetail;
