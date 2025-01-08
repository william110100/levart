import { getList } from './master';

const masterPath = '/areas';

export const getAreas = ({
  page, limit
}) => getList({
  url: masterPath,
  page,
  limit
});
