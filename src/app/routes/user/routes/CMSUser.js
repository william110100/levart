import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContainerHeader from '../../../../components/ContainerHeader';
import UserTable from '../components/UserTable';
import { getRoles } from '../../../../actions/Role';
import { getUsers } from '../../../../actions/User';
import { getCheckpoints } from '../../../../actions/Checkpoint';

function CMSUser(props) {
  const { match } = props;
  const [roles, setRoles] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);
  const [users, setUsers] = useState([]);
  const [idRole, setIdRole] = useState('');
  const [idCheckpoint, setIdCheckpoint] = useState('');
  const [fullName, setFullName] = useState();
  const [openUserSearch, setOpenUserSearch] = useState(false);
  const loading = openUserSearch && users.length === 0;

  useEffect(() => {
    (async () => {
      const { data: roles } = await getRoles();
      const { data: checkpoints } = await getCheckpoints({ page: 1, limit: 10 });
      roles.unshift({ id: 0, name: 'Semua' });
      checkpoints.unshift({ id: 0, name: 'Semua' });
      setRoles(roles);
      setCheckpoints(checkpoints);
    })();
  }, []);

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

  useEffect(() => {
    if (!openUserSearch) {
      setUsers([]);
    }
  }, [openUserSearch]);

  const handleChange = (name) => (event) => {
    if (name === 'idRole') setIdRole(event.target.value);
    else if (name === 'idCheckpoint') setIdCheckpoint(event.target.value);
  };

  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader match={match} title="Anggota" />
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card p-0">
            <div className="jr-card-header card-img-top mb-0 p-4 bg-grey lighten-4">
              <h3 className="card-heading">Filter</h3>
              <form className="row" noValidate autoComplete="off">
                <div className="col-md-3 col-12">
                  <TextField
                    id="select-role"
                    select
                    label="Wewenang"
                    value={idRole}
                    onChange={handleChange('idRole')}
                    SelectProps={{}}
                    margin="normal"
                    fullWidth
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
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
              </form>
            </div>
            <div className="p-4">
              <UserTable id_role={idRole} full_name={fullName} id_checkpoint={idCheckpoint} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CMSUser;
