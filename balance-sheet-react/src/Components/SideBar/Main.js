import React from 'react';
import { FaBars } from 'react-icons/fa';
import Dashboard from '../DashBoard/Dashboard';
import { Route, Routes, Navigate } from "react-router-dom";
import AddUser from '../addUser/AddUser';
import AuthRole from '../AuthRole';

const Main = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
}) => {
  return (
    <main>
      <div className={`app ${rtl ? 'rtl' : ''}`}>
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>

        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />

          <Route element={<AuthRole />}>
            <Route exact path="/adduser" element={<AddUser />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </main>
  );
};

export default Main;
