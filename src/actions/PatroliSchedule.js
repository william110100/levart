import { getList } from './master';
import axios from '../util/Api';

export const getSchedule = ({
  id_user, start_date, end_date
}) => getList({
  url: '/patroli-schedules',
  id_user,
  start_date,
  end_date
});

export const uploadShift = async (payload) => {
  try {
    const { data: response } = await axios.post('/patroli-schedules', payload);
    return response;
  } catch (error) {
    console.error('Error****:', error.message);
    return null;
  }
};
