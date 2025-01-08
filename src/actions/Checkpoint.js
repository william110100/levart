import { getDetail, getList } from './master';
import axios from '../util/Api';

const masterPath = '/checkpoints';

export const getCheckpoints = ({
  page, limit
}) => getList({
  url: masterPath,
  page,
  limit
});

export const detailCheckpoint = async (id) => getDetail({ url: masterPath, id });

export const addCheckpoint = async (payload) => {
  try {
    const { data: response } = await axios.post(masterPath, payload);
    if (response.status) {
      return response.data;
    }
    console.error(response.message);
    return null;
  } catch (error) {
    console.error('Error****:', error.message);
    return null;
  }
};

export const updateCheckpoint = async (id, payload) => {
  try {
    const { data: response } = await axios.put(`${masterPath}/${id}`, payload);
    if (response.status) {
      return response.data;
    }
    console.error(response.message);
    return null;
  } catch (error) {
    console.error('Error****:', error.message);
    return null;
  }
};
