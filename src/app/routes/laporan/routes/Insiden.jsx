import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import ContainerHeader from '../../../../components/ContainerHeader';
import Table from '../components/insiden/InsidenTable';

const types = [
  { id: 0, name: 'Semua'},
  { id: 1, name: 'Pemotongan Pipa'},
  { id: 2, name: 'Penambangan Liar'},
  { id: 3, name: 'Tanah Longsor'},
  { id: 4, name: 'Darurat Lainnya'}
];

function Insiden(props) {
  const {match} = props;
  const [type, setType] = useState(0);

  const handleType = (type) => {
    setType(type);
  };

  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader match={match} title="Laporan Insiden" />
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card p-0">
            <div className="jr-card-header card-img-top mb-0 p-4 bg-grey lighten-4">
              <h3 className="card-heading">Filter</h3>
              <form className="row" noValidate autoComplete="off">
                <div className="col-md-3 col-12">
                  <TextField
                    id="type"
                    select
                    label="Tipe"
                    value={type}
                    onChange={handleType}
                    SelectProps={{}}
                    margin="normal"
                    fullWidth
                    >
                    {types.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </form>
            </div>
            <div className="p-4">
              <Table type={type} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insiden;
