import React from 'react';
import moment from 'moment';
import { fullTime } from '../../../../util/TimeConverter';

function TableCell(props) {
  const {
    openDetail, onDetailClick, number, data
  } = props;
  const {
    id, id_user, user, type, checkpoint, approval_status, approval_by, start_at, end_at
  } = data;
  let approval_description = 'Menunggu';
  let totalTime = '-';
  let cellContent;

  const handleOpenDetail = () => {
    openDetail(true);
    onDetailClick(data.id);
  };

  if (approval_status === 1) approval_description = `Disetujui oleh ${approval_by.full_name}`;
  else if (approval_status === 2) approval_description = `Ditolak oleh ${approval_by.full_name}`;

  if (type.id === 7 && start_at && end_at) {
    totalTime = Math.ceil(moment.duration(moment(end_at).diff(start_at)).asHours());
  }

  if ([1, 2, 3, 4].includes(type.id)) {
    cellContent = (
      <tr tabIndex={-1} key={id} onClick={handleOpenDetail}>
        <td>{number}</td>
        <td>{id_user}</td>
        <td>{user.full_name}</td>
        <td>{type.name}</td>
        <td>{checkpoint ? checkpoint.name : '-'}</td>
        <td>{start_at ? fullTime(start_at) : '-'}</td>
        <td>{end_at ? fullTime(end_at) : '-'}</td>
      </tr>
    );
  } else {
    cellContent = (
      <tr tabIndex={-1} key={id} onClick={handleOpenDetail}>
        <td>{number}</td>
        <td>{id_user}</td>
        <td>{user.full_name}</td>
        <td>{type.name}</td>
        <td>{approval_description}</td>
        <td>{start_at ? fullTime(start_at) : '-'}</td>
        <td>{end_at ? fullTime(end_at) : '-'}</td>
        <td>{totalTime}</td>
      </tr>
    );
  }

  return cellContent;
}

export default TableCell;
