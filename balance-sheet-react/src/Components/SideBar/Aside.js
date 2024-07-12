import React, { useContext } from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaMoneyBillWave } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import { ContextUser } from '../Context/UserContext';

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const value = useContext(ContextUser);

  const handleClick = () => {
    value.logout();
    localStorage.clear();
    window.location.reload();
  };

  const menu = () => {
    const userRole = localStorage.getItem("tokenRole");

    return (
      <>
        {userRole === "superUser" ? (
          <MenuItem icon={<FaMoneyBillWave />}>
            <NavLink to="/adduser">Add User</NavLink>
          </MenuItem>
        ) : (
          null
        )}
      </>
    );
  };

  return (
    <ProSidebar
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          Balance Sheet
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FaGem />}>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </MenuItem>
        </Menu>

        <Menu iconShape="circle">
          {menu()}
        </Menu>

      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
            onClick={handleClick}
          >
            <NavLink to="/">Log Out</NavLink>
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;
