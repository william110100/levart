import axios from '../util/Api';
import {getDetail, getList} from './master';

export const getReports = ({
  type, page, limit
}) => getList({
  url: '/reports', type, page, limit
});

export const getReportDetail = async (id) => getDetail({
  url: '/reports', id
});

export const generateQR = async () => {
  try {
    const { data: response } = await axios.get('reports/generate-qr');
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

export const updateReport = async (id, payload) => {
  try {
    const { data: response } = await axios.put(`/reports/${id}`, payload);
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
