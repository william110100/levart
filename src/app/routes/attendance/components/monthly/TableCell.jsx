/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

function TableCell(props) {
  const {
    openDetail, onDetailClick, openOT, onOTClick, number, data
  } = props;
  const {
    id_user, full_name, attendances, summary
  } = data;

  const handleOpenDetail = () => {
    openDetail(true);
    onDetailClick(id_user);
  };

  const handleOpenOT = () => {
    openOT(true);
    onOTClick(id_user);
  };

  return (
    <tr key={number} title={full_name}>
      <td style={{ borderRight: '1px solid #ced4da', borderBottom: 0, borderTop: 0}}>{number}</td>
      <td style={{ borderRight: '1px solid #ced4da', borderBottom: 0, borderTop: 0}}>{id_user}</td>
      <td onClick={handleOpenDetail} onKeyPress={handleOpenDetail} style={{ borderBottom: 0, borderTop: 0, cursor: 'pointer'}} title="Klik untuk detail">{full_name}</td>
      <td style={{ borderRight: '1px solid #ced4da', borderBottom: 0, borderTop: 0}} />
      {attendances.map((x) => (
        <td style={{ borderRight: '1px solid #ced4da', borderBottom: 0, borderTop: 0}}>{x}</td>
      ))}
      <td style={{ borderRight: '1px solid #ced4da', borderBottom: 0, borderTop: 0}}>{summary.hadir}</td>
      <td style={{ borderRight: '1px solid #ced4da', borderBottom: 0, borderTop: 0}}>{summary.cuti}</td>
      <td
        onClick={handleOpenOT}
        onKeyPress={handleOpenOT}
        style={{
          borderRight: '1px solid #ced4da', borderBottom: 0, borderTop: 0, cursor: 'pointer'
        }}>
        {summary.lembur}
      </td>
      <td style={{ borderRight: '1px solid #ced4da', borderBottom: 0, borderTop: 0}}>{summary.sakit}</td>
      <td style={{ borderRight: '1px solid #ced4da', borderBottom: 0, borderTop: 0}}>{summary.izin}</td>
      <td style={{ borderBottom: 0, borderTop: 0}}>{summary.alpha}</td>
    </tr>
  );
}

export default TableCell;
