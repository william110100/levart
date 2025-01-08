import React from 'react';
import moment from 'moment';

class PoiTableCell extends React.Component {
  handleOpenDetail = () => {
    const { openDetail, onDetailClick, data } = this.props;
    openDetail(true);
    onDetailClick(data.id);
  };

  render(ctx) {
    const { number, data } = this.props;
    const {
      poi_id, name, phone_no, updated_at, type_description
    } = data;
    let statusStyle;
    switch (type_description.id) {
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
      <tr tabIndex={-1} key={poi_id} onClick={this.handleOpenDetail}>
        <td>{number}</td>
        <td>{name}</td>
        <td>{phone_no || '-'}</td>
        <td>{moment(updated_at).format('YYYY-MM-DD HH:mm:ss')}</td>
        <td className="status-cell text-right">
          <div className={` badge text-uppercase ${statusStyle}`}>
            {type_description.name}
          </div>
        </td>
      </tr>
    );
  }
}

export default PoiTableCell;
