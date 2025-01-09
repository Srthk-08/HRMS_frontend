import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { HiOutlineLogout } from 'react-icons/hi';
import logo from '../../assets/logo.png';
import {
  DASHBOARD_MAIN_LINKS,
  DASHBOARD_EMPLOYEE_LINKS,
  DASHBOARD_HR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_AGENTS_LINKS,
  DASHBOARD_HIERARCHY_LINKS
} from '../../libs/consts/navigation';
import { IoIosArrowDropdown } from 'react-icons/io';

const linkClasses =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-slate-700 hover:no-underline active:bg-slate-600 rounded-sm text-base ';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { pathname } = useLocation();

  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const closeDropdown = () => setOpenDropdown(null);

  return (
    <div
      className={classNames(
        'sidebar flex flex-col bg-slate-800 text-white transition-all duration-300 overflow-hidden fixed md:relative md:w-60 md:overflow-visible',
        isSidebarOpen
          ? 'open w-60 left-0 top-0 bottom-0 z-50 transform transition-all duration-300'
          : 'closed w-0 transform -translate-x-full md:w-60 md:translate-x-0'
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-2 px-1 pb-3">
        <img
          src={logo}
          alt="Logo"
          className="w-13 rounded transition-transform hover:scale-110 hover:shadow-xl"
        />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg">
        <Section
          title="Main"
          links={DASHBOARD_MAIN_LINKS}
          toggleSidebar={toggleSidebar}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          closeDropdown={closeDropdown}
        />
        <Section
          title="Employees"
          links={DASHBOARD_EMPLOYEE_LINKS}
          toggleSidebar={toggleSidebar}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          closeDropdown={closeDropdown}
        />
        <Section
          title="HR"
          links={DASHBOARD_HR_LINKS}
          toggleSidebar={toggleSidebar}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          closeDropdown={closeDropdown}
        />
        <Section
          title="Agents"
          links={DASHBOARD_AGENTS_LINKS}
          toggleSidebar={toggleSidebar}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          closeDropdown={closeDropdown}
        />
        <Section
          title="Hierarchy Management"
          links={DASHBOARD_HIERARCHY_LINKS}
          toggleSidebar={toggleSidebar}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          closeDropdown={closeDropdown}
        />
      </div>

      {/* Bottom Links */}
      <div className="pt-4 border-t border-slate-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink
            key={item.key}
            item={item}
            toggleSidebar={toggleSidebar}
            closeDropdown={closeDropdown}
          />
        ))}
        <div
          className={classNames('text-red-400 cursor-pointer', linkClasses)}
          onClick={handleLogout}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, links, toggleSidebar, openDropdown, setOpenDropdown, closeDropdown }) => (
  <div>
    <h2 className="text-sm font-semibold text-slate-300 px-3">{title}</h2>
    <div className="flex flex-col gap-0.5 mt-2">
      {links.map((item) => (
        <SidebarLink
          key={item.key}
          item={item}
          toggleSidebar={toggleSidebar}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          closeDropdown={closeDropdown}
        />
      ))}
    </div>
  </div>
);

const SidebarLink = ({
  item,
  toggleSidebar,
  openDropdown,
  setOpenDropdown,
}) => {
  const { pathname } = useLocation();
  const hasSubLinks = item.subLinks && item.subLinks.length > 0;

  const handleMainLinkClick = () => {
    setOpenDropdown(null); // Close all dropdowns
    if (window.innerWidth < 768) {
      toggleSidebar(); // Close the sidebar in mobile view
    }
  };

  const handleSubLinkClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar(); // Close the sidebar in mobile view
    }
  };

  const toggleDropdown = () => {
    if (openDropdown === item.key) {
      setOpenDropdown(null); // Close dropdown if it's already open
    } else {
      setOpenDropdown(item.key); // Open this dropdown
    }
  };

  return (
    <div className="relative">
      {!hasSubLinks ? (
        <Link
          to={item.path}
          onClick={handleMainLinkClick} // Close sidebar and dropdowns on main link click
          className={classNames(
            'flex items-center gap-2 px-3 py-2 font-light text-base rounded-sm cursor-pointer hover:bg-slate-700 transition-colors duration-300',
            pathname === item.path ? 'text-white bg-slate-700' : 'text-slate-300'
          )}
        >
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </Link>
      ) : (
        <>
          <div
            onClick={toggleDropdown}
            className={classNames(
              'flex items-center gap-2 px-3 py-2 font-light text-base rounded-sm cursor-pointer hover:bg-slate-700 transition-colors duration-300',
              openDropdown === item.key ? 'text-white bg-slate-700' : 'text-slate-300'
            )}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
            <IoIosArrowDropdown
              className={classNames(
                'ml-auto text-lg transform transition-transform duration-300',
                openDropdown === item.key ? 'rotate-180' : 'rotate-0'
              )}
            />
          </div>

          {hasSubLinks && openDropdown === item.key && (
            <div className="mt-1 ml-4 flex flex-col gap-1 bg-slate-700 rounded shadow-lg p-2 transition-all duration-300">
              {item.subLinks.map((subItem) => (
                <Link
                  key={subItem.key}
                  to={subItem.path}
                  onClick={handleSubLinkClick} // Close sidebar on sub-link click, but keep dropdown open
                  className={classNames(
                    'block px-3 py-2 text-sm rounded hover:bg-slate-600 hover:text-white transition-colors duration-200',
                    pathname === subItem.path && 'text-white bg-slate-600'
                  )}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Sidebar;
