import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">SERS</span>
        </div>
        <nav className="nav">
          <span className="nav-tag">AI Powered</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
