import React, { useState } from 'react';
import Aside from './Aside';
import Main from './Main';

function Layout({ setLocale }) {
  const [rtl] = useState(false);
  const [collapsed] = useState(false);
  const [image] = useState(true);
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <>
      <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
        <Aside
          image={image}
          collapsed={collapsed}
          rtl={rtl}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
        />

        <Main
          handleToggleSidebar={handleToggleSidebar}
        />
      </div>
    </>
  );
}

export default Layout;
