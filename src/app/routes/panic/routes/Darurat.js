import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ContainerHeader from '../../../../components/ContainerHeader';
import PanicTable from '../components/PanicTable';

const statuses = [
  {
    value: 0,
    label: 'All',
  },
  {
    value: 1,
    label: 'Requested',
  },
  {
    value: 2,
    label: 'On Progress',
  },
  {
    value: 3,
    label: 'Finished',
  },
  {
    value: 4,
    label: 'Canceled',
  },
  {
    value: 5,
    label: 'Rejected',
  },
];

class Darurat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0
    };
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {match} = this.props;
    const {status} = this.state;
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader match={match} title="Daftar Kedaruratan" />
        <div className="row mb-md-3">
          <div className="col-12">
            <div className="jr-card p-0">
              <div className="jr-card-header card-img-top mb-0 p-4 bg-grey lighten-4">
                <h3 className="card-heading">Filter</h3>
                <form className="row" noValidate autoComplete="off">
                  <div className="col-md-3 col-12">
                    <TextField
                      id="status"
                      select
                      label="Status"
                      value={status}
                      onChange={this.handleChange('status')}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                    >
                      {statuses.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </form>
              </div>
              <div className="p-4">
                <PanicTable status={status} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Darurat;
