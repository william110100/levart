import React from 'react';
import {withRouter} from 'react-router-dom';
import Menu from './Menu';

class TopNav extends React.Component {

  render() {
    const {styleName} = this.props;
    return (
      <div className={`app-top-nav d-none d-md-block ${styleName}`}>
        <div className="d-flex app-toolbar align-items-center">
          <Menu />
        </div>
      </div>
    );
  }
}

export default withRouter(TopNav);

TopNav.defaultProps = {
  styleName: ''
};
