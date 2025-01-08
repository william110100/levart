import { getList, getDetail } from './master';
import axios from '../util/Api';

export const getPatroli = ({
  full_name, page, limit
}) => getList({
  url: '/patroli',
  full_name,
  page,
  limit
});

export const detailPatroli = ({id}) => getDetail({
  url: '/patroli',
  id
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
