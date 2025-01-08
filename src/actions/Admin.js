import axios from '../util/Api';

export const updateMyAdmin = async (payload) => {
  try {
    const {data: response} = await axios.put('/users/me', payload);
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
