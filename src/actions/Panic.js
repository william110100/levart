import axios from '../util/Api';
import {getDetail, getList} from './master';

export const getPanics = async ({
  status, page, limit
}) => getList({
  url: '/panics', status, page, limit
});

export const getPanicDetail = async ({ panic_id }) => getDetail({
  url: '/panics', id: panic_id
});

export const updatePanic = async ({
  id, status, notes, id_finish_type
}) => {
  try {
    const { data: response } = await axios.put(`/panics/${id}`, {
      status,
      notes,
      id_finish_type
    });
    return response.status;
  } catch (error) {
    console.error('Error****:', error.message);
    return null;
  }
};

export const blastPanic = async (id) => {
  try {
    const {data: response} = await axios.post('/panics/blast', {
      id
    });
    return response.status;
  } catch (error) {
    console.error('Error****:', error.message);
    return null;
  }
};
