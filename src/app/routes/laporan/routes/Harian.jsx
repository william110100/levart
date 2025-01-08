import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import TextField from '@material-ui/core/TextField';
import ContainerHeader from '../../../../components/ContainerHeader';
import { getUsers } from '../../../../actions/User';
import Table from '../components/harian/HarianTable';

function Harian(props) {
  const { match } = props;
  const [users, setUsers] = useState([]);
  const [fullName, setFullName] = useState();
  const [openUserSearch, setOpenUserSearch] = useState(false);
  const [startDate, setStartDate] = useState(moment().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const loading = openUserSearch && users.length === 0;

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    (async () => {
      const { data: users } = await getUsers({ page: 1, limit: 1000 });
      setUsers(users);
    })();
    return () => true;
  }, [loading]);

  const handleStartDate = (startDate) => {
    setStartDate(moment(startDate).format('YYYY-MM-DD'));
  };

  const handleEndDate = (endDate) => {
    setEndDate(moment(endDate).format('YYYY-MM-DD'));
  };

  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader match={match} title="Laporan Harian" />
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card p-0">
            <div className="jr-card-header card-img-top mb-0 p-4 bg-grey lighten-4">
              <h3 className="card-heading">Filter</h3>
              <form className="row" noValidate autoComplete="off">
                <Autocomplete
                  id="search-user"
                  className="col-md-3 col-12"
                  style={{ width: 300 }}
                  open={openUserSearch}
                  onOpen={() => {
                    setOpenUserSearch(true);
                  }}
                  onClose={() => {
                    setOpenUserSearch(false);
                  }}
                  onChange={(event, value) => {
                    setFullName(value ? value.full_name : '');
                  }}
                  getOptionSelected={(option, value) => option.name === value.name}
                  getOptionLabel={(option) => option.full_name}
                  options={users}
                  loading={loading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nama"
                      margin="normal"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      />
                  )}
                  />
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
              <Table fullName={fullName} startDate={startDate} endDate={endDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Harian;
