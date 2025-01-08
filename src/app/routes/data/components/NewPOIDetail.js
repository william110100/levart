import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import PoiMap from './PoiMap';
import { createPoi } from '../../../../actions/Poi';
import { main } from '../../../../secrets/main';
import {reverseGeocode} from '../../../../actions/google/Maps';

const flexStyle = {
  display: 'flex',
  alignItems: 'center'
};

const types = [
  { id: 0, value: 'All' },
  { id: 1, value: 'Polisi' },
  { id: 2, value: 'Rumah Sakit' },
  { id: 3, value: 'Pemadam Kebakaran' },
  { id: 4, value: 'Ambulans' }
];

class NewPOIDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      poi_detail: {},
    };
  }

  componentDidUpdate = async (prevProps) => {
    this.updateOpenState(prevProps);
  };

  handleCheckChange = (name) => (event, checked) => {
    this.setState((prevState) => ({
      ...prevState,
      poi_detail: {
        ...prevState.poi_detail,
        [name]: checked
      }
    }));
  };

  handleOpenTimeChange = (date) => {
    this.setState((prevState) => ({
      ...prevState,
      poi_detail: {
        ...prevState.poi_detail,
        open: moment(date).format('HH:mm:00')
      }
    }));
  };

  handleCloseTimeChange = (date) => {
    this.setState((prevState) => ({
      ...prevState,
      poi_detail: {
        ...prevState.poi_detail,
        close: moment(date).format('HH:mm:00')
      }
    }));
  };

  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState((prevState) => ({
      ...prevState,
      poi_detail: {
        ...prevState.poi_detail,
        [name]: value
      }
    }));
  };

  handleChange = (name) => (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      poi_detail: {
        ...prevState.poi_detail,
        [name]: value
      }
    }));
  };

  handleAddress = (address) => {
    this.setState((prevState) => ({
      ...prevState,
      poi_detail: {
        ...prevState.poi_detail,
        address
      }
    }));
  }

  uploadFileHandler = (e) => {
    const poi_picture = e.target.files[0];
    this.setState((prevState) => ({
      ...prevState,
      poi_detail: {
        ...prevState.poi_detail,
        poi_picture
      }
    }));
  }

  handleAdd = async () => {
    const { poi_detail } = this.state;
    const payload = new FormData();
    const { data } = await reverseGeocode(`${poi_detail.latitude},${poi_detail.longitude}`);
    payload.append('type', poi_detail.type);
    payload.append('name', poi_detail.name);
    payload.append('latitude', poi_detail.latitude);
    payload.append('longitude', poi_detail.longitude);
    if (data.status === 'OK') payload.append('address', data.results[0].formatted_address);
    payload.append('is_24hours', poi_detail.is_24hours);
    if (poi_detail.phone_no) { payload.append('phone_no', poi_detail.phone_no); }
    if (poi_detail.open && poi_detail.close) {
      payload.append('open', poi_detail.open);
      payload.append('close', poi_detail.close);
    }
    if (poi_detail.poi_picture) { payload.append('image', poi_detail.poi_picture); }

    if (data.status !== 'OK') console.error('error', 'Oops, something wrong in attempt to build address');
    await createPoi(payload);
    this.handleRequestClose();
  };

  handleRequestClose = () => {
    const { openAddNew, refresh } = this.props;
    this.setState({ open: false, poi_detail: {} });
    refresh();
    openAddNew(false);
  };

  setLatLng = (latitude, longitude) => {
    if (latitude && longitude) {
      this.setState((prevState) => ({
        ...prevState,
        poi_detail: {
          ...prevState.poi_detail,
          latitude,
          longitude
        }
      }));
    }
  }

  updateOpenState(prevProps) {
    const { open } = this.props;
    if (open !== prevProps.open) this.setState({ open });
  }

  render(ctx) {
    const { open, poi_detail } = this.state;
    return (
      <Dialog
        open={open}
        TransitionComponent={Slide}
        onClose={this.handleRequestClose}
        maxWidth="lg"
      >
        <DialogTitle>Add New Point of Interest</DialogTitle>
        <DialogContent>
          <form className="row" noValidate autoComplete="off">
            <div className="col-sm-12 col-md-8">
              <TextField
                label="Name"
                id="name"
                name="name"
                required
                value={poi_detail?.name || ''}
                onChange={this.handleInputChange}
                margin="normal"
                fullWidth
              />
            </div>
            <div className="col-sm-12 col-md-4">
              <TextField
                id="type"
                name="type"
                select
                label="Type"
                value={poi_detail?.type || 1}
                onChange={this.handleChange('type')}
                margin="normal"
                fullWidth
              >
                {types.map((option) => (
                  <MenuItem key={option.value} value={option.id}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col-xs-12 col-sm-6 col-lg-2">
              <TextField
                label="Latitude"
                id="latitude"
                name="latitude"
                required
                value={poi_detail?.latitude || ''}
                onChange={this.handleInputChange}
                margin="normal"
                fullWidth
              />
            </div>
            <div className="col-xs-12 col-sm-6 col-lg-2">
              <TextField
                label="Longitude"
                id="longitude"
                name="longitude"
                required
                value={poi_detail?.longitude || ''}
                onChange={this.handleInputChange}
                margin="normal"
                fullWidth
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-lg-2" style={flexStyle}>
              <FormControlLabel
                label="Is 24 Hours"
                labelPlacement="start"
                control={(
                  <Switch
                    checked={poi_detail?.is_24hours || false}
                    onChange={this.handleCheckChange('is_24hours')}
                    name="is_24hours"
                    color="primary"
                    aria-label="24_hours"
                  />
                )}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-lg-2">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <TimePicker
                  label="Open Time"
                  id="time-picker"
                  name="open"
                  margin="normal"
                  emptyLabel="00:00"
                  ampm={false}
                  value={moment(poi_detail?.open || '00:00:00', 'HH:mm:ss')}
                  format="HH:mm"
                  disabled={poi_detail?.is_24hours || false}
                  onChange={this.handleOpenTimeChange}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="col-xs-12 col-sm-4 col-lg-2">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <TimePicker
                  label="Close Time"
                  id="time-picker"
                  name="close"
                  margin="normal"
                  ampm={false}
                  value={moment(poi_detail?.close || '00:00:00', 'HH:mm:ss')}
                  format="HH:mm"
                  disabled={poi_detail?.is_24hours || false}
                  onChange={this.handleCloseTimeChange}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="col-sm-12 col-lg-2">
              <TextField
                label="Phone Number"
                id="phone_no"
                name="phone_no"
                placeholder="+62...."
                value={poi_detail?.phone_no || ''}
                onChange={this.handleInputChange}
                margin="normal"
                fullWidth
              />
            </div>
            <div className="col-12">
              <TextField
                label="Address"
                id="address"
                name="address"
                multiline
                rowsMax="3"
                value={poi_detail?.address || ''}
                onChange={this.handleInputChange}
                margin="normal"
                fullWidth
              />
            </div>
            <div className="col-12">
              <PoiMap lat={main.LANDMARK.latitude} lng={main.LANDMARK.longitude} useMarker={false} setLatLng={this.setLatLng} setAddress={this.handleAddress} />
            </div>
            <div className="col-12">
              <input type="file" required name="poi_picture" onChange={this.uploadFileHandler} />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="default">
            Close
          </Button>
          <Button onClick={this.handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default NewPOIDetail;
