import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { HiOutlineLogout } from 'react-icons/hi';
import logo from '../../assests/logo.png';
import {
  DASHBOARD_MAIN_LINKS,
  DASHBOARD_EMPLOYEE_LINKS,
  DASHBOARD_HR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from '../../libs/consts/navigation';

const linkClasses =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-cyan-700 hover:no-underline active:bg-cyan-800 rounded-sm text-base ';

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-cyan-950 text-white w-60 h-full">
      {/* Logo Section */}
      <div className="flex items-center gap-2 px-1 pb-3">
        <img
          src={logo}
          alt="Logo"
          className="w-13 rounded transition-transform hover:scale-110 hover:shadow-xl"
        />
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-cyan-800 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg">
        <Section title="Main" links={DASHBOARD_MAIN_LINKS} />
        <Section title="Employees" links={DASHBOARD_EMPLOYEE_LINKS} />
        <Section title="HR" links={DASHBOARD_HR_LINKS} />
      </div>

      {/* Bottom Links */}
      <div className="pt-4 border-t border-cyan-500">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div className={classNames('text-red-400 cursor-pointer', linkClasses)}>
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
    <h2 className="text-sm font-semibold text-cyan-300 px-3">{title}</h2>
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
            'flex items-center gap-2 px-3 py-2 font-light text-base rounded-sm cursor-pointer hover:bg-cyan-700 transition-colors duration-300',
            pathname === item.path ? 'text-white bg-cyan-700' : 'text-cyan-300'
          )}
        >
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </Link>
      ) : (
        <div
          onClick={toggleDropdown}
          className={classNames(
            'flex items-center gap-2 px-3 py-2 font-light text-base rounded-sm cursor-pointer hover:bg-cyan-700 transition-colors duration-300',
            pathname === item.path ? 'text-white bg-cyan-700' : 'text-cyan-300'
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
        <div className="mt-1 ml-4 flex flex-col gap-1 bg-cyan-800 rounded shadow-lg p-2 transition-all duration-300">
          {item.subLinks.map((subItem) => (
            <Link
              key={subItem.key}
              to={subItem.path}
              className={classNames(
                'block px-3 py-2 text-sm rounded hover:bg-cyan-700 hover:text-white transition-colors duration-200',
                pathname === subItem.path && 'text-white bg-cyan-700'
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
