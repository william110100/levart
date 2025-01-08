import React from 'react';

function TableCell(props) {
  const {
    openDetail, onDetailClick, number, data
  } = props;
  const {
    id, name, latitude, longitude
  } = data;

  const handleOpenDetail = () => {
    openDetail(true);
    onDetailClick(data.id);
  };

  return (
    <tr tabIndex={-1} key={id} onClick={handleOpenDetail}>
      <td>{number}</td>
      <td>{name}</td>
      <td>{latitude}</td>
      <td>{longitude}</td>
    </tr>
  );
}

export default TableCell;
