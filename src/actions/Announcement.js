import axios from 'util/Api';
import {getDetail, getList} from './master';

/**
 * Get list announcement
 * @param page
 * @param limit
 * @returns {Promise<null|any>}
 */
export const getAnnouncements = ({
  page, limit
}) => getList({
  url: '/announcement/list',
  page,
  limit
});

/**
 * Get detail announcement
 * @param id
 * @returns {Promise<null|*>}
 */
export const getAnnouncement = async (id) => getDetail({
  url: '/announcement',
  id
});

/**
 * Create new announcement
 * @param payload
 * @returns {Promise<null|*>}
 */
export const createAnnouncement = async (payload) => {
  try {
    const {data: response} = await axios.post('/announcement', payload);
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

/**
 * Update announcement
 * @param id
 * @param payload
 * @returns {Promise<null|*>}
 */
export const updateAnnouncement = async (id, payload) => {
  try {
    const {data: response} = await axios.put(`/announcement/${id}`, payload);
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
