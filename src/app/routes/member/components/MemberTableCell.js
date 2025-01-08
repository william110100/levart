import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { fullTime } from '../../../../util/TimeConverter';

class MemberTableCell extends React.Component {
  handleOpenDetail = () => {
    const { openDetail, onDetailClick, data } = this.props;
    openDetail(true);
    onDetailClick(data.uid);
  };

  render(ctx) {
    const { number, data } = this.props;
    const {
      uid, full_name, phone_no, email, created_at, profile_picture
    } = data;
    return (
      <tr tabIndex={-1} key={uid} onClick={this.handleOpenDetail}>
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
        <td>{phone_no}</td>
        <td>{email}</td>
        <td>{fullTime(created_at)}</td>
      </tr>
    );
  }
}

export default MemberTableCell;
