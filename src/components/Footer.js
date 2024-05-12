import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer absolute bottom-0 footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        {/* Navigate to the Home page */}
        <Link to="/" className="link link-hover">
          Home
        </Link>
        {/* Navigate to the Video page */}
        <Link to="/video" className="link link-hover">
          Video
        </Link>
      </nav>
      <aside>
        <p>Copyright © 2024 - All rights reserved by Sudeep Ranjan Sahoo</p>
      </aside>
    </footer>
  );
};

export default Footer;
