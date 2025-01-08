import React, { useEffect, useState } from 'react';
import {groupBy, isEmpty} from 'lodash';
import moment from 'moment';
import TableCell from './TableCell';
import '../style.css';
import { getUserGroupDate } from '../../../../../actions/AttendanceSchedule';
import DetailUserMonthlyAttendance from './DetailUserMonthlyAttendance';
import DetailOverTime from './DetailOverTime';

const initDates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

const counterDescription = (data, key) => {
  let r = 0;
  data.forEach((d) => {
    if (d === key) r++;
  });
  return r;
};

function MonthlyUserTable(props) {
  const {
    start_date, end_date
  } = props;
  const [init, setInit] = useState(true);
  const [idUser, setIdUser] = useState(0);
  const [data, setData] = useState([]);
  const [dates, setDates] = useState(initDates);
  const [openDetail, setOpenDetail] = useState(false);
  const [openOT, setOpenOT] = useState(false);
  const [totalSummary, setTotalSummary] = useState({
    hadir: 0,
    cuti: 0,
    lembur: 0,
    sakit: 0,
    izin: 0,
    alpha: 0
  });
  let detailComponent = null;

  const handleOpenDetail = (idUser) => {
    setIdUser(idUser);
    setOpenDetail(!openDetail);
  };

  const handleDetail = (idUser) => {
    if (idUser) {
      setIdUser(idUser);
    }
  };

  const handleOpenOT = (idUser) => {
    setIdUser(idUser);
    setOpenOT(!openOT);
  };

  const handleOT = (idUser) => {
    if (idUser) {
      setIdUser(idUser);
    }
  };

  const paddingDate = (data, key) => {
    const result = [];
    const dynamicDate = [];
    const lastDate = moment(start_date).endOf('month').format('D');
    for (let i = 0; i < lastDate; i++) {
      if (data[i]) result.push(data[i][key]);
      else result.push('');
      dynamicDate.push((i + 1));
    }
    setDates(dynamicDate);
    return result;
  };

  const refreshList = async ({
    start_date, end_date
  }) => {
    setInit(true);
    const { data, status } = await getUserGroupDate({
      start_date,
      end_date
    });
    if (status) {
      const grouped = groupBy(data, 'full_name');
      const arrGroup = [];
      let attendances = [];
      const totSum = {
        hadir: 0,
        cuti: 0,
        lembur: 0,
        sakit: 0,
        izin: 0,
        alpha: 0
      };
      const keys = Object.keys(grouped);
      for (let i = 0; i < keys.length; i++) {
        attendances = paddingDate(grouped[keys[i]], 'description');
        totSum.hadir += counterDescription(attendances, 'H');
        totSum.cuti += counterDescription(attendances, 'C');
        totSum.lembur += counterDescription(attendances, 'L');
        totSum.sakit += counterDescription(attendances, 'S');
        totSum.izin += counterDescription(attendances, 'I');
        totSum.alpha += counterDescription(attendances, 'A');

        arrGroup.push({
          full_name: keys[i],
          id_user: grouped[keys[i]][0].id_user,
          attendances,
          summary: {
            hadir: counterDescription(attendances, 'H'),
            cuti: counterDescription(attendances, 'C'),
            lembur: counterDescription(attendances, 'L'),
            sakit: counterDescription(attendances, 'S'),
            izin: counterDescription(attendances, 'I'),
            alpha: counterDescription(attendances, 'A')
          }
        });
      }
      setData(arrGroup);
      setInit(false);
      setTotalSummary(totSum);
    } else {
      setData([]);
      setInit(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await refreshList({
        start_date, end_date
      });
    }

    fetchData();
  }, [start_date, end_date]);

  if (init) {
    return <div>Memuat data...</div>;
  }
  if (isEmpty(data)) {
    return <div>Data tidak tersedia.</div>;
  }

  if (openDetail) {
    detailComponent = (
      <DetailUserMonthlyAttendance
        id_user={idUser}
        start_date={start_date}
        end_date={end_date}
        openDetail={handleOpenDetail}
            />
    );
  }

  if (openOT) {
    detailComponent = (
      <DetailOverTime
        id_user={idUser}
        start_date={start_date}
        end_date={end_date}
        openDetail={handleOpenOT}
            />
    );
  }

  return (
    <div className="table-responsive-material">
      <div className="row">
        <div className="col-2">Keterangan</div>
      </div>
      <div className="row">
        <div className="col-2">
          H: Hadir
          <br />
          C: Cuti
          <br />
          L: Lembur
        </div>
        <div className="col-2">
          S: Sakit
          <br />
          I: Izin
          <br />
          A: Alpha
        </div>
      </div>
      <table className="default-table table table-sm table-hover">
        <thead className="th-border-b">
          <tr>
            <th rowSpan={2} style={{borderRight: '1px solid #ced4da'}}>No.</th>
            <th rowSpan={2} style={{borderRight: '1px solid #ced4da'}}>ID User</th>
            <th rowSpan={2} style={{}}>Nama Lengkap</th>
            <th rowSpan={2} style={{borderRight: '1px solid #ced4da'}}> </th>
            <th colSpan={dates.length} style={{textAlign: 'center'}}>Tanggal</th>
            <th colSpan={6} align="center" style={{ textAlign: 'center', borderLeft: '1px solid rgba(224, 224, 224, 1)'}}>Jumlah</th>
          </tr>
          <tr>
            {dates.map((d, idx) => (
              <th key={idx} align="right" style={{ borderRight: '1px solid #ced4da' }}>
                <div style={{width: '26px'}}>{d}</div>
              </th>
            ))}
            <th style={{ borderRight: '1px solid #ced4da'}}>Hadir</th>
            <th style={{ borderRight: '1px solid #ced4da'}}>Cuti</th>
            <th style={{ borderRight: '1px solid #ced4da'}}>Lembur</th>
            <th style={{ borderRight: '1px solid #ced4da'}}>Sakit</th>
            <th style={{ borderRight: '1px solid #ced4da'}}>Izin</th>
            <th>Alpha</th>
          </tr>
        </thead>
        <tbody>
          {data.map((n, idx) => (
            <TableCell key={idx} number={idx + 1} data={n} openDetail={handleOpenDetail} onDetailClick={handleDetail} openOT={handleOpenOT} onOTClick={handleOT} />
          ))}
          <tr>
            <td
              rowSpan={14 + dates.length}
              style={{
                borderRight: '1px solid #ced4da', borderBottom: '1px solid #ced4da', borderTop: 0, textAlign: 'center'
              }}>
              Total
            </td>
            <td style={{ borderRight: '1px solid #ced4da', borderBottom: '1px solid #ced4da', borderTop: 0}}>{totalSummary.hadir}</td>
            <td style={{ borderRight: '1px solid #ced4da', borderBottom: '1px solid #ced4da', borderTop: 0}}>{totalSummary.cuti}</td>
            <td style={{ borderRight: '1px solid #ced4da', borderBottom: '1px solid #ced4da', borderTop: 0}}>{totalSummary.lembur}</td>
            <td style={{ borderRight: '1px solid #ced4da', borderBottom: '1px solid #ced4da', borderTop: 0}}>{totalSummary.sakit}</td>
            <td style={{ borderRight: '1px solid #ced4da', borderBottom: '1px solid #ced4da', borderTop: 0}}>{totalSummary.izin}</td>
            <td style={{ borderRight: 0, borderBottom: '1px solid #ced4da', borderTop: 0}}>{totalSummary.alpha}</td>
          </tr>
        </tbody>
      </table>
      <br />
      { detailComponent }
    </div>
  );
}

export default MonthlyUserTable;
