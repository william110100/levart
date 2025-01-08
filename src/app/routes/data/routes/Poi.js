import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ContainerHeader from '../../../../components/ContainerHeader';
import PoiTable from '../components/PoiTable';

const types = [
  { id: 0, value: 'All' },
  { id: 1, value: 'Polisi' },
  { id: 2, value: 'Rumah Sakit' },
  { id: 3, value: 'Pemadam Kebakaran' },
  { id: 4, value: 'Ambulans' }
];

class Poi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0
    };
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value
    });
  };

  render(ctx) {
    const { match } = this.props;
    const { type } = this.state;
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader match={match} title="POI List" />
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
                        <MenuItem key={option.value} value={option.id}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </form>
              </div>
              <div className="p-4">
                <PoiTable type={type} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Poi;
