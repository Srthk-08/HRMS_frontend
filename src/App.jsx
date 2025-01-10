import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Layout from './components/shared/Layout';
import Contacts from './components/Contacts';
import AllEmployee from './components/employees/AllEmployee';
import Holidays from './components/employees/Holidays';
import Leaves from './components/employees/Leaves';
import Overtime from './components/employees/Overtime';
import Clients from './components/employees/Clients';
import Projects from './components/employees/Projects';
import Leads from './components/employees/Leads';  
import Login from './components/Login';
import Logout from './components/Logout';
import Invoice from './components/hr/Invoice';
import Expense from './components/hr/Expense';
import ProvidentFund from './components/hr/ProvidentFund';
import Tax from './components/hr/Tax';
import Policy from './components/hr/Policy';
import Asset from './components/hr/Assets';
import Profile from './components/shared/Profile';
import Users from './components/Users';
import AllAgents from './components/agents/AllAgents';
import AgentsDetail from './components/agents/AgentsDetail';
import AgentsLeaves from './components/agents/AgentsLeaves';
import AgentsStatus from './components/agents/AgentsStatus';
import AddHead from './components/hierarchy/AddHead';
import AddPosition from './components/hierarchy/AddPosition';
import HierarchyGraph from './components/hierarchy/HierarchyGraph';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Conditionally render Layout if authenticated, else redirect to login */}
        <Route
          path="/"
          element={isAuthenticated ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Dashboard />} />
          <Route path="apps/contacts" element={<Contacts />} />
          <Route path="employees/all" element={<AllEmployee />} />
          <Route path="employees/holidays" element={<Holidays />} />
          <Route path="employees/leaves" element={<Leaves />} />
          <Route path="employees/overtime" element={<Overtime />} />
          <Route path="clients" element={<Clients />} />
          <Route path="projects" element={<Projects />} />
          <Route path="leads" element={<Leads />} />
          <Route path="accounts/invoices" element={<Invoice />} />
          <Route path="accounts/expenses" element={<Expense />} />
          <Route path="accounts/providentfund" element={<ProvidentFund />} />
          <Route path="accounts/taxes" element={<Tax />} />
          <Route path="policies" element={<Policy />} />
          <Route path="assets" element={<Asset />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
          <Route path="agents/all" element={<AllAgents />} />
          <Route path="agents/details" element={<AgentsDetail />} />
          <Route path="agents/status" element={<AgentsStatus />} />
          <Route path="agents/holidays" element={<Holidays />} />
          <Route path="agents/leaves" element={<AgentsLeaves />} />
          <Route path="hierarchy/addhead" element={<AddHead />} />
          <Route path="hierarchy/addposition" element={<AddPosition />} />
          <Route path="hierarchy/graph" element={<HierarchyGraph />} />
        </Route>

        {/* Login route */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        {/* Logout route */}
        <Route
          path="/logout"
          element={<Logout onLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
