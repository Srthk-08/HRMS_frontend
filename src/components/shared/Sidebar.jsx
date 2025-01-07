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
} from '../../libs/consts/navigation';

const linkClasses =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-slate-700 hover:no-underline active:bg-slate-600 rounded-sm text-base ';

const Sidebar = ({ isSidebarOpen }) => {
  const { pathname } = useLocation();

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  return (
    <div
      className={classNames(
        "sidebar flex flex-col bg-slate-800 text-white transition-all duration-300 overflow-hidden fixed md:relative md:w-60 md:overflow-visible",
        isSidebarOpen
          ? "open w-60 left-0 top-0 bottom-0 z-50 transform transition-all duration-300"
          : "closed w-0 transform -translate-x-full md:w-60 md:translate-x-0"
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
        <Section title="Main" links={DASHBOARD_MAIN_LINKS} />
        <Section title="Employees" links={DASHBOARD_EMPLOYEE_LINKS} />
        <Section title="HR" links={DASHBOARD_HR_LINKS} />
      </div>

      {/* Bottom Links */}
      <div className="pt-4 border-t border-slate-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div className={classNames('text-red-400 cursor-pointer', linkClasses)} onClick={handleLogout}>
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, links }) => (
  <div>
    <h2 className="text-sm font-semibold text-slate-300 px-3">{title}</h2>
    <div className="flex flex-col gap-0.5 mt-2">
      {links.map((item) => (
        <SidebarLink key={item.key} item={item} />
      ))}
    </div>
  </div>
);

const SidebarLink = ({ item }) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const hasSubLinks = item.subLinks && item.subLinks.length > 0;

  return (
    <div className="relative">
      {!hasSubLinks ? (
        <Link
          to={item.path}
          className={classNames(
            'flex items-center gap-2 px-3 py-2 font-light text-base rounded-sm cursor-pointer hover:bg-slate-700 transition-colors duration-300',
            pathname === item.path ? 'text-white bg-slate-700' : 'text-slate-300'
          )}
        >
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </Link>
      ) : (
        <div
          onClick={toggleDropdown}
          className={classNames(
            'flex items-center gap-2 px-3 py-2 font-light text-base rounded-sm cursor-pointer hover:bg-slate-700 transition-colors duration-300',
            pathname === item.path ? 'text-white bg-slate-700' : 'text-slate-300'
          )}
        >
          <span className="text-xl">{item.icon}</span>
          {item.label}
          <span
            className={classNames(
              'ml-auto text-sm transform transition-transform duration-300',
              isOpen ? 'rotate-180' : ''
            )}
          >
            ▼
          </span>
        </div>
      )}

      {hasSubLinks && isOpen && (
        <div className="mt-1 ml-4 flex flex-col gap-1 bg-slate-700 rounded shadow-lg p-2 transition-all duration-300">
          {item.subLinks.map((subItem) => (
            <Link
              key={subItem.key}
              to={subItem.path}
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
    </div>
  );
};

export default Sidebar;
