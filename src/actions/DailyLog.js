import { getDetail, getList } from './master';

export const getDailyLogs = ({
  full_name, start_date, end_date, page, limit
}) => getList({
  url: '/daily-logs',
  full_name,
  start_date,
  end_date,
  page,
  limit
});

export const detailDailyLog = async (id) => getDetail({url: '/daily-logs', id});
