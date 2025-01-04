import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Layout from './components/shared/Layout';
import Contacts from './components/Contacts';
import AllEmployee from "./components/AllEmployee";
import Holidays from "./components/Holidays";
import Leaves from "./components/Leaves";
import Overtime from "./components/Overtime";
import Clients from "./components/Clients";
import Projects from "./components/Projects";
import Leads from "./components/Leads";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='apps/contacts' element={<Contacts />} />
            <Route path='employees/all' element={<AllEmployee />} />
            <Route path='employees/holidays' element={<Holidays/>} />
            <Route path='employees/leaves' element={<Leaves/>} />
            <Route path='employees/overtime' element={<Overtime />} />
            <Route path='clients' element={<Clients />} />
            <Route path='projects' element={<Projects />} />
            <Route path='leads' element={<Leads />} />
          </Route>
          <Route path='login' element={<div>This is login page</div>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
