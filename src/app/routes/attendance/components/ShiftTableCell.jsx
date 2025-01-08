import React from 'react';
import moment from 'moment-timezone';
import { onlyDate } from '../../../../util/TimeConverter';

function ShiftTableCell(props) {
  const {
    openDetail, onDetailClick, number, data
  } = props;
  const {
    id, id_user, user, date, time_start, time_end
  } = data;

  const handleOpenDetail = () => {
    openDetail(true);
    onDetailClick(data.id);
  };

  return (
    <tr tabIndex={-1} key={id} onClick={handleOpenDetail}>
      <td>{number}</td>
      <td>{id_user}</td>
      <td>{user.full_name}</td>
      <td>{onlyDate(date)}</td>
      <td>{time_start ? moment(time_start, 'HH:mm:ss').tz('Asia/Jayapura').format('HH:mm') : '-'}</td>
      <td>{time_end ? moment(time_end, 'HH:mm:ss').tz('Asia/Jayapura').format('HH:mm') : '-'}</td>
    </tr>
  );
}

export default ShiftTableCell;
