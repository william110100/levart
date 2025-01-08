import React from 'react';
import { fullTime } from '../../../../../util/TimeConverter';
import { AttendanceColorAndDescriptionMapping } from '../../SummaryAttendanceHelper';

function DetailTableCell(props) {
  const {
    number, data
  } = props;
  const {
    id, id_user, user, id_shift_type, attendance, checkpoint
  } = data;
  const { start_at, end_at } = attendance || {};

  const { shiftColor, statusDesc } = AttendanceColorAndDescriptionMapping(id_shift_type, attendance);

  return (
    <tr
      style={shiftColor}
      tabIndex={-1}
      key={id}
    >
      <td>{number}</td>
      <td>{id_user}</td>
      <td>{user.full_name}</td>
      <td>{statusDesc}</td>
      <td>{checkpoint ? checkpoint.name : '-'}</td>
      <td>{start_at ? fullTime(start_at) : '-'}</td>
      <td>{end_at ? fullTime(end_at) : '-'}</td>
    </tr>
  );
}

export default DetailTableCell;
