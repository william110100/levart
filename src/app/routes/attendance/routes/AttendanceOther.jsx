import React, { useState } from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import AttendanceOtherTable from '../components/AttendanceOtherTable';
import ContainerHeader from '../../../../components/ContainerHeader';

const typeOptions = [
  {id: '5,6,7,9,11,10', name: 'All'},
  {id: '5', name: 'Meeting'},
  {id: '6', name: 'Cuti'},
  {id: '7', name: 'Lembur'},
  {id: '9', name: 'Sakit'},
  {id: '11', name: 'Dinas'},
  {id: '10', name: 'Izin Lainnya'},
];

function AttendanceOther(props) {
  const { match } = props;
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [idUser, setIdUser] = useState('');
  const [types, setTypes] = useState(typeOptions[0].id);

  const handleStartDateChange = (start_date) => {
    setStartDate(moment(start_date).format('YYYY-MM-DD'));
  };

  const handleEndDateChange = (end_date) => {
    setEndDate(moment(end_date).format('YYYY-MM-DD'));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'id') setIdUser(value);
  };

  const handleChange = () => (event) => {
    setTypes(event.target.value);
  };

  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader match={match} title="Kehadiran Lainnya" />
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card p-0">
            <div className="jr-card-header card-img-top mb-0 p-4 bg-grey lighten-4">
              <h3 className="card-heading">Filter</h3>
              <form className="row" noValidate autoComplete="off">
                <div className="col-md-3 col-12">
                  <TextField
                    label="Tipe Kehadiran"
                    id="types"
                    name="types"
                    margin="normal"
                    fullWidth
                    select
                    value={types}
                    onChange={handleChange('types')}
                  >
                    {typeOptions.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
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
              </form>
            </div>
            <div className="p-4">
              <AttendanceOtherTable types={types} start_date={startDate} end_date={endDate} idUser={idUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceOther;
