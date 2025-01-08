import { getDetail, getList } from './master';

export const getUserLocations = ({
  page, limit, id_user
}) => getList({
  url: '/locations/request',
  page,
  limit,
  id_user
});

export const getDetailUserLocation = async (id) => getDetail({url: '/locations/request', id});
