import React from 'react';
import {connect} from 'react-redux';
import Auxiliary from 'util/Auxiliary';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '../CircularProgress/index';
import {hideMessage} from '../../actions';

class InfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.error || nextProps.message) {
      setTimeout(() => {
        nextProps.hideMessage();
      }, 3000);
    }
    return null;
  }

  render() {
    const {error, loading, message} = this.props;
    const open = error !== '' || message !== '';
    let showMessage = message;
    if (error) {
      showMessage = error;
    }

    return (
      <Auxiliary>
        {loading && (
          <div className="loader-view">
            <CircularProgress/>
          </div>
        )}

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={open}
          autoHideDuration={3000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{showMessage}</span>}
        />
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({commonData}) => {
  const {error, loading, message} = commonData;
  return {
    error,
    loading,
    message
  };
};

export default connect(mapStateToProps, {hideMessage})(InfoView);
