import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { getUsers } from '../../../../actions/User';
import ContainerHeader from '../../../../components/ContainerHeader';
import PatroliTable from '../components/PatroliTable';

function PatroliList(props) {
  const { match } = props;
  const [users, setUsers] = useState([]);
  const [fullName, setFullName] = useState();
  const [openUserSearch, setOpenUserSearch] = useState(false);
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

  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader match={match} title="Patroli List" />
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card p-0">
            <div className="jr-card-header card-img-top mb-0 p-4 bg-grey lighten-4">
              <h3 className="card-heading">Filter</h3>
              <form className="row" noValidate autoComplete="off">
                <Autocomplete
                  id="search-user"
                  className="col-md-3 col-12"
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
              </form>
            </div>
            <div className="p-4">
              <PatroliTable fullName={fullName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatroliList;
