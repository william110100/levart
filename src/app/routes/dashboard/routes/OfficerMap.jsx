import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';
import { database } from '../../../../libraries/init-fcm';
import { MEMBER_GROUP, SPV_GROUP } from '../../../../constants/RoleGroup';
import ContainerHeader from '../../../../components/ContainerHeader';
import { getCheckpoints } from '../../../../actions/Checkpoint';
import GoogleMap from '../components/GoogleMap';
import { ImageMarker } from '../components/ImageMarker';
import {onlyDate, onlyTime} from '../../../../util/TimeConverter';
import { getAttendanceShift } from '../../../../actions/AttendanceShift';

function OfficerMap(props) {
  const { match } = props;
  const [idRole, setIdRole] = useState(MEMBER_GROUP.join(','));
  const [checkpoints, setCheckpoints] = useState([]);
  const [idCheckpoint, setIdCheckpoint] = useState(0);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const start_date = onlyDate(new Date());
  const end_date = onlyDate(new Date());
  const time = onlyTime(new Date());

  useEffect(() => {
    (async () => {
      const { data: checkpoints } = await getCheckpoints({ page: 1, limit: 100 });
      checkpoints.unshift({ id: 0, name: 'Semua' });
      setCheckpoints(checkpoints);
    })();
  }, []);

  useEffect(() => {

    (async () => {
      let { data: users } = await getAttendanceShift({
        id_role: idRole, id_checkpoint: idCheckpoint, page: 1, limit: 1000, start_date, end_date, time, id_type: '1,2,3,4'
      });

      users = _.reject(users, ['attendance', null]);

      const ref = database.ref('/last_location');
      ref.on('value', (snapshot) => {
        const markers = [];
        const sp = snapshot.val();
        let u = null;
        Object.keys(sp).forEach((k) => {
          u = _.find(users, (o) => o.user.id === k);
          if (u) {
            markers.push({
              id: u.user.id,
              lat: sp[k].latitude,
              lng: sp[k].longitude,
              id_role: u.user.id_role,
              detail: u.user,
              show: u.user.id === selectedMarker
            });
          }
        });
        setMarkers(markers);
      });
    })();
    // eslint-disable-next-line
  }, [idRole, idCheckpoint]);

  const handleChange = (name) => (event) => {
    if (name === 'idRole') setIdRole(event.target.value);
    else if (name === 'idCheckpoint') setIdCheckpoint(event.target.value);
  };

  const onMarkerClick = (detail) => {
    let index = null;
    const prevSelectedMarker = selectedMarker;
    setMarkers((p) => {
      index = p.findIndex((e) => e.id === detail.id);
      // eslint-disable-next-line no-param-reassign
      p[index].show = !p[index].show;
      if (prevSelectedMarker !== index && prevSelectedMarker !== null) {
        // eslint-disable-next-line no-param-reassign
        p[prevSelectedMarker].show = !p[prevSelectedMarker].show;
      } else if (prevSelectedMarker === index && !p[index].show) index = null;
      return [...p];
    });
    setSelectedMarker(index);
  };

  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader match={match} title="Peta Petugas" />
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card p-0">
            <div className="jr-card-header card-img-top mb-0 p-4 bg-grey lighten-4">
              <h3 className="card-heading">Filter</h3>
              <form className="row" noValidate autoComplete="off">
                <div className="col-md-3 col-12">
                  <TextField
                    id="select-role"
                    select
                    label="Wewenang"
                    value={idRole}
                    onChange={handleChange('idRole')}
                    SelectProps={{}}
                    margin="normal"
                    fullWidth
                  >
                    <MenuItem key="1" value={SPV_GROUP.toString()}>
                      SPV
                    </MenuItem>
                    <MenuItem key="2" value={MEMBER_GROUP.toString()}>
                      Anggota
                    </MenuItem>
                  </TextField>
                </div>
                <div className="col-md-3 col-12">
                  <TextField
                    id="select-checkpoint"
                    select
                    label="Terminal"
                    value={idCheckpoint}
                    onChange={handleChange('idCheckpoint')}
                    SelectProps={{}}
                    margin="normal"
                    fullWidth
                  >
                    {checkpoints.map((data, index) => (
                      <MenuItem key={index} value={data.id}>
                        {data.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </form>
            </div>
            <div className="p-4 embed-responsive embed-responsive-21by9" style={{ height: 'calc(100vh - 180px)' }}>
              <GoogleMap
                center={{ lat: -4.5391966, lng: 136.8954289 }}
                zoom={15}
              >
                {markers.length > 0 && markers.map((m) => (
                  <ImageMarker
                    onClick={onMarkerClick}
                    key={m.id}
                    lat={m.lat}
                    lng={m.lng}
                    id={m.id}
                    show={m.show}
                    detail={m.detail} />
                ))}
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfficerMap;
