import React from 'react';
import moment from 'moment';

class AnnouncementTableCell extends React.Component {
  handleOpenDetail = () => {
    const { openDetail, onDetailClick, data } = this.props;
    openDetail(true);
    onDetailClick(data.id);
  };

  render(ctx) {
    const { number, data } = this.props;
    const {
      id, title, creator, created_at
    } = data;
    return (
      <tr tabIndex={-1} key={id} onClick={this.handleOpenDetail}>
        <td>{number}</td>
        <td>{title}</td>
        <td>{creator.full_name}</td>
        <td>{moment(created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
      </tr>
    );
  }
}

export default AnnouncementTableCell;
