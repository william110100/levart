import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InfoView from '../components/InfoView';
import {userSignIn} from '../actions';
import logo from '../assets/images/logo.png';
import {main} from '../secrets/main';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      password: null
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {authUser, history} = this.props;
    if (authUser !== null) {
      history.push('/');
    }
  }

  render(ctx) {
    const {id, password} = this.state;
    const {userSignIn} = this.props;
    return (
      <div
        className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">
          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/" title="App" />
          </div>

          <div className="app-login-content">
            <div className="app-login-header mb-4">
              <img src={logo} alt={main.APP_NAME} title={main.APP_NAME} height />
            </div>

            <div className="app-login-form">
              <form>
                <fieldset>
                  <TextField
                    label="MS One ID"
                    fullWidth
                    onChange={(event) => this.setState({ id: event.target.value})}
                    defaultValue=""
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />
                  <TextField
                    type="password"
                    label="Password"
                    fullWidth
                    onChange={(event) => this.setState({password: event.target.value})}
                    defaultValue=""
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button
                      onClick={() => {
                        userSignIn({
                          id,
                          password
                        });
                      }}
                      variant="contained"
                      color="primary">
                      Sign In
                    </Button>
                  </div>

                </fieldset>
              </form>
            </div>
          </div>

        </div>
        <InfoView />
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {authUser} = auth;
  return {authUser};
};

export default connect(mapStateToProps, {userSignIn})(SignIn);
