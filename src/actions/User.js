import axios from '../util/Api';
import { getDetail, getList } from './master';

export const getUsers = ({
  id_role, page, limit
}) => getList({
  url: '/users',
  id_role,
  page,
  limit
});

export const searchUsers = ({
  id_role, id_checkpoint, page, limit, full_name
}) => getList({
  url: '/users/search',
  id_role,
  id_checkpoint,
  full_name,
  page,
  limit
});

export const getUserDetail = async (id) => getDetail({ url: '/users', id });

export const updateUser = async (id, payload) => {
  try {
    const { data: response } = await axios.put(`/users/${id}`, payload);
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

export const resetPassword = async (payload) => {
  try {
    const { data: response } = await axios.put('/users/reset/passwodr', payload);
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

export const resetDevice = async (payload) => {
  try {
    const { data: response } = await axios.put('/users/reset/device', payload);
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

export const addUser = async (payload) => {
  try {
    const { data: response } = await axios.post('/users', payload);
    return response;
  } catch (error) {
    console.error('Error****:', error.message);
    return null;
  }
};

export const searchUser = async ({ id, phone_no }) => {
  try {
    const { data: response } = await axios.get('/users/search', { params: { id, phone_no } });
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

export const deleteUser = async (id) => {
  try {
    const { data: response } = await axios.delete(`/users/${id}`);
    return response;
  } catch (error) {
    console.error('Error****:', error.message);
    return null;
  }
};
