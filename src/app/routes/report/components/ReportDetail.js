import React, { Component } from 'react';
import last from 'lodash/last';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import SimpleMap from '../../../../components/Maps/SimpleMap';
import { getReportDetail, updateReport } from '../../../../actions/Report';
import {
  REPORT_FINISHED,
  REPORT_ON_PROGRESS,
  REPORT_REJECTED, REPORT_REQUEST
} from '../../../../constants/Report';
import {PANIC_FINISHED, PANIC_REJECTED} from '../../../../constants/Panic';
import {fullTime} from '../../../../util/TimeConverter';

class ReportDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report_detail: null,
      notes: null,
      after_evidence: null,
      init: true
    };
  }

  componentDidMount = async () => {
    const { report_id } = this.props;
    const report_detail = await getReportDetail({ report_id });
    const last_step = last(report_detail.steps);
    const { notes = '' } = { ...last_step };
    this.setState({ report_detail, notes, init: false });
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  uploadFileHandler = (e) => {
    this.setState({
      after_evidence: e.target.files[0]
    });
  }

  handleRequestClose = () => {
    const { openDetail } = this.props;
    openDetail(false);
  };

  handleProcess = async () => {
    const { report_detail, notes, after_evidence } = this.state;
    const { refresh } = this.props;
    const payload = new FormData();
    payload.append('status', REPORT_ON_PROGRESS);
    payload.append('notes', notes);
    payload.append('image_after', after_evidence);
    await updateReport(report_detail.id, payload);
    refresh();
    this.handleRequestClose();
  };

  handleReject = async () => {
    const { report_detail, notes } = this.state;
    const { refresh } = this.props;
    const payload = {
      id: report_detail.id,
      status: REPORT_REJECTED,
      notes: notes || null
    };
    await updateReport(report_detail.id, payload);
    refresh();
    this.handleRequestClose();
  };

  handleFinish = async () => {
    const { report_detail, notes } = this.state;
    const { refresh } = this.props;
    const payload = {
      id: report_detail.id,
      status: REPORT_FINISHED,
      notes: notes || null
    };
    await updateReport(report_detail.id, payload);
    refresh();
    this.handleRequestClose();
  };

  render(ctx) {
    const { report_detail, notes, init } = this.state;
    let dialogContent;
    let dialogAction;
    if (init) {
      dialogContent = <DialogContent>Fetching detail...</DialogContent>;
    } else {
      const {
        id,
        creator: { full_name, phone_no },
        description,
        latitude,
        longitude,
        generated_place,
        status,
        created_at,
        updated_at,
        type_description,
        status_description,
        evidence,
        after_evidence,
      } = report_detail;
      const is_disabled_field = [PANIC_REJECTED, PANIC_FINISHED].includes(status);
      dialogContent = (
        <DialogContent>
          <form className="row" noValidate autoComplete="off">
            <div className="col-12 col-lg-8">
              <TextField
                id="creator"
                label="Creator"
                value={full_name}
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12 col-lg-4">
              <TextField
                id="phone_no"
                label="Phone Number"
                value={phone_no}
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-4">
              <TextField
                id="created_at"
                label="Report Time"
                value={fullTime(created_at)}
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-5">
              <TextField
                id="type"
                label="Type"
                value={type_description.name}
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-3">
              <TextField
                id="status"
                label="Status"
                value={status_description.name}
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12">
              <TextField
                id="description"
                label="Description"
                placeholder="Description"
                value={description || '-'}
                multiline
                rowsMax="3"
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12">
              <TextField
                id="generated_place"
                label="Generated Place Name"
                value={generated_place || '-'}
                multiline
                rowsMax="3"
                margin="normal"
                disabled
                fullWidth
              />
            </div>
            <div className="col-12">
              <SimpleMap
                lat={latitude}
                lng={longitude}
                title="Point of Interest"
              />
            </div>
            <div className="col-12">
              <div className="row gl-single-line">
                <GridList className="slg" cols={2}>
                  <GridListTile>
                    <img src={evidence.url || ''} alt={id} />
                    <GridListTileBar
                      title="Before"
                      titlePosition="bottom"
                      actionPosition="left"
                      classes={{
                        root: 'title-gradient-bottom',
                        title: 'text-white',
                      }}
                    />
                  </GridListTile>
                  <GridListTile>
                    <img src={after_evidence?.url || ''} alt={id} />
                    <GridListTileBar
                      title="After"
                      titlePosition="bottom"
                      actionPosition="left"
                      classes={{
                        root: 'title-gradient-bottom',
                        title: 'text-white',
                      }}
                    />
                  </GridListTile>
                </GridList>
              </div>
            </div>
            <div className="col-12">
              <input type="file" name="file" onChange={this.uploadFileHandler} />
            </div>
            <div className="col-12">
              <TextField
                id="notes"
                name="notes"
                label="Notes"
                value={notes}
                multiline
                onChange={this.handleInputChange}
                rowsMax="7"
                margin="normal"
                fullWidth
                disabled={is_disabled_field}
              />
            </div>
            <div className="col-6">
              <TextField
                id="updated_at"
                name="updated_at"
                label="Last Updated At"
                value={updated_at !== created_at ? fullTime(updated_at) : '-'}
                margin="normal"
                fullWidth
                disabled
              />
            </div>
            <div className="col-6">
              <TextField
                id="updated_by"
                name="updated_by"
                label="Last Updated By"
                value="-"
                margin="normal"
                fullWidth
                disabled
              />
            </div>
          </form>
        </DialogContent>
      );

      if (status === REPORT_REQUEST) {
        dialogAction = (
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="default">
              Close
            </Button>
            <Button onClick={this.handleReject} color="secondary">
              Reject
            </Button>
            <Button onClick={this.handleProcess} color="primary">
              Process
            </Button>
          </DialogActions>
        );
      } else if (status === REPORT_ON_PROGRESS) {
        dialogAction = (
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="default">
              Close
            </Button>
            <Button onClick={this.handleReject} color="secondary">
              Reject
            </Button>
            <Button onClick={this.handleFinish} color="primary">
              Finish
            </Button>
          </DialogActions>
        );
      } else {
        dialogAction = (
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="default">
              Close
            </Button>
          </DialogActions>
        );
      }
    }
    return (
      <Dialog
        open
        TransitionComponent={Slide}
        onClose={this.handleRequestClose}
        maxWidth="lg"
      >
        <DialogTitle>Report Detail</DialogTitle>
        {dialogContent}
        {dialogAction}
      </Dialog>
    );
  }
}

export default ReportDetail;
