import React from 'react';
import { fullTime } from '../../../../util/TimeConverter';
import { AttendanceColorAndDescriptionMapping } from '../SummaryAttendanceHelper';

function GeneralTableCell(props) {
  const {
    openDetail, onDetailClick, number, data
  } = props;
  const {
    id, id_user, user, id_shift_type, attendance, checkpoint
  } = data;
  const { start_at, end_at } = attendance || {};

  const handleOpenDetail = () => {
    openDetail(true);
    onDetailClick(attendance.id);
  };

  const { shiftColor, statusDesc } = AttendanceColorAndDescriptionMapping(id_shift_type, attendance);

  // if (![SHIFT_OFF, SHIFT_PERMIT].includes(id_shift_type) && attendance) {
  //   shiftColor = PRESENT.style;
  //   statusDesc = PRESENT.name;
  // }

  return (
    <tr
      style={shiftColor}
      tabIndex={-1}
      key={id}
      onClick={attendance ? handleOpenDetail : undefined}
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

export default GeneralTableCell;
