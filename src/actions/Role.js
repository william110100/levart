import { getList } from './master';

export const getRoles = () => getList({
  url: '/roles'
});
