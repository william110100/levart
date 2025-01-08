import React from 'react';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';

class TableCell extends React.Component {
  handleOpenDetail = () => {
    const { openDetail, onDetailClick, data } = this.props;
    openDetail(true);
    onDetailClick(data.id);
  };

  render(ctx) {
    const { number, data } = this.props;
    const {
      id, creator, title, created_at
    } = data;
    return (
      <tr tabIndex={-1} key={id} onClick={this.handleOpenDetail}>
        <td>{number}</td>
        <td>
          <div className="user-profile d-flex flex-row align-items-center">
            <Avatar
              alt={creator.full_name}
              src={creator.profile_picture ? creator.profile_picture.url : null}
              className="user-avatar"
            />
            <div className="user-detail">
              <h5 className="user-name">
                {creator.full_name}
                {' '}
              </h5>
            </div>
          </div>
        </td>
        <td>{title}</td>
        <td>{moment(created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
      </tr>
    );
  }
}

export default TableCell;
