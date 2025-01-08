import React from 'react';
import { onlyDate } from '../../../../util/TimeConverter';

function ShiftTableCell(props) {
  const { number, data } = props;
  const {
    id, id_user, user, date, route
  } = data;

  return (
    <tr tabIndex={-1} key={id}>
      <td>{number}</td>
      <td>{id_user}</td>
      <td>{user.full_name}</td>
      <td>{onlyDate(date)}</td>
      <td>{route ? route.map((x) => x.name).join(', ') : '-'}</td>
    </tr>
  );
}

export default ShiftTableCell;
