import axios from '../util/Api';

/**
 * Get list API
 * @param url
 * @param type
 * @param types
 * @param id_type
 * @param id_role
 * @param id_checkpoint
 * @param id_user
 * @param full_name
 * @param start_date
 * @param end_date
 * @param time
 * @param status
 * @param page
 * @param limit
 * @returns {Promise<null|any>}
 */
export const getList = async ({
  url, type, types, id_type, id_role, id_checkpoint, id_user, full_name, start_date, end_date, time, status, page, limit
}) => {
  try {
    const params = { page, limit };
    if (type) params.type = type;
    if (types) params.types = types;
    if (id_type) params.id_type = id_type;
    if (id_role) params.id_role = id_role;
    if (id_checkpoint) params.id_checkpoint = id_checkpoint;
    if (status) params.status = status;
    if (start_date) params.start_date = start_date;
    if (end_date) params.end_date = end_date;
    if (time) params.time = time;
    if (id_user) params.id_user = id_user;
    if (full_name) params.full_name = full_name;
    const { data: response } = await axios.get(url, { params });
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

/**
 * Get detail API
 * @param url
 * @param id
 * @returns {Promise<null|*>}
 */
export const getDetail = async ({url, id}) => {
  try {
    const { data: response } = await axios.get(`${url}/${id}`);
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
