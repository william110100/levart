import React from 'react';

const year = new Date().getFullYear();
const Footer = () => (
  <footer className="app-footer">
    <span className="d-inline-block">
      Indonesia Lebih Aman &copy;
      {' '}
      {year}
    </span>
  </footer>
);
export default Footer;
