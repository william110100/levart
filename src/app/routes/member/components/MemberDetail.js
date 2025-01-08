import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import {getMemberDetail} from '../../../../actions/Member';
import {fullTime} from '../../../../util/TimeConverter';

class MemberDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      member_detail: null,
    };
  }

  componentDidUpdate = async (prevProps) => {
    this.updateOpen(prevProps);
    await this.updateReportId(prevProps);
  };

  handleRequestClose = () => {
    const {openDetail} = this.props;
    this.setState({open: false});
    openDetail(false);
  };

  updateOpen(prevProps) {
    const {open} = this.props;
    if (open !== prevProps.open) {
      this.setState({open});
    }
  }

  async updateReportId(prevProps) {
    const {user_id} = this.props;
    if (user_id !== prevProps.user_id) {
      const member_detail = await getMemberDetail({user_id});
      this.setState({
        member_detail,
      });
    }
  }

  render(ctx) {
    const {open, member_detail} = this.state;
    let dialogContent;
    if (!member_detail) {
      dialogContent = <DialogContent>Fetching detail...</DialogContent>;
    } else {
      const {
        email, phone_no, full_name, dob, address, zip_code, created_at, updated_at, profile_picture
      } = member_detail;
      dialogContent = (
        <DialogContent>
          <form className="row" noValidate autoComplete="off">
            <div className="pull-left col-lg-4">
              <img className="img-thumbnail rounded" src={profile_picture?.url} alt={`Profile pic:${full_name}`} />
            </div>
            <div className="row col-lg-8">
              <div className="col-12 col-lg-4">
                <TextField
                  id="full_name"
                  label="Full Name"
                  value={full_name}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </div>
              <div className="col-12 col-lg-4">
                <TextField
                  id="email"
                  label="Email"
                  value={email}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </div>
              <div className="col-6 col-lg-4">
                <TextField
                  id="phone_no"
                  label="Phone Number"
                  value={phone_no}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </div>
              <div className="col-6">
                <TextField
                  id="dob"
                  label="Date of Birth"
                  value={dob}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </div>
              <div className="col-12 col-lg-6">
                <TextField
                  id="zip_code"
                  label="Zip Code"
                  value={zip_code || ''}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </div>
              <div className="col-12">
                <TextField
                  id="address"
                  label="Address"
                  value={address || ''}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </div>
            </div>
            <div className="col-6">
              <TextField
                id="created_at"
                name="created_at"
                label="Created At"
                value={created_at ? fullTime(created_at) : '-'}
                margin="normal"
                fullWidth
                disabled
              />
            </div>
            <div className="col-6">
              <TextField
                id="updated_at"
                name="updated_at "
                label="Last Updated At"
                value={updated_at ? fullTime(updated_at) : '-'}
                margin="normal"
                fullWidth
                disabled
              />
            </div>
          </form>
        </DialogContent>
      );
    }
    return (
      <Dialog
        open={open}
        TransitionComponent={Slide}
        onClose={this.handleRequestClose}
        maxWidth="lg"
      >
        <DialogTitle>Member Detail</DialogTitle>
        {dialogContent}
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="default">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default MemberDetail;
