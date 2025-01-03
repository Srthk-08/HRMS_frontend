import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Layout from './components/shared/Layout';
import Contacts from './components/Contacts';
import AllEmployee from "./components/AllEmployee";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='apps/contacts' element={<Contacts />} />
            <Route path='employees/all' element={<AllEmployee />} />
          </Route>
          <Route path='login' element={<div>This is login page</div>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
