import { getDetail, getList } from './master';
import axios from '../util/Api';

export const getShifts = ({
  start_date, end_date, time, id_user, id_checkpoint, id_role, page, limit
}) => getList({
  url: '/attendance-schedules',
  start_date,
  end_date,
  time,
  id_user,
  id_checkpoint,
  id_role,
  page,
  limit
});

export const getUserShift = ({
  start_date, end_date, page, limit
}) => getList({
  url: '/attendance-schedules/users',
  start_date,
  end_date,
  page,
  limit
});

export const getUserGroupDate = ({
  start_date, end_date, id_checkpoint
}) => getList({
  url: '/attendance-schedules/group/month',
  start_date,
  end_date,
  id_checkpoint
});

export const detailShift = async (id) => getDetail({ url: '/attendance-schedules', id });

export const uploadShift = async (payload) => {
  try {
    const { data: response } = await axios.post('/attendance-schedules', payload);
    return response;
  } catch (error) {
    console.error('Error****:', error.message);
    return null;
  }
};
