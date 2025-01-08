import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { detailDailyLog } from 'actions/DailyLog';
import {fullTime} from '../../../../../util/TimeConverter';

class HarianDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      detail: null,
      selectedMarker: null
    };
  }

  componentDidUpdate = async (prevProps) => {
    this.updateOpen(prevProps);
    await this.updateId(prevProps);
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

  async updateId(prevProps) {
    const {id} = this.props;
    if (id !== prevProps.id) {
      const detail = await detailDailyLog(id);
      this.setState({
        detail
      });
    }
  }

  render(ctx) {
    const {open, detail} = this.state;
    let dialogContent;
    if (!detail) {
      dialogContent = <DialogContent>Fetching detail...</DialogContent>;
    } else {
      const {
        creator, items, created_at, updated_at
      } = detail;
      dialogContent = (
        <DialogContent>
          <form className="row" noValidate autoComplete="off">
            <div className="row col-12">
              <div className="col-12">
                <TextField
                  id="creator"
                  label="Dibuat oleh"
                  value={`${creator.id} - ${creator.full_name}`}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </div>
              {items.map((item) => 
              <>
                <div className="col-3">
                  <TextField
                    id="time_start"
                    label="Waktu Mulai"
                    value={item.time_start}
                    margin="normal"
                    disabled
                    fullWidth
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="time_end"
                    label="Waktu Selesai"
                    value={item.time_end}
                    margin="normal"
                    disabled
                    fullWidth
                  />
                </div>
                <div className="col-6">
                  <TextField
                    id="description"
                    label="Description"
                    value={item.description}
                    margin="normal"
                    multiline
                    disabled
                    fullWidth
                  />
                </div>
              </>)}
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
        <DialogTitle>Detail Laporan Harian</DialogTitle>
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

export default HarianDetail;
