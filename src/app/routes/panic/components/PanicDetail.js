import React, { Component } from 'react';
import last from 'lodash/last';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SimpleMap from '../../../../components/Maps/SimpleMap';
import { getPanicDetail, updatePanic } from '../../../../actions/Panic';
import { PANIC_FINISHED } from '../../../../constants/Panic';
import { fullTime } from '../../../../util/TimeConverter';

class PanicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panic_detail: null,
      notes: null,
      init: true
    };
  }

  componentDidMount = async () => {
    const { panic_id } = this.props;
    const panic_detail = await getPanicDetail({ panic_id });
    const last_step = last(panic_detail.steps);
    const { notes = '' } = { ...last_step };
    this.setState({ panic_detail, notes, init: false });
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRequestClose = () => {
    const { openDetail } = this.props;
    openDetail(false);
  };

  handleFinish = async () => {
    const { panic_detail, notes } = this.state;
    const { refresh } = this.props;
    const payload = {
      id: panic_detail.id,
      status: PANIC_FINISHED,
      id_finish_type: 6,
      notes: notes || null
    };
    await updatePanic(payload);
    refresh();
    this.handleRequestClose();
  };

  render(ctx) {
    const { panic_detail, notes, init } = this.state;
    let dialogContent;
    let dialogAction;
    let finishContent;
    let helperContent;
    if (init) {
      dialogContent = <DialogContent>Memuat detail...</DialogContent>;
    } else {
      const {
        creator,
        device_creator,
        description,
        generated_place,
        device_type,
        status,
        type_description,
        status_description,
        finish_description,
        file_done,
        helpers,
        created_at
      } = panic_detail;
      const { full_name, phone_no } = creator || {};
      const { name } = device_creator || {};
      const is_disabled_field = status > 2;
      if (helpers) {
        helperContent = helpers.map(({ helper }, index) => (
          <>
            <div className="col-12 col-lg-6">
              <TextField
                label={`Nama Penolong ${index + 1}`}
                value={helper.full_name}
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                label="Nomor Telpon"
                value={helper.phone_no}
                margin="normal"
                disabled
                fullWidth
              />
            </div>
          </>
        ));
      }

      if (status_description.id === 3 && file_done) {
        finishContent = (
          <div className="col-12">
            <FormControl style={{marginTop: '16px'}} fullWidth margin="normal">
              <InputLabel htmlFor="profile_picture" shrink>
                {fullTime(created_at)}
              </InputLabel>
              <img alt={full_name} src={file_done.url} />
            </FormControl>
          </div>
        );
      }

      dialogContent = (
        <DialogContent>
          <form className="row" noValidate autoComplete="off">
            <div className="col-12 col-lg-8">
              <TextField
                id="creator"
                label="Diminta Oleh"
                value={device_type === 'apps' ? full_name : `${name} [${device_type.toUpperCase()}]`}
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12 col-lg-4">
              <TextField
                id="phone_no"
                label="Nomor Telepon"
                value={phone_no}
                margin="normal"
                disabled
                fullWidth
              />
            </div>

            <div className="col-12 col-md-4">
              <TextField
                id="type"
                label="Tipe"
                value={type_description.name}
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12 col-md-4">
              <TextField
                id="status"
                label="Status"
                value={status_description.name}
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12 col-md-4">
              <TextField
                id="id_finish_type"
                label="Alasan Selesai"
                value={finish_description ? finish_description.name : '-'}
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12">
              <TextField
                id="description"
                label="Deskripsi"
                placeholder="Deskripsi kejadian"
                value={description || '-'}
                multiline
                rowsMax="3"
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12">
              <TextField
                id="generated_place"
                label="Nama Lokasi"
                value={generated_place || '-'}
                multiline
                rowsMax="3"
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12">
              <SimpleMap
                lat={panic_detail.latitude}
                lng={panic_detail.longitude}
                title="Darurat"
              />
            </div>
            <div className="col-12">
              <TextField
                id="notes"
                name="notes"
                label="Catatan"
                value={notes || '-'}
                multiline
                onChange={this.handleInputChange}
                rowsMax="7"
                margin="normal"
                fullWidth
                disabled={is_disabled_field}
              />
            </div>
            {finishContent}
            { helperContent }
          </form>
        </DialogContent>
      );

      if ([1, 2].includes(status)) {
        dialogAction = (
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="default">
              Tutup
            </Button>
            <Button onClick={this.handleFinish} color="primary">
              Selesaikan
            </Button>
          </DialogActions>
        );
      } else {
        dialogAction = (
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="default">
              Tutup
            </Button>
          </DialogActions>
        );
      }
    }
    return (
      <Dialog
        open
        TransitionComponent={Slide}
        onClose={this.handleRequestClose}
        maxWidth="lg"
      >
        <DialogTitle>Detail Darurat</DialogTitle>
        {dialogContent}
        {dialogAction}
      </Dialog>
    );
  }
}

export default PanicDetail;
