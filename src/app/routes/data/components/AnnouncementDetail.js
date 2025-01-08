import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import {createAnnouncement, getAnnouncement, updateAnnouncement} from '../../../../actions/Announcement';

class AnnouncementDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: null,
      is_fetching: true
    };
  }

  componentDidMount = async () => {
    const {id} = this.props;
    if (id) {
      const detail = await getAnnouncement(id);
      this.setState((prevState) => ({
        ...prevState,
        is_fetching: false,
        detail
      }));
    } else {
      this.setState({is_fetching: false});
    }
  }

  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState((prevState) => ({
      ...prevState,
      detail: {
        ...prevState.detail,
        [name]: value
      }
    }));
  };

  handleSave = async () => {
    const { detail } = this.state;
    const payload = {
      title: detail.title,
      content: detail.content
    };
    if (detail.id) await updateAnnouncement(detail.id, payload);
    else await createAnnouncement(payload);
    this.handleRequestClose();
  };

  handleRequestClose = () => {
    const { openDetail, refresh } = this.props;
    openDetail(false);
    refresh();
  };

  render(ctx) {
    const { detail, is_fetching } = this.state;
    let dialogContent;
    if (is_fetching) {
      dialogContent = <DialogContent>Fetching detail...</DialogContent>;
    } else {
      dialogContent = (
        <DialogContent>
          <form className="row" noValidate autoComplete="off">
            <div className="col-12">
              <TextField
                label="Title"
                id="title"
                name="title"
                required
                value={detail?.title || ''}
                onChange={this.handleInputChange}
                margin="normal"
                fullWidth
              />
            </div>
            <div className="col-12">
              <TextField
                label="Content"
                id="content"
                name="content"
                required
                rowsMax={3}
                multiline
                value={detail?.content || ''}
                onChange={this.handleInputChange}
                margin="normal"
                fullWidth
              />
            </div>
          </form>
        </DialogContent>
      );
    }
    return (
      <Dialog
        open
        TransitionComponent={Slide}
        onClose={this.handleRequestClose}
        maxWidth="lg"
      >
        <DialogTitle>Detail Announcement</DialogTitle>
        {dialogContent}
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="default">
            Close
          </Button>
          <Button onClick={this.handleSave} color="primary">
            {detail?.id ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AnnouncementDetail;
