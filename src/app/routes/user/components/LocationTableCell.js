import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { fullTime } from '../../../../util/TimeConverter';

class LocationTable extends React.Component {

  handleOpenDetail = () => {
    const { openDetail, onDetailClick, data } = this.props;
    openDetail(true);
    onDetailClick(data.id);
  };

  render(ctx) {
    const { number, data } = this.props;
    const {
      id, target, created_at
    } = data;
    return (
      <tr tabIndex={-1} key={id} onClick={this.handleOpenDetail}>
        <td>{number}</td>
        <td>
          <div className="user-profile d-flex flex-row align-items-center">
            <Avatar
              alt={target.full_name}
              src={target.profile_picture ? target.profile_picture.url : null}
              className="user-avatar"
            />
            <div className="user-detail">
              <h5 className="user-name">
                {target.full_name}
                {' '}
              </h5>
            </div>
          </div>
        </td>
        <td>{target.phone_no}</td>
        <td>{fullTime(created_at)}</td>
      </tr>
    );
  }
}

export default LocationTable;
