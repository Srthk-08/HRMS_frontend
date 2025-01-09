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
  HiOutlineUserGroup,
} from 'react-icons/hi'
import { HiOutlineBellAlert, HiOutlineCalendarDays, HiOutlineClipboardDocument, HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { GiBackwardTime, GiPartyPopper } from "react-icons/gi";

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

export const DASHBOARD_AGENTS_LINKS = [
  {
    key: 'agents',
    label: 'All Agents',
    path: '/agents/all',
    icon: <HiOutlineUserGroup />,
  },
  {
    key: 'agents detail',
    label: 'Agents Details',
    path: '/agents/details',
    icon: <HiOutlineClipboardDocumentList />
  },
  {
    key: 'agents status',
    label: 'Agent Status',
    path: '/agents/status',
    icon: <GiBackwardTime />
  },
  {
    key: 'agents holiday',
    label: 'Holidays',
    path: '/agents/holidays',
    icon: <GiPartyPopper />
  },
  {
    key: 'leaves',
    label: 'Leaves (Agents)',
    path: '/agents/leaves',
    icon: <HiOutlineCalendarDays/>
  },
]

export const DASHBOARD_HIERARCHY_LINKS = [
  {
    key: 'hierarchy',
    label: 'Hierarchy',
    path: '/hierarchy',
    icon: <HiOutlineUserGroup />,
    subLinks: [
      { key: 'add head', label: 'Add Head', path: '/hierarchy/addhead' },
      { key: 'add position', label: 'Add Position', path: '/hierarchy/addposition' },
      { key: 'hierarchy graph', label: 'Hierarchy Graph', path: '/hierarchy/graph' },
    ]
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