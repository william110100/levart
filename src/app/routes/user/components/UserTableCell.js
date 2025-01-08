import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { fullTime } from '../../../../util/TimeConverter';

class UserTableCell extends React.Component {

  handleOpenDetail = () => {
    const { openDetail, onDetailClick, data } = this.props;
    openDetail(true);
    onDetailClick(data.id);
  };

  render(ctx) {
    const { number, data } = this.props;
    const {
      id, full_name, created_at, profile_picture, role_description
    } = data;
    return (
      <tr tabIndex={-1} key={id} onClick={this.handleOpenDetail}>
        <td>{number}</td>
        <td>
          <div className="user-profile d-flex flex-row align-items-center">
            <Avatar
              alt={full_name}
              src={profile_picture ? profile_picture.url : null}
              className="user-avatar"
            />
            <div className="user-detail">
              <h5 className="user-name">
                {full_name}
                {' '}
              </h5>
            </div>
          </div>
        </td>
        <td>{role_description.name}</td>
        <td>{fullTime(created_at)}</td>
      </tr>
    );
  }
}

export default UserTableCell;
