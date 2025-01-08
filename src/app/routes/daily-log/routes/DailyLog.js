import React, { useState } from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DailyLogTable from '../components/DailyLogTable';
import ContainerHeader from '../../../../components/ContainerHeader';

function DailyLog(props) {
  const { match } = props;
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));

  const handleStartDate = (startDate) => {
    setStartDate(moment(startDate).format('YYYY-MM-DD'));
  };

  const handleEndDate = (endDate) => {
    setEndDate(moment(endDate).format('YYYY-MM-DD'));
  };

  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader match={match} title="Log Harian" />
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
                      onChange={handleStartDate}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className="col-md-3 col-12">
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      label="Tanggal Selesai"
                      id="end_date"
                      name="end_date"
                      margin="normal"
                      disableFuture
                      fullWidth
                      format="DD-MM-YYYY"
                      value={endDate}
                      onChange={handleEndDate}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </form>
            </div>
            <div className="p-4">
              <DailyLogTable start_date={startDate} end_date={endDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyLog;
