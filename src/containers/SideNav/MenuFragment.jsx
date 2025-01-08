import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import React from 'react';

export const Dashboard = () => (
  <li className="menu collapse-box">
    <Button>
      <i className="zmdi zmdi-view-dashboard zmdi-hc-fw" />
      <span className="nav-text">
        Dashboard
      </span>
    </Button>
    <ul className="sub-menu">
      <li>
        <NavLink className="prepend-icon" to="/dashboard/peta-petugas">
          <span className="nav-text">Peta Petugas</span>
        </NavLink>
      </li>
    </ul>
  </li>
);

export const Patroli = () => (
  <li className="menu collapse-box">
    <Button>
      <i className="zmdi zmdi-view-list zmdi-hc-fw" />
      <span className="nav-text">
        Patroli
      </span>
    </Button>
    <ul className="sub-menu">
      <li>
        <NavLink className="prepend-icon" to="/patroli/list">
          <span className="nav-text">List</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="prepend-icon" to="/patroli/jadwal">
          <span className="nav-text">Jadwal</span>
        </NavLink>
      </li>
    </ul>
  </li>
);

export const Panic = () => (
  <li className="menu collapse-box">
    <Button>
      <i className="zmdi zmdi-alert-circle zmdi-hc-fw" />
      <span className="nav-text">
        Panic
      </span>
    </Button>
    <ul className="sub-menu">
      <li>
        <NavLink className="prepend-icon" to="/panic/darurat">
          <span className="nav-text">Darurat</span>
        </NavLink>
      </li>
    </ul>
  </li>
);

export const Report = () => (
  <li className="menu collapse-box">
    <Button>
      <i className="zmdi zmdi-view-list zmdi-hc-fw" />
      <span className="nav-text">
        Laporan
      </span>
    </Button>
    <ul className="sub-menu">
      <li>
        <NavLink className="prepend-icon" to="/laporan/insiden">
          <span className="nav-text">Insiden</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="prepend-icon" to="/laporan/harian">
          <span className="nav-text">Harian</span>
        </NavLink>
      </li>
    </ul>
  </li>
);

export const DailyLog = () => (
  <li className="menu no-arrow">
    <NavLink to="/log-harian">
      <i className="zmdi zmdi-assignment-alert zmdi-hc-fw" />
      <span className="nav-text">Log Harian</span>
    </NavLink>
  </li>
);

export const DataMgmt = () => (
  <li className="menu collapse-box">
    <Button>
      <i className="zmdi zmdi-view-list zmdi-hc-fw" />
      <span className="nav-text">
        Management Data
      </span>
    </Button>
    <ul className="sub-menu">
      <li>
        <NavLink className="prepend-icon" to="/data/checkpoint">
          <span className="nav-text">Terminal</span>
        </NavLink>
      </li>
    </ul>
  </li>
);

export const Attendance = () => (
  <li className="menu collapse-box">
    <Button>
      <i className="zmdi zmdi-view-list zmdi-hc-fw" />
      <span className="nav-text">
        Kehadiran
      </span>
    </Button>
    <ul className="sub-menu">
      <li>
        <NavLink className="prepend-icon" to="/kehadiran/harian">
          <span className="nav-text">Kehadiran Harian</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="prepend-icon" to="/kehadiran/bulanan">
          <span className="nav-text">Kehadiran Bulanan</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="prepend-icon" to="/kehadiran/lainnya">
          <span className="nav-text">Kehadiran Lainnya</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="prepend-icon" to="/kehadiran/shift">
          <span className="nav-text">Manajemen Shift</span>
        </NavLink>
      </li>
      {/* <li>
        <NavLink className="prepend-icon" to="/kehadiran/statistik">
          <span className="nav-text">Statistik Kehadiran</span>
        </NavLink>
      </li> */}
    </ul>
  </li>
);

export const Member = () => (
  <li className="menu no-arrow">
    <NavLink to="/anggota">
      <i className="zmdi zmdi-odnoklassniki zmdi-hc-fw" />
      <span className="nav-text">Manajemen Anggota</span>
    </NavLink>
  </li>
);

export const Location = () => (
  <li className="menu no-arrow">
    <NavLink to="/anggota/lokasi">
      <i className="zmdi zmdi-my-location zmdi-hc-fw" />
      <span className="nav-text">Lokasi Anggota</span>
    </NavLink>
  </li>
);

export const Static = () => (
  <li className="menu collapse-box">
    <Button>
      <i className="zmdi zmdi-card zmdi-hc-fw" />
      <span className="nav-text">
        Static
      </span>
    </Button>
    <ul className="sub-menu">
      <li>
        <NavLink className="prepend-icon" to="/static/terms-agreement">
          <span className="nav-text">Terms and Agreement</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="prepend-icon" to="/static/privacy-policy">
          <span className="nav-text">Privacy Policy</span>
        </NavLink>
      </li>
    </ul>
  </li>
);
