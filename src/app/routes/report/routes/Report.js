import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ContainerHeader from '../../../../components/ContainerHeader';
import ReportTable from '../components/ReportTable';

const types = [
  {
    value: 0,
    label: 'All'
  },
  {
    value: 1,
    label: 'Kekerasan Pada Perempuan dan Anak'
  },
  {
    value: 2,
    label: 'Kebakaran'
  },
  {
    value: 3,
    label: 'Permintaan Penyelamatan Manusia'
  },
  {
    value: 4,
    label: 'Kedaruratan Medis'
  },
  {
    value: 5,
    label: 'Kriminal'
  },
  {
    value: 6,
    label: 'Ketentraman dan Ketertiban Umum'
  },
  {
    value: 7,
    label: 'Kecelakaan'
  },
  {
    value: 8,
    label: 'Hewan Liar'
  },
  {
    value: 9,
    label: 'Tanah Longsor'
  },
  {
    value: 10,
    label: 'Cuaca Ekstrim'
  },
  {
    value: 11,
    label: 'Banjir'
  },
  {
    value: 12,
    label: 'Pohon Tumbang'
  },
  {
    value: 13,
    label: 'Permasalahan Lalu Lintas'
  },
  {
    value: 14,
    label: 'Evakuasi Mayat'
  },
  {
    value: 15,
    label: 'Kerusakan Konstruksi'
  },
  {
    value: 16,
    label: 'Covid-19'
  },
  {
    value: -1,
    label: 'Lainnya'
  },
];

const statuses = [
  {
    value: 0,
    label: 'All'
  },
  {
    value: 1,
    label: 'Reported'
  },
  {
    value: 2,
    label: 'On Progress'
  },
  {
    value: 3,
    label: 'Finished'
  },
  {
    value: 4,
    label: 'Rejected'
  }
];

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      status: 0
    };
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { match } = this.props;
    const { type, status } = this.state;
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader match={match} title="Report List" />
        <div className="row mb-md-3">
          <div className="col-12">
            <div className="jr-card p-0">
              <div className="jr-card-header card-img-top mb-0 p-4 bg-grey lighten-4">
                <h3 className="card-heading">Filter</h3>
                <form className="row" noValidate autoComplete="off">
                  <div className="col-md-3 col-12">
                    <TextField
                      id="select-type"
                      select
                      label="Type"
                      value={type}
                      onChange={this.handleChange('type')}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                    >
                      {types.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="col-md-3 col-12">
                    <TextField
                      id="select-status"
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
                <ReportTable type={type} status={status} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Report;
