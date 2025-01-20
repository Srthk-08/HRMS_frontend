import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GiCancel } from "react-icons/gi";
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import axios from 'axios'; // For API calls
import Cookies from 'js-cookie';

export default function Overtime() {
  const [overtime, setOvertime] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: '',
    overtime_date: '',
    overtime_hours: '',
    description: '',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    employee_id: false,
    overtime_date: false,
    overtime_hours: false,
    description: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const overtimePerPage = 5;

  const [dropdownIndex, setDropdownIndex] = useState(null);

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = Cookies.get('authToken');
        if (token) {
          const response = await axios.get('http://localhost:3000/api/employees', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEmployees(response.data);
        } else {
          console.error("Authentication token not found.");
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  // Fetch overtime on component mount
  useEffect(() => {
    const fetchOvertime = async () => {
      try {
        const token = Cookies.get('authToken');
        if (token) {
          const response = await axios.get('http://localhost:3000/api/overtime', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setOvertime(response.data);
        } else {
          console.error("Authentication token not found.");
        }
      } catch (error) {
        console.error('Error fetching overtime:', error);
      }
    };
    fetchOvertime();
  }, [isFormVisible]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {
      employee_id: !formData.employee_id,
      overtime_date: !formData.overtime_date || isNaN(new Date(formData.overtime_date).getTime()), 
      overtime_hours: !formData.overtime_hours,
      description: !formData.description.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  // Add new overtime entry
  const handleAddOvertime = async () => {
    if (validateForm()) {
      try {
        const token = Cookies.get('authToken');
        if (!token) {
          console.error("Authentication token not found.");
          return;
        }
        const headers = { Authorization: `Bearer ${token}` };
        const newOvertime = await axios.post('http://localhost:3000/api/overtime', formData, { headers });
        setOvertime([...overtime, newOvertime.data]);
        setFormData({
          employee_id: '',
          overtime_date: '',
          overtime_hours: '',
          description: '',
        });
        setIsFormVisible(false);
      } catch (error) {
        console.error('Error adding overtime:', error);
      }
    }
  };

  // Edit overtime entry
  const handleEditOvertime = async () => {
    if (validateForm()) {
      try {
        const token = Cookies.get('authToken');
        if (!token) {
          console.error("Authentication token not found.");
          return;
        }
        const headers = { Authorization: `Bearer ${token}` };
        const updatedOvertime = await axios.put(`http://localhost:3000/api/overtime/${editIndex}`, formData, { headers });
        const updatedOvertimeList = overtime.map((entry) =>
          entry._id === editIndex ? updatedOvertime.data : entry
        );
        setOvertime(updatedOvertimeList);
        setFormData({
          employee_id: '',
          overtime_date: '', // Reset date after update
          overtime_hours: '',
          description: '',
        });
        setIsFormVisible(false);
        setEditIndex(null);
      } catch (error) {
        console.error('Error updating overtime:', error);
      }
    }
  };


  // Delete overtime entry
  const handleDeleteOvertime = async (index) => {
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error("Authentication token not found.");
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`http://localhost:3000/api/overtime/${overtime[index]._id}`, { headers });
      const updatedOvertime = overtime.filter((_, i) => i !== index);
      setOvertime(updatedOvertime);
      setDropdownIndex(null);
    } catch (error) {
      console.error('Error deleting overtime:', error);
    }
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOvertime = overtime.filter((overtimeEntry) => {
    // Ensure employees array is populated
    if (employees.length === 0) return false;

    // Find the employee by employee_id
    // Check if employee_id is an object or a string
    const employee = employees.find((emp) =>
      (typeof overtimeEntry.employee_id === 'object' ? overtimeEntry.employee_id._id : overtimeEntry.employee_id) === emp._id
    );

    // If employee is found, filter based on the search query
    if (employee) {
      const fullName = `${employee.first_name} ${employee.last_name}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    }

    // If no matching employee is found, return false
    return false;
  });


  // Paginate overtime entries
  const indexOfLastOvertime = currentPage * overtimePerPage;
  const indexOfFirstOvertime = indexOfLastOvertime - overtimePerPage;
  const currentOvertime = filteredOvertime.slice(indexOfFirstOvertime, indexOfLastOvertime);

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredOvertime.length / overtimePerPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className='flex flex-col'>
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Employee Overtime</h1>
          <h1 className="font-semibold mb-4"><Link to="/" >Dashboard</Link> / Overtime</h1>
        </div>
        <div className="flex justify-end items-center mb-4 space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search overtime"
            className="px-4 py-2 border border-gray-300 rounded-md w-48 transition duration-200 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              setIsFormVisible(true);
              setEditIndex(null);
            }}
            className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Overtime
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 animate__animated animate__fadeIn animate__faster">
          <div className="bg-white w-96 p-6 rounded-md relative shadow-lg animate__animated animate__zoomIn animate__faster">
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer z-50"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {editIndex !== null ? 'Edit Overtime' : 'Add Overtime'}
            </h2>
            <div className="space-y-4">
              {/* Employee Name */}
              <div>
                <label htmlFor="employee_id" className="block text-sm font-medium">
                  Employee Name
                </label>
                <select
                  id="employee_id"
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee._id} value={employee._id}>{employee.first_name} {employee.last_name}</option>
                  ))}
                </select>
                {formErrors.employee_id && <p className="text-red-500 text-sm">Employee name is required</p>}
              </div>

              {/* Overtime Date */}
              <div>
                <label htmlFor="overtime_date" className="block text-sm font-medium text-gray-700">
                  Overtime Date
                </label>
                <input
                  type="date"
                  id="overtime_date"
                  name="overtime_date"
                  value={formData.overtime_date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.overtime_date && <p className="text-red-500 text-sm">Overtime date is required</p>}
              </div>

              {/* Overtime Hours */}
              <div>
                <label htmlFor="overtime_hours" className="block text-sm font-medium text-gray-700">
                  Overtime Hours
                </label>
                <input
                  type="number"
                  id="overtime_hours"
                  name="overtime_hours"
                  value={formData.overtime_hours}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.overtime_hours && <p className="text-red-500 text-sm">Overtime hours are required</p>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.description && <p className="text-red-500 text-sm">Description is required</p>}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={editIndex !== null ? handleEditOvertime : handleAddOvertime}
                  className="px-6 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700"
                >
                  {editIndex !== null ? 'Update' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full table-auto border-collapse shadow-lg rounded-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left text-md font-semibold">Employee Name</th>
              <th className="py-2 px-4 text-left text-md font-semibold">Overtime Date</th>
              <th className="py-2 px-4 text-left text-md font-semibold">Overtime Hours</th>
              <th className="py-2 px-4 text-left text-md font-semibold">Description</th>
              <th className="py-2 px-4 text-left text-md font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOvertime.length > 0 ? (
              currentOvertime.map((entry, index) => {
                const employee = employees.find(
                  (emp) => emp._id === entry.employee_id._id
                );
                const fullName = employee
                  ? `${employee.first_name} ${employee.last_name}`
                  : "Unknown";
                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{fullName}</td>
                    <td className="px-4 py-2">
                    {new Date(entry.overtime_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}</td>
                    <td className="px-4 py-2">{entry.overtime_hours}</td>
                    <td className="px-4 py-2">{entry.description}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="relative">
                        <button
                          onClick={() => {
                            setFormData(entry);
                            setEditIndex(entry._id);  // Use the overtime entry's ID
                            setIsFormVisible(true);    // Show the form for editing
                          }}
                          className="text-gray-500 hover:text-blue-600"
                        >
                          {/* setDropdownIndex(dropdownIndex === index ? null : index) */}
                          <HiOutlinePencilAlt size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteOvertime(index)}
                          className="ml-4 text-gray-500 hover:text-red-600"
                        >
                          <HiOutlineTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center">No overtime records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <div className="flex items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-4">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
