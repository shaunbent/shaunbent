import React from 'react';
import '../styles/main.scss';

function Layout({ children }) {
  return (
    <div className="o-page">
      {children}
    </div>
  )
};

export default Layout;
