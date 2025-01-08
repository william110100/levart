import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { fullTime } from '../../../../util/TimeConverter';

class PanicTableCell extends React.Component {
  handleOpenDetail = () => {
    const { openDetail, onDetailClick, data } = this.props;
    openDetail(true);
    onDetailClick(data.id);
  };

  render(ctx) {
    const { number, data } = this.props;
    const {
      panic_id,
      creator,
      device_type,
      device_creator,
      created_at,
      status_description
    } = data;
    const { full_name, profile_picture } = creator || {};
    const { name } = device_creator || {};
    let statusStyle;
    switch (status_description.id) {
      case 1:
        statusStyle = 'text-white bg-danger';
        break;
      case 2:
        statusStyle = 'text-white bg-warning';
        break;
      case 3:
        statusStyle = 'text-white bg-success';
        break;
      case 4:
        statusStyle = 'text-white bg-grey';
        break;
      default:
        statusStyle = 'bg-light';
    }
    return (
      <tr tabIndex={-1} key={panic_id} onClick={this.handleOpenDetail}>
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
                {device_type === 'apps' ? full_name : `${name} [${device_type.toUpperCase()}]` }
              </h5>
            </div>
          </div>
        </td>
        <td>{fullTime(created_at)}</td>
        <td className="status-cell text-right">
          <div className={` badge text-uppercase ${statusStyle}`}>
            {status_description.name}
          </div>
        </td>
      </tr>
    );
  }
}

export default PanicTableCell;
