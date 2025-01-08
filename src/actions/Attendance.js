import { getDetail, getList } from './master';
import axios from '../util/Api';

export const getAttendances = ({
  types, id_checkpoint, start_date, end_date, id_user, page, limit
}) => getList({
  url: '/attendances',
  start_date,
  end_date,
  id_user,
  page,
  types,
  id_checkpoint,
  limit
});

export const updateAttendances = async (id, payload) => {
  try {
    const {data: response} = await axios.put(`/attendances/${id}`, payload);
    if (response.status) {
      return response;
    }
    console.error(response.message);
    return null;
  } catch (error) {
    console.error('Error****:', error.message);
    return null;
  }
};

export const detailAttendance = async (id) => getDetail({ url: '/attendances', id });
