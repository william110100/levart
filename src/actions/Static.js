import axios from 'util/Api';
import {getDetail} from './master';

/**
 * Get privacy policy
 * @param id
 * @returns {Promise<null|*>}
 */
export const getStatic = async (id) => getDetail({ url: '/statics', id });

/**
 * Update static data
 * @param id
 * @param payload
 * @returns {Promise<null|*>}
 */
export const updateStatic = async (id, payload) => {
  try {
    const {data: response} = await axios.put(`/statics/${id}`, payload);
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
