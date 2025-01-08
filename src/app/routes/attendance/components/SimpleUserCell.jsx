import React from 'react';

function SimpleUserCell(props) {
  const {
    openDetail, onDetailClick, number, data
  } = props;
  const {
    id_user, user
  } = data;

  const handleOpenDetail = () => {
    openDetail(true);
    onDetailClick(data.id_user);
  };

  return (
    <tr tabIndex={-1} key={id_user} onClick={handleOpenDetail}>
      <td>{number}</td>
      <td>{id_user}</td>
      <td>{user.full_name}</td>
    </tr>
  );
}

export default SimpleUserCell;
