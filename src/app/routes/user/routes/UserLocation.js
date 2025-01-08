import React from 'react';
import TextField from '@material-ui/core/TextField';
import ContainerHeader from '../../../../components/ContainerHeader';
import LocationTable from '../components/LocationTable';

class UserLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_user: ''
    };
  }

  componentDidMount = async () => {
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const {match} = this.props;
    const {id_user} = this.state;
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader match={match} title="Lokasi" />
        <div className="row mb-md-3">
          <div className="col-12">
            <div className="jr-card p-0">
              <div className="jr-card-header card-img-top mb-0 p-4 bg-grey lighten-4">
                <h3 className="card-heading">Filter</h3>
                <form className="row" noValidate autoComplete="off">
                  <div className="col-md-3 col-12">
                    <TextField
                      id="id"
                      label="ID MS"
                      name="id_user"
                      placeholder="10 digit ID"
                      maxLength="10"
                      value={id_user}
                      onChange={this.handleInputChange}
                      margin="normal"
                      fullWidth
                  />
                  </div>
                </form>
              </div>
              <div className="p-4">
                <LocationTable id_user={id_user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserLocation;
