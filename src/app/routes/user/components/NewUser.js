import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { FormHelperText } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getRoles } from '../../../../actions/Role';
import { addUser, searchUser } from '../../../../actions/User';

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {
        id: '',
        full_name: '',
        id_ms: '',
        phone_no: '',
        gender: 'M',
        id_role: '',
        id_checkpoint: '',
        zones: []
      },
      processing: false,
      error: {},
      roleOptions: [],
      checkpoints: [],
      zones: [{
        id: 1,
        name: 'Low Land'
      },
      {
        id: 2,
        name: 'High Land'
      },
      {
        id: 3,
        name: 'East Leave'
      }]
    };
  }

  componentDidMount = async () => {
    const { data: roleOptions } = await getRoles();
    this.setState({ roleOptions });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      detail: {
        ...prevState.detail,
        [name]: value
      }
    }));
  };

  handleDateChange = (dob) => {
    this.setState((prevState) => ({
      ...prevState,
      detail: {
        ...prevState.detail,
        dob
      }
    }));
  };

  handleChange = (name) => (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      detail: {
        ...prevState.detail,
        [name]: value
      }
    }));
  };

  handleZoneChange = (event) => {
    const { value } = event.target;
    const { detail } = this.state;
    detail.zones = value;
    this.setState((prevState) => ({
      ...prevState,
      detail: {
        ...prevState.detail,
        zones: detail.zones
      }
    }));
  }

  uploadFileHandler = (e) => {
    const profile_picture = e.target.files[0];
    this.setState((prevState) => ({
      ...prevState,
      detail: {
        ...prevState.detail,
        profile_picture
      }
    }));
  };

  validateForm = async () => {
    const { detail, error } = this.state;
    const {
      id, full_name, id_role, profile_picture
    } = detail;

    if (!id) {
      error.id = 'Silakan masukkan ID MS';
    } else if (id.length > 100) {
      error.id = 'ID lebih panjang dari 100 karakter';
    } else {
      const { total } = await searchUser({ id });
      if (total !== 0) error.id = 'ID sudah digunakan user lain';
      else error.id = false;
    }

    if (!full_name) {
      error.full_name = 'Silakan masukkan nama lengkap';
    } else {
      error.full_name = false;
    }

    if (profile_picture && profile_picture.name && !profile_picture.name.toLowerCase().endsWith('.jpg')) {
      error.profile_picture = 'Silakan unggah gambar dengan format .jpg';
    } else {
      error.profile_picture = false;
    }

    if (!id_role) {
      error.role = 'Silakan tentukan wewenang';
    } else {
      error.role = false;
    }

    error.form = !(!error.id && !error.full_name && !error.phone_no && !error.profile_picture && !error.role && !error.checkpoint);
    this.setState({ error });
  };

  handleAdd = async () => {
    this.setState({ processing: true });
    await this.validateForm();
    const { detail, error } = this.state;

    if (error.form) {
      this.setState({ processing: false });
      return false;
    }

    const { refresh } = this.props;
    const payload = new FormData();
    payload.append('id', detail.id);
    payload.append('full_name', detail.full_name);
    payload.append('id_role', detail.id_role);
    payload.append('zones', detail.zones);
    if (detail.profile_picture) {
      payload.append('image', detail.profile_picture);
    }
    const { status, message } = await addUser(payload);
    this.setState({ processing: false });
    if (status) {
      refresh();
      this.handleRequestClose();
      return true;
    }
    alert(message);
    return false;
  };

  handleRequestClose = () => {
    const { openNew } = this.props;
    openNew(false);
  };

  render(ctx) {
    const {
      roleOptions, zones, detail, error, processing
    } = this.state;
    let dialogAction = (
      <DialogActions>
        <Button onClick={this.handleRequestClose} color="default">
          Tutup
        </Button>
        <Button onClick={this.handleAdd} color="primary">
          Tambahkan
        </Button>
      </DialogActions>
    );
    if (processing) {
      dialogAction = (
        <DialogActions>
          <CircularProgress />
        </DialogActions>
      );
    }
    const dialogContent = (
      <DialogContent>
        <form className="row" noValidate autoComplete="off">
          <div className="col-12">
            <TextField
              id="id"
              label="ID MS"
              name="id"
              value={detail.id}
              onChange={this.handleInputChange}
              margin="normal"
              fullWidth
              required
              error={!!error.id}
              helperText={error.id}
            />
          </div>
          <div className="col-12">
            <TextField
              id="full_name"
              label="Nama Lengkap"
              name="full_name"
              value={detail.full_name}
              onChange={this.handleInputChange}
              margin="normal"
              fullWidth
              required
              error={!!error.full_name}
              helperText={error.full_name}
            />
          </div>
          <div className="col-12">
            <TextField
              id="id_role"
              name="id_role"
              select
              label="Wewenang"
              value={detail.id_role}
              onChange={this.handleChange('id_role')}
              margin="normal"
              required
              fullWidth
              error={!!error.role}
              helperText={error.role}
            >
              {roleOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="col-12">
            <TextField
              id="zones"
              name="zones"
              label="Zona"
              SelectProps={{
                multiple: true,
                onChange: this.handleZoneChange
              }}
              value={detail.zones}
              margin="normal"
              error={!!error.zone}
              helperText={error.zone}
              fullWidth
              select
            >
              {zones.map((x) => (
                <MenuItem key={x.id} value={x.id}>
                  {x.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="col-12">
            <FormControl style={{ marginTop: '16px' }} fullWidth margin="normal">
              <InputLabel htmlFor="profile_picture" shrink>
                Gambar Profil
              </InputLabel>
              <Input
                type="file"
                name="profile_picture"
                id="profile_picture"
                inputProps={{ accept: '.jpg,image/jpg' }}
                error={!!error.profile_picture}
                onChange={this.uploadFileHandler} />
              <FormHelperText
                id="component-error-text"
                error={!!error.profile_picture}>
                {error.profile_picture}
              </FormHelperText>
            </FormControl>
          </div>
        </form>
      </DialogContent>
    );
    return (
      <Dialog
        open
        TransitionComponent={Slide}
        onClose={this.handleRequestClose}
        maxWidth="sm"
      >
        <DialogTitle>Tambah Anggota Baru</DialogTitle>
        {dialogContent}
        {dialogAction}
      </Dialog>
    );
  }
}

export default NewUser;
