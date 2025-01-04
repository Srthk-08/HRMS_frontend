import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineUsers,
  HiOutlineCog,
  HiOutlineUser,
  HiOutlinePencil,
  HiOutlineCubeTransparent,
  HiOutlineCash,
  HiOutlineUserAdd,
  HiOutlineCollection,
} from 'react-icons/hi'
import { HiOutlineBellAlert, HiOutlineClipboardDocument } from 'react-icons/hi2'


export const DASHBOARD_MAIN_LINKS= [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: <HiOutlineViewGrid />,
  },
  {
    key: 'apps',
    label: 'Apps',
    path: '/app',
    icon: <HiOutlineCube />,
    subLinks: [
      { key: 'contacts', label: 'Contacts', path: '/apps/contacts' },
    ],
  }
]

export const DASHBOARD_EMPLOYEE_LINKS = [
  {
    key: 'employees',
    label: 'Employees',
    path: '/employees',
    icon: <HiOutlineUser />,
    subLinks: [
      { key: 'all employees', label: 'All Employees', path: '/employees/all' },
      { key: 'holidays', label: 'Holidays', path: '/employees/holidays' },
      { key: 'leaves', label: 'Leaves (Employee)', path: '/employees/leaves' },
      { key: 'overtime', label: 'Overtime', path: '/employees/overtime' }
    ],
  },
  {
    key: 'clients',
    label: 'Clients',
    path: '/clients',
    icon: <HiOutlineUsers />
  },
  {
    key: 'projects',
    label: 'Projects',
    path: '/projects',
    icon: <HiOutlineCubeTransparent />,
  },
  {
    key: 'leads',
    label: 'Leads',
    path: '/leads',
    icon: <HiOutlinePencil />
  }
]

export const DASHBOARD_HR_LINKS = [
  {
    key: 'accounts',
    label: 'Accounts',
    path: '/accounts',
    icon: <HiOutlineCash />,
    subLinks: [
      { key: 'invoices', label: 'Invoices', path: '/accounts/invoices' },
      { key: 'expenses', label: 'Expenses', path: '/accounts/Expenses' },
      { key: 'provident fund', label: 'Provident Fund', path: '/accounts/providentfund' },
      { key: 'taxes', label: 'Taxes', path: '/accounts/taxes' },
    ]
  },
  {
    key: 'policies',
    label: 'Policies',
    path: '/policies',
    icon: <HiOutlineClipboardDocument />
  },
  {
    key: 'assets',
    label: 'Assets',
    path: '/assets',
    icon: <HiOutlineCollection />
  },
  {
    key: 'activities',
    label: 'activities',
    path: '/activities',
    icon: <HiOutlineBellAlert />
  },
]


export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: 'users',
    label: 'Users',
    path: '/users',
    icon: <HiOutlineUserAdd />
  },
  {
    key: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: <HiOutlineCog />
  },
]