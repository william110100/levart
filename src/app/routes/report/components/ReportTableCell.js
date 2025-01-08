import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {fullTime} from '../../../../util/TimeConverter';

class ReportTableCell extends React.Component {
  handleOpenDetail = () => {
    const { openDetail, onDetailClick, data } = this.props;
    openDetail(true);
    onDetailClick(data.id);
  };

  render(ctx) {
    const { number, data } = this.props;
    const {
      report_id,
      creator,
      created_at,
      type_description,
      status_description
    } = data;
    const { full_name, profile_picture } = creator;
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
      <tr tabIndex={-1} key={report_id} onClick={this.handleOpenDetail}>
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
              </h5>
            </div>
          </div>
        </td>
        <td>{fullTime(created_at)}</td>
        <td>{type_description.name}</td>
        <td className="status-cell text-right">
          <div className={` badge text-uppercase ${statusStyle}`}>
            {status_description.name}
          </div>
        </td>
      </tr>
    );
  }
}

export default ReportTableCell;
