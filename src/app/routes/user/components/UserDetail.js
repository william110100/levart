import React, { Component } from 'react';
import { find } from 'lodash';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { FormHelperText } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  deleteUser,
  getUserDetail,
  resetDevice,
  resetPassword,
  updateUser
} from '../../../../actions/User';
import { fullTime } from '../../../../util/TimeConverter';
import { getRoles } from '../../../../actions/Role';
import { getCheckpoints } from '../../../../actions/Checkpoint';

const avatarStyle = {
  height: '100%',
  width: '100%',
};

const labelConfirmationStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      detail: null,
      error: {},
      resetDevice: false,
      processing: false,
      roleOptions: [],
      checkpoints: [],
      zones: [
        {
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
        }
      ]
    };
  }

  componentDidMount = async () => {
    const { id } = this.props;
    const detail = await getUserDetail(id);
    detail.zones = detail.zones.map(x => x.id);
    const { data: roleOptions } = await getRoles();
    const { data: checkpoints } = await getCheckpoints({ page: 1, limit: 10 });
    this.setState({
      detail, init: false, roleOptions, checkpoints
    });
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

  handleDateChange = (dob) => {
    this.setState((prevState) => ({
      ...prevState,
      detail: {
        ...prevState.detail,
        dob
      }
    }));
  };

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

  validateForm = async () => {
    const { detail, error } = this.state;
    const {
      id, full_name, id_role, profile_picture
    } = detail;

    if (!full_name) {
      error.full_name = 'Silakan masukkan nama lengkap';
    } else if (full_name.length > 300 || full_name.length < 3) {
      error.full_name = 'Panjang nama lengkap 3 sampai 300 karakter';
    } else {
      error.full_name = false;
    }

    if (!id_role) {
      error.role = 'Silakan tentukan role';
    } else {
      error.role = false;
    }

    error.profile_picture = false;
    if (profile_picture && profile_picture.name && !profile_picture.name.toLowerCase().endsWith('.jpg')) {
      error.profile_picture = 'Silakan unggah gambar dengan format .jpg';
    }

    error.form = !(!error.id && !error.full_name && !error.phone_no && !error.profile_picture && !error.role && !error.checkpoint);
    this.setState({ error });
  };

  handleSave = async () => {
    this.setState({ processing: true });
    await this.validateForm();
    const { refresh } = this.props;
    const { detail, error } = this.state;

    if (error.form) {
      this.setState({ processing: false });
      return false;
    }

    const payload = new FormData();
    payload.append('full_name', detail.full_name);
    payload.append('id_role', detail.id_role);
    payload.append('id_checkpoint', detail.id_checkpoint);
    payload.append('zones', detail.zones);
    if (detail.profile_picture) {
      payload.append('image', detail.profile_picture);
    }
    await updateUser(detail.id, payload);
    refresh();
    this.setState({ processing: false });
    this.handleRequestClose();
    return true;
  };

  toggleResetPassword = () => {
    const { resetPassword } = this.state;
    this.setState({ resetPassword: !resetPassword });
  };

  confirmResetPassword = async () => {
    const { detail } = this.state;
    const payload = new FormData();
    payload.append('id', detail.id);
    await resetPassword(payload);
    this.handleRequestClose();
  };

  toggleResetDevice = () => {
    const { resetDevice } = this.state;
    this.setState({ resetDevice: !resetDevice });
  };

  confirmResetDevice = async () => {
    const { detail } = this.state;
    const payload = new FormData();
    payload.append('id', detail.id);
    await resetDevice(payload);
    this.handleRequestClose();
  };

  handleRequestClose = () => {
    const { openDetail } = this.props;
    openDetail(false);
  };

  handleRequestDelete = async () => {
    const { refresh } = this.props;
    const { detail } = this.state;
    const { id, full_name } = detail;
    this.handleRequestClose();
    const MySwal = withReactContent(Swal);

    const { isConfirmed } = await MySwal.fire({
      icon: 'question',
      html: `Anda yakin untuk menghapus anggota ${id} - ${full_name}?`,
      showDenyButton: true,
      showCancelButton: false,
      denyButtonText: 'Batalkan',
      confirmButtonText: 'Ya'
    });

    if (isConfirmed) {
      const { status } = await deleteUser(id);

      if (status) {
        await MySwal.fire({
          icon: 'success',
          html: `Anggota ${id} - ${full_name} sukses dihapus`,
          timer: 5000
        });
        refresh();
      } else {
        await MySwal.fire({
          icon: 'error',
          html: `Gagal menghapus ${id} - ${full_name}`,
        });
      }
    }
  };

  render(ctx) {
    const {
      init, detail, error, roleOptions, resetDevice, processing, zones
    } = this.state;
    let dialogContent;
    let dialogAction;
    if (init) {
      dialogContent = <DialogContent>Memuat detail...</DialogContent>;
      dialogAction = <DialogActions />;
    } else {
      const {
        id, full_name, id_role, created_at, updated_at, profile_picture
      } = detail;
      let image_url = null;
      let deviceResetDiv;

      if (processing) dialogAction = <DialogActions><CircularProgress /></DialogActions>;
      else {
        dialogAction = (
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="default">
              Tutup
            </Button>
            <Button onClick={this.handleRequestDelete} color="secondary">
              Hapus
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Simpan
            </Button>
          </DialogActions>
        );
      }
      if (profile_picture && profile_picture.url) image_url = profile_picture.url;
      else if (profile_picture && profile_picture.name) image_url = URL.createObjectURL(profile_picture);

      if (resetDevice) {
        deviceResetDiv = (
          <div className="row">
            <div className="col-4" style={labelConfirmationStyle}>Anda yakin?</div>
            <div className="col-4">
              <Button
                variant="contained"
                className="jr-btn bg-danger text-white"
                onClick={this.confirmResetDevice}
                fullWidth>
                Ya
              </Button>
            </div>
            <div className="col-4">
              <Button
                variant="contained"
                className="jr-btn bg-info text-white"
                onClick={this.toggleResetDevice}
                fullWidth>
                Batalkan
              </Button>
            </div>
          </div>
        );
      } else {
        deviceResetDiv = (
          <Button
            variant="contained"
            className="jr-btn bg-danger text-white"
            onClick={this.toggleResetDevice}
            fullWidth>
            Reset Device
          </Button>
        );
      }
      dialogContent = (
        <DialogContent>
          <form className="row" noValidate autoComplete="off">
            <div className="pull-left col-lg-4">
              <Avatar
                style={avatarStyle}
                variant="rounded"
                alt={full_name}
                src={image_url}
              />
            </div>
            <div className="row col-lg-8">
              <div className="col-12 col-lg-4">
                <TextField
                  id="id"
                  name="id"
                  label="ID MS"
                  value={id}
                  onChange={this.handleInputChange}
                  margin="normal"
                  fullWidth
                  disabled
                />
              </div>
              <div className="col-12 col-lg-8">
                <TextField
                  id="full_name"
                  label="Nama Lengkap"
                  name="full_name"
                  value={full_name}
                  onChange={this.handleInputChange}
                  margin="normal"
                  error={!!error.full_name}
                  helperText={error.full_name}
                  fullWidth
                />
              </div>
              <div className="col-12 col-lg-6">
                <TextField
                  id="id_role"
                  name="id_role"
                  label="Wewenang"
                  value={id_role}
                  margin="normal"
                  onChange={this.handleChange('id_role')}
                  required
                  fullWidth
                  select
                >
                  {roleOptions.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-12 col-lg-6">
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
              <div className="col-12 col-lg-6">
                <FormControl style={{ marginTop: '16px' }} fullWidth>
                  {deviceResetDiv}
                </FormControl>
              </div>
              <div className="col-12 col-md-6">
                <FormControl style={{ marginTop: '16px' }}>
                  <InputLabel htmlFor="profile_picture" shrink>
                    Gambar Profil
                  </InputLabel>
                  <Input
                    type="file"
                    name="profile_picture"
                    id="profile_picture"
                    inputProps={{ accept: '.jpg,image/jpg' }}
                    onChange={this.uploadFileHandler}
                    aria-describedby="component-error-text"
                    error={!!error.profile_picture}
                    fullWidth
                  />
                  <FormHelperText
                    id="component-error-text"
                    error={!!error.profile_picture}>
                    {error.profile_picture}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="col-12 col-md-6">
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
              <div className="col-12 col-md-6">
                <TextField
                  id="updated_at"
                  name="updated_at"
                  label="Pembaruan Terakhir"
                  value={updated_at ? fullTime(updated_at) : '-'}
                  margin="normal"
                  fullWidth
                  disabled
                />
              </div>
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
        maxWidth="lg"
      >
        <DialogTitle>Detail Pengguna</DialogTitle>
        {dialogContent}
        {dialogAction}
      </Dialog>
    );
  }
}

export default UserDetail;
