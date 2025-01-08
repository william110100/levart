import axios from 'util/Api';
import {getDetail, getList} from './master';

/**
 * Get list POI
 * @param type
 * @param page
 * @param limit
 * @returns {Promise<null|any>}
 */
export const getPois = ({ type, page, limit }) => getList({
  url: '/poi/list', type, page, limit
});

/**
 * Get detail POI
 * @param id
 * @returns {Promise<null|*>}
 */
export const getPoi = async (id) => getDetail({ url: '/poi', id });

/**
 * Create new POI
 * @param payload
 * @returns {Promise<null|*>}
 */
export const createPoi = async (payload) => {
  try {
    const {data: response} = await axios.post('/poi', payload);
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
 * Update POI
 * @param id
 * @param payload
 * @returns {Promise<null|*>}
 */
export const updatePoi = async (id, payload) => {
  try {
    const {data: response} = await axios.put(`/poi/${id}`, payload);
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
