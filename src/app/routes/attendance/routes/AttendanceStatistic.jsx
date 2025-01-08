import React, { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { getCheckpoints } from 'actions/Checkpoint';
import MonthlyStatistic from '../components/monthly/MonthlyStatistic';
import ContainerHeader from '../../../../components/ContainerHeader';

// eslint-disable-next-line react/jsx-props-no-spreading
const TextFieldComponent = (props) => <TextField {...props} disabled />;

function AttendanceShift(props) {
  const { match } = props;
  const [startDate, setStartDate] = useState(moment().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [checkpoints, setCheckpoints] = useState([]);
  const [idCheckpoint, setIdCheckpoint] = useState(1);

  const handleDateChange = (start_date) => {
    setStartDate(moment(start_date).startOf('month').format('YYYY-MM-DD'));
    if (moment(start_date).format('MM') === moment().format('MM')) setEndDate(moment().format('YYYY-MM-DD'));
    else setEndDate(moment(start_date).endOf('month').format('YYYY-MM-DD'));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'checkpoint') setIdCheckpoint(value);
  };

  useEffect(() => {
    (async () => {
      const { data: checkpoints } = await getCheckpoints({ page: 1, limit: 10 });
      setCheckpoints(checkpoints);
    })();
  }, []);

  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader match={match} title="Statistik" />
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card p-0">
            <div className="jr-card-header card-img-top mb-0 p-4 bg-grey lighten-4">
              <h3 className="card-heading">Filter</h3>
              <form className="row" noValidate autoComplete="off">
                <div className="col-md-3 col-12">
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      label="Bulan"
                      id="date"
                      name="date"
                      margin="normal"
                      disableFuture
                      fullWidth
                      format="MMMM YYYY"
                      openTo="month"
                      views={['year', 'month']}
                      value={startDate}
                      onChange={handleDateChange}
                      TextFieldComponent={TextFieldComponent}
                                        />
                  </MuiPickersUtilsProvider>
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
              <MonthlyStatistic id_checkpoint={idCheckpoint} start_date={startDate} end_date={endDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceShift;
