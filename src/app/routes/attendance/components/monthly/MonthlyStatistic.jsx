import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {groupBy, isEmpty} from 'lodash';
import {
  Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';
import { getUserGroupDate } from '../../../../../actions/AttendanceSchedule';

const counterDescription = (data, key) => {
  let r = 0;
  data.forEach((d) => {
    if (d === key) r++;
  });
  return r;
};

const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};

function MonthlyStatistic(props) {
  const {
    id_checkpoint, start_date, end_date
  } = props;
  const [init, setInit] = useState(true);
  const [data, setData] = useState([]);

  const paddingDate = (data, key) => {
    const result = [];
    const lastDate = moment(start_date).endOf('month').format('D');
    for (let i = 0; i < lastDate; i++) {
      if (data[i]) result.push(data[i][key]);
      else result.push('');
    }
    return result;
  };

  const refreshList = async ({
    id_checkpoint, start_date, end_date
  }) => {
    setInit(true);
    const { data, status } = await getUserGroupDate({
      start_date,
      end_date,
      id_checkpoint
    });
    if (status) {
      const grouped = groupBy(data, 'full_name');
      const arrGroup = [];
      let attendances = [];
      const keys = Object.keys(grouped);
      for (let i = 0; i < keys.length; i++) {
        attendances = paddingDate(grouped[keys[i]], 'description');
        arrGroup.push({
          name: keys[i],
          hadir: counterDescription(attendances, 'H'),
          cuti: counterDescription(attendances, 'C'),
          lembur: counterDescription(attendances, 'L'),
          sakit: counterDescription(attendances, 'S'),
          izin: counterDescription(attendances, 'I'),
          alpha: counterDescription(attendances, 'A'),
          off: counterDescription(attendances, 'OFF')
        });
      }
      setData(sliceIntoChunks(arrGroup, 10));
      setInit(false);
    } else {
      setData([]);
      setInit(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await refreshList({
        id_checkpoint, start_date, end_date
      });
    }

    fetchData();
  }, [id_checkpoint, start_date, end_date]);

  if (init) {
    return <div>Memuat data...</div>;
  }
  if (isEmpty(data)) {
    return <div>Data tidak tersedia.</div>;
  }

  let chart = null;
  if (data) {
    chart = data.map((d, idx) => (
      <ResponsiveContainer width="100%" height={200} key={idx}>
        <BarChart
          data={d}
          margin={{
            top: 10, right: 0, left: -25, bottom: 0
          }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="hadir" fill="#53B151" />
          <Bar dataKey="cuti" fill="#4472C4" />
          <Bar dataKey="lembur" fill="#0D0D0D" />
          <Bar dataKey="sakit" fill="#1F3763" />
          <Bar dataKey="izin" fill="#7035A0" />
          <Bar dataKey="alpha" fill="#EE462F" />
          <Bar dataKey="off" fill="#FFC000" />
        </BarChart>
      </ResponsiveContainer>
    ));
  }
  return chart;
}

export default MonthlyStatistic;
