import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { userSignOut } from '../../actions';
import IntlMessages from '../../util/IntlMessages';

class UserInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      avatarSrc: 'https://via.placeholder.com/150x150',
      full_name: '-'
    };
  }

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const { auth } = this.props;
    if (auth.authUser) {
      const { profile_picture = null, full_name } = auth.authUser;
      if (profile_picture) {
        this.setState({
          full_name,
          avatarSrc: profile_picture.url,
        });
      }
    }
  }

  render() {
    const { userSignOut } = this.props;
    const {
      anchorEl, open, avatarSrc, full_name
    } = this.state;
    return (
      <div className="user-profile d-flex flex-row align-items-center">
        <Avatar
          alt="..."
          src={avatarSrc}
          className="user-avatar "
        />
        <div className="user-detail">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4 className="user-name" onClick={this.handleClick}>
            {full_name}
            {' '}
            <i
              className="zmdi zmdi-caret-down zmdi-hc-fw align-middle" />
          </h4>
        </div>
        <Menu
          className="user-info"
          id="simple-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleRequestClose}
          PaperProps={{
            style: {
              minWidth: 120,
              paddingTop: 0,
              paddingBottom: 0
            }
          }}
        >
          <MenuItem onClick={this.handleRequestClose}>
            <i className="zmdi zmdi-account zmdi-hc-fw mr-2" />
            <IntlMessages id="popup.profile" />
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <i className="zmdi zmdi-settings zmdi-hc-fw mr-2" />
            <IntlMessages id="popup.setting" />
          </MenuItem>
          <MenuItem onClick={() => {
            this.handleRequestClose();
            userSignOut();
          }}>
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2" />

            <IntlMessages id="popup.logout" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { locale } = settings;
  return { locale, auth };
};
export default connect(mapStateToProps, { userSignOut })(UserInfo);
