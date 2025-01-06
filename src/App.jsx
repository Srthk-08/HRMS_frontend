import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Layout from './components/shared/Layout';
import Contacts from './components/Contacts';
import AllEmployee from './components/AllEmployee';
import Holidays from './components/Holidays';
import Leaves from './components/Leaves';
import Overtime from './components/Overtime';
import Clients from './components/Clients';
import Projects from './components/Projects';
import Leads from './components/Leads';
import Login from './components/Login';
import Logout from './components/Logout'; 
import Invoice from './components/Invoice';

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
