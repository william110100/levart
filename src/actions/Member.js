import axios from '../util/Api';
import {getDetail, getList} from './master';

export const getMembers = ({
  page, limit
}) => getList({
  url: '/user/list',
  page,
  limit
});

export const getMemberDetail = async ({user_id}) => getDetail({
  url: '/user',
  id: user_id
});

export const updateMember = async (id, payload) => {
  try {
    const {data: response} = await axios.put(`/user/${id}`, payload);
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
