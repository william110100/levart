import React, { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { getCheckpoints } from 'actions/Checkpoint';
import AttendanceTable from '../components/AttendanceTable';
import ContainerHeader from '../../../../components/ContainerHeader';

const TextFieldComponent = (props) => {
  return <TextField {...props} disabled={true} />
}

function Attendance(props) {
  const { match } = props;
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [checkpoints, setCheckpoints] = useState([]);
  const [idUser, setIdUser] = useState('');
  const [idCheckpoint, setIdCheckpoint] = useState(0);

  const handleStartDateChange = (start_date) => {
    setStartDate(moment(start_date).format('YYYY-MM-DD'));
  };

  const handleEndDateChange = (end_date) => {
    setEndDate(moment(end_date).format('YYYY-MM-DD'));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'id') setIdUser(value);
    if (name === 'checkpoint') setIdCheckpoint(value);
  };

  useEffect(() => {
    (async () => {
      const { data: checkpoints } = await getCheckpoints({ page: 1, limit: 10 });
      checkpoints.unshift({ id: 0, name: 'Semua' });
      setCheckpoints(checkpoints);
    })();
  }, []);

  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader match={match} title="Kehadiran" />
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card p-0">
            <div className="jr-card-header card-img-top mb-0 p-4 bg-grey lighten-4">
              <h3 className="card-heading">Filter</h3>
              <form className="row" noValidate autoComplete="off">
                <div className="col-md-3 col-12">
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      label="Tanggal Mulai"
                      id="start_date"
                      name="start_date"
                      margin="normal"
                      disableFuture
                      fullWidth
                      format="DD-MM-YYYY"
                      value={startDate}
                      onChange={handleStartDateChange}
                      TextFieldComponent={TextFieldComponent}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className="col-md-3 col-12">
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      label="Tanggal Akhir"
                      id="end_date"
                      name="end_date"
                      margin="normal"
                      disableFuture
                      fullWidth
                      format="DD-MM-YYYY"
                      value={endDate}
                      onChange={handleEndDateChange}
                      TextFieldComponent={TextFieldComponent}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className="col-md-3 col-12">
                  <TextField
                    id="id"
                    label="ID MS"
                    name="id"
                    placeholder="10 digit ID"
                    maxLength="10"
                    value={idUser}
                    onChange={handleInputChange}
                    margin="normal"
                    fullWidth
                  />
                </div>
                <div className="col-md-3 col-12">
                  <TextField
                    id="checkpoint"
                    name="checkpoint"
                    select
                    label="Terminal"
                    value={idCheckpoint}
                    onChange={handleInputChange}
                    SelectProps={{}}
                    margin="normal"
                    fullWidth
                  >
                    {checkpoints.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </form>
            </div>
            <div className="p-4">
              <AttendanceTable start_date={startDate} end_date={endDate} idUser={idUser} idCheckpoint={idCheckpoint} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
