import {getList} from './master';

export const getAttendanceShift = ({
  id_type, id_role, id_checkpoint, start_date, end_date, id_user, page, limit
}) => getList({
  url: '/attendances/shift',
  start_date,
  end_date,
  id_user,
  page,
  id_type,
  id_role,
  id_checkpoint,
  limit
});
