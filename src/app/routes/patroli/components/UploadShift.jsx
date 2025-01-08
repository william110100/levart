import React, { useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { uploadShift } from '../../../../actions/PatroliSchedule';

const months = [
  {id: 1, name: 'January'},
  {id: 2, name: 'February'},
  {id: 3, name: 'March'},
  {id: 4, name: 'April'},
  {id: 5, name: 'May'},
  {id: 6, name: 'June'},
  {id: 7, name: 'July'},
  {id: 8, name: 'August'},
  {id: 9, name: 'September'},
  {id: 10, name: 'October'},
  {id: 11, name: 'November'},
  {id: 12, name: 'December'},
];

function UploadShift(props) {
  const { refresh, openNew } = props;
  const [idYear, setIdYear] = useState('');
  const [idMonth, setIdMonth] = useState('');

  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  let dialogAction;

  const handleRequestClose = () => {
    openNew(false);
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (name) => (event) => {
    if (name === 'idYear') setIdYear(event.target.value);
    else if (name === 'idMonth') setIdMonth(event.target.value);
  };

  const handleUpload = async () => {
    setProcessing(true);
    const payload = new FormData();
    payload.append('id_year', idYear);
    payload.append('id_month', idMonth);
    payload.append('file', file);

    const { status, message, total } = await uploadShift(payload);
    setProcessing(false);
    if (status) {
      alert(`Added ${total} data`);
      refresh();
      handleRequestClose();
      return true;
    }
    alert(message);
    return false;
  };

  if (processing) {
    dialogAction = (
      <DialogActions>
        <CircularProgress />
      </DialogActions>
    );
  } else {
    dialogAction = (
      <DialogActions>
        <Button onClick={handleRequestClose} color="default">
          Tutup
        </Button>
        <Button onClick={handleUpload} color="primary">
          Unggah
        </Button>
      </DialogActions>
    );
  }

  return (
    <Dialog
      open
      TransitionComponent={Slide}
      onClose={handleRequestClose}
      maxWidth="lg"
    >
      <DialogTitle>Unggah Penjadwalan Patroli</DialogTitle>
      <DialogContent>
        <form className="row" noValidate autoComplete="off">
          <div className="col-12 col-md-6">
            <TextField
              id="id_year"
              select
              label="Year"
              value={idYear}
              onChange={handleChange('idYear')}
              SelectProps={{}}
              margin="normal"
              fullWidth
            >
              {[2020, 2021, 2022, 2023, 2024, 2025].map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="col-12 col-md-6">
            <TextField
              id="id_month"
              select
              label="Month"
              value={idMonth}
              onChange={handleChange('idMonth')}
              SelectProps={{}}
              margin="normal"
              fullWidth
            >
              {months.map((y) => (
                <MenuItem key={y.id} value={y.id}>
                  {y.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="col-12">
            <FormControl style={{marginTop: '16px'}} fullWidth margin="normal">
              <InputLabel htmlFor="file" shrink>
                File Penjadwalan Patroli
              </InputLabel>
              <Input type="file" name="file" inputProps={{ accept: '.xlsx,application/vnd.ms-excel' }} id="file" onChange={handleFileUpload} />
            </FormControl>
          </div>
        </form>
      </DialogContent>
      {dialogAction}
    </Dialog>
  );
}

export default UploadShift;
