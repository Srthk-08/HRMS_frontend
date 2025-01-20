import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GiCancel } from "react-icons/gi";
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]); // New state to hold employees
  const [formData, setFormData] = useState({
    employee_id: '',
    leave_type: 'Sick Leave',
    from_date: '',
    to_date: '',
    status: 'Pending',
    leave_reason: '',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    employee_id: false,
    leave_type: false,
    from_date: false,
    to_date: false,
    leave_reason: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [editIndex, setEditIndex] = useState(null); // Track which leave to edit

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const leavesPerPage = 5;

  // Fetch employees and leaves when component mounts
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
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = Cookies.get('authToken');
        if (token) {
          const response = await axios.get('http://localhost:3000/api/leaves', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(response.data)
          setLeaves(response.data);
        } else {
          console.error("Authentication token not found.");
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };
    fetchLeaves();
  }, [isFormVisible]);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validate form before submission
  const validateForm = () => {
    const errors = {
      employee_id: !formData.employee_id,
      leave_type: !formData.leave_type.trim(),
      from_date: !formData.from_date || isNaN(new Date(formData.from_date).getTime()),
      to_date: !formData.to_date || isNaN(new Date(formData.to_date).getTime()),
      leave_reason: !formData.leave_reason.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true); // Return true if no errors
  };

  // Add new leave
  const handleAddLeave = async () => {
    if (validateForm()) {
      console.log(formData)
      try {
        const token = Cookies.get('authToken');
        if (!token) {
          console.error("Authentication token not found.");
          return;
        }
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.post('http://localhost:3000/api/leaves', formData, { headers });
        const newLeave = response.data;
        setLeaves([...leaves, newLeave]);
        setFormData({ employee_id: '', leave_type: '', from_date: '', to_date: '', status: 'Pending', leave_reason: '' });
        setIsFormVisible(false);
      } catch (error) {
        console.error("Error adding leave:", error);
      }
    }
  };

  // Edit existing leave
  const handleEditLeave = async () => {
    if (validateForm()) {
      try {
        const token = Cookies.get('authToken');
        if (!token) {
          console.error("Authentication token not found.");
          return;
        }
        const headers = { Authorization: `Bearer ${token}` };
        console.log(formData);
        const updatedLeave = { ...formData, id: leaves[editIndex]._id };
        console.log(updatedLeave)
        const response = await axios.put(`http://localhost:3000/api/leaves/${updatedLeave.id}`, updatedLeave, { headers });
        console.log('.............')
        const updatedData = response.data;
        const updatedLeaves = [...leaves];
        updatedLeaves[editIndex] = updatedData;
        setLeaves(updatedLeaves);
        setFormData({ employee_id: '', leave_type: '', from_date: '', to_date: '', status: 'Pending', leave_reason: '' });
        setIsFormVisible(false);
        setEditIndex(null);
      } catch (error) {
        console.error("Error updating leave:", error);
      }
    }
  };

  // Delete a leave
  const handleDeleteLeave = async (index) => {
    const leaveToDelete = leaves[index]._id;
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error("Authentication token not found.");
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`http://localhost:3000/api/leaves/${leaveToDelete}`, { headers });
      const updatedLeaves = leaves.filter((_, i) => i !== index);
      setLeaves(updatedLeaves);
    } catch (error) {
      console.error("Error deleting leave:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredLeaves = leaves.filter((leave) => {
    // Ensure employees array is populated
    if (employees.length === 0) return false;

    // Find the employee by employee_id
    // Check if employee_id is an object or a string
    const employee = employees.find((emp) =>
      (typeof leave.employee_id === 'object' ? leave.employee_id._id : leave.employee_id) === emp._id
    );

    // If employee is found, filter based on the search query
    if (employee) {
      const fullName = `${employee.first_name} ${employee.last_name}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    }

    // If no matching employee is found, return false
    return false;
  });


  // Paginate the filtered leaves
  const indexOfLastLeave = currentPage * leavesPerPage;
  const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
  const currentLeaves = filteredLeaves.slice(indexOfFirstLeave, indexOfLastLeave);
  console.log(currentLeaves)

  // Calculate total pages
  const totalPages = Math.ceil(filteredLeaves.length / leavesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate number of days between start and end date
  const calculateDays = (from_date, to_date) => {
    const start = new Date(from_date);
    const end = new Date(to_date);
    if (isNaN(start) || isNaN(end)) {
      return 0; // Invalid date
    }
    const timeDiff = end - start;
    return timeDiff >= 0 ? timeDiff / (1000 * 3600 * 24) + 1 : 0;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className='flex flex-col '>
          <h1 className="text-3xl font-semibold mb-2">Leaves</h1>
          <h1 className="font-semibold mb-4"><Link to="/" >Dashboard</Link> / Leaves</h1>
        </div>
        {/* Search Bar and Add Leave Button */}
        <div className="flex justify-end items-center mb-4 space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search leaves"
            className="px-4 py-2 border border-gray-300 rounded-md w-48 transition duration-200 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              setIsFormVisible(true);
              setEditIndex(null); // Reset for adding new leave
            }}
            className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Leave
          </button>
        </div>
      </div>
      {/* Popover Form to add or edit a leave */}
      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 animate__animated animate__fadeIn animate__faster">
          <div className="bg-white w-1/3 p-6 rounded-md shadow-lg relative animate__animated animate__zoomIn animate__faster">
            {/* Close Icon */}
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">
              {editIndex !== null ? 'Edit Leave' : 'Add Leave'}
            </h2>
            {/* Form Fields Container */}
            <div className="grid grid-cols-2 gap-4">
              {/* Employee Name Field */}
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="employee_id" className="block text-sm font-medium">
                  Employee Name
                </label>
                <select
                  id="employee_id"
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee._id} value={employee._id}>{employee.first_name} {employee.last_name}</option>
                  ))}
                </select>
                {formErrors.employee_id && <p className="text-red-500 text-sm">Employee name is required</p>}
              </div>

              {/* Leave Type Field */}
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="leave_type" className="block text-sm font-medium">
                  Leave Type
                </label>
                <select
                  id="leave_type"
                  name="leave_type"
                  value={formData.leave_type} // Make sure formData.leave_type is correctly updated
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Paid Leave">Paid Leave</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                  <option value="Other">Other</option>
                </select>

              </div>
              {/* Start Date Field */}
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="from_date" className="block text-sm font-medium">
                  Start Date
                </label>
                <input
                  type="date"
                  id="from_date"
                  name="from_date"
                  value={formData.from_date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.from_date && <p className="text-red-500 text-sm">Start date is required</p>}
              </div>
              {/* End Date Field */}
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="to_date" className="block text-sm font-medium">
                  End Date
                </label>
                <input
                  type="date"
                  id="to_date"
                  name="to_date"
                  value={formData.to_date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.to_date && <p className="text-red-500 text-sm">End date is required</p>}
              </div>
              {/* Leave leave_reason Field */}
              <div className="col-span-2">
                <label htmlFor="leave_reason" className="block text-sm font-medium">
                  Leave leave_reason
                </label>
                <textarea
                  id="leave_reason"
                  name="leave_reason"
                  value={formData.leave_reason}
                  onChange={handleInputChange}
                  placeholder="Enter leave leave_reason"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                {formErrors.leave_reason && <p className="text-red-500 text-sm">Leave leave_reason is required</p>}
              </div>

              {/* Status Field */}
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="status" className="block text-sm font-medium">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Submit and Update Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={editIndex !== null ? handleEditLeave : handleAddLeave}
                className="px-6 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                {editIndex !== null ? 'Update' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )
      }
      {/* Leaves Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse shadow-lg rounded-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left text-md font-semibold">
                Employee Name
              </th>
              <th className="py-2 px-4 text-left text-md font-semibold">
                Leave Type
              </th>
              <th className="py-2 px-4 text-left text-md font-semibold">
                Start Date
              </th>
              <th className="py-2 px-4 text-left text-md font-semibold">
                End Date
              </th>
              <th className="py-2 px-4 text-left text-md font-semibold">
                Number of Days
              </th>
              <th className="py-2 px-4 text-left text-md font-semibold">
                Leave Reason
              </th>
              <th className="py-2 px-4 text-left text-md font-semibold">
                Status
              </th>
              <th className="py-2 px-4 text-left text-md font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentLeaves.length > 0 ? (
              currentLeaves.map((leave, index) => {
                const employee = employees.find(
                  (emp) => emp._id === leave.employee_id._id
                );
                const fullName = employee
                  ? `${employee.first_name} ${employee.last_name}`
                  : "Unknown";

                return (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-200 ease-in-out"
                  >
                    <td className="px-4 py-2">{fullName}</td>
                    <td className="px-4 py-2">{leave.leave_type}</td>
                    <td className="px-4 py-2">
                      {new Date(leave.from_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(leave.to_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-2">
                      {calculateDays(leave.from_date, leave.to_date)}
                    </td>
                    <td className="px-4 py-2">{leave.leave_reason} </td>
                    <td
                      className={`px-4 py-2 ${leave.status === "Approved"
                        ? "text-green-500"
                        : leave.status === "Pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                        }`}
                    >
                      {leave.status}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => {
                          setFormData(leave);
                          setIsFormVisible(true);
                          setEditIndex(index);

                        }}
                        className="text-gray-500 hover:text-blue-600 transition duration-200 ease-in-out"
                      >
                        <HiOutlinePencilAlt size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteLeave(index)}
                        className="ml-4 text-gray-500 hover:text-red-600 transition duration-200 ease-in-out"
                      >
                        <HiOutlineTrash size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 text-center">
                  No leaves found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-end mt-4">
        <div className="flex items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200 ease-in-out disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200 ease-in-out disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div >
  );
}
