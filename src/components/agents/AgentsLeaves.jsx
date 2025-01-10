import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiCancel } from "react-icons/gi";
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';

export default function AgentsLeaves() {
  const [agentsLeaves, setAgentsLeaves] = useState([]);
  const [formData, setFormData] = useState({
    agentName: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    status: 'approved',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    agentName: false,
    leaveType: false,
    startDate: false,
    endDate: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [editIndex, setEditIndex] = useState(null); // Track which leave to edit

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const agentsLeavesPerPage = 5;

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to validate the form before adding or updating a leave
  const validateForm = () => {
    const errors = {
      agentName: !formData.agentName.trim(),
      leaveType: !formData.leaveType.trim(),
      startDate: !formData.startDate.trim(),
      endDate: !formData.endDate.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true); // Return true if no errors
  };

  // Function to handle form submission for adding a new leave
  const handleAddLeave = () => {
    if (validateForm()) {
      setAgentsLeaves([...agentsLeaves, formData]);
      setFormData({ agentName: '', leaveType: '', startDate: '', endDate: '', status: 'approved' });
      setIsFormVisible(false);
    }
  };

  // Function to handle editing an existing leave
  const handleEditLeave = () => {
    if (validateForm()) {
      const updatedAgentsLeaves = [...agentsLeaves];
      updatedAgentsLeaves[editIndex] = formData;
      setAgentsLeaves(updatedAgentsLeaves);
      setFormData({ agentName: '', leaveType: '', startDate: '', endDate: '', status: 'approved' });
      setIsFormVisible(false);
      setEditIndex(null); // Clear edit index
    }
  };

  // Function to handle deleting a leave
  const handleDeleteLeave = (index) => {
    const updatedAgentsLeaves = agentsLeaves.filter((_, i) => i !== index);
    setAgentsLeaves(updatedAgentsLeaves);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter leaves based on search query
  const filteredAgentsLeaves = agentsLeaves.filter((leave) =>
    leave.agentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate the filtered leaves
  const indexOfLastLeave = currentPage * agentsLeavesPerPage;
  const indexOfFirstLeave = indexOfLastLeave - agentsLeavesPerPage;
  const currentLeaves = filteredAgentsLeaves.slice(indexOfFirstLeave, indexOfLastLeave);

  // Function to change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredAgentsLeaves.length / agentsLeavesPerPage);

  // Function to calculate the number of days between start and end date
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    return timeDiff >= 0 ? timeDiff / (1000 * 3600 * 24) + 1 : 0; // Adding 1 to include the start day
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className='flex flex-col '>
          <h1 className="text-3xl font-semibold mb-2">Agent Leaves</h1>
          <h1 className="font-semibold mb-4"><Link to="/" >Dashboard</Link> / Agent Leaves</h1>
        </div>
        {/* Search Bar and Add Leave Button */}
        <div className="flex justify-end items-center mb-4 space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search agent leaves"
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
          <div className="bg-white w-96 p-6 rounded-md shadow-lg relative animate__animated animate__zoomIn animate__faster">
            {/* Close Icon */}
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">
              {editIndex !== null ? 'Edit Leave' : 'Add Leave'}
            </h2>
            <div className="space-y-4">
              {/* Agent Name Field */}
              <div>
                <label htmlFor="agentName" className="block text-sm font-medium">
                  Agent Name
                </label>
                <input
                  type="text"
                  id="agentName"
                  name="agentName"
                  value={formData.agentName}
                  onChange={handleInputChange}
                  placeholder="Enter agent name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.agentName && <p className="text-red-500 text-sm">Agent name is required</p>}
              </div>

              {/* Leave Type Field */}
              <div>
                <label htmlFor="leaveType" className="block text-sm font-medium">
                  Leave Type
                </label>
                <input
                  type="text"
                  id="leaveType"
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  placeholder="Enter leave type"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.leaveType && <p className="text-red-500 text-sm">Leave type is required</p>}
              </div>

              {/* Start Date Field */}
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.startDate && <p className="text-red-500 text-sm">Start date is required</p>}
              </div>

              {/* End Date Field */}
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.endDate && <p className="text-red-500 text-sm">End date is required</p>}
              </div>

              {/* Status Field (Dropdown Selection) */}
              <div>
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
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={editIndex !== null ? handleEditLeave : handleAddLeave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition duration-300 ease-in-out"
                >
                  {editIndex !== null ? 'Update Leave' : 'Add Leave'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <table className="min-w-full table-auto border-collapse shadow-lg rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left text-md font-semibold">Agent Name</th>
              <th className="py-2 px-4 text-left text-md font-semibold">Leave Type</th>
              <th className="py-2 px-4 text-left text-md font-semibold">Start Date</th>
              <th className="py-2 px-4 text-left text-md font-semibold">End Date</th>
              <th className="py-2 px-4 text-left text-md font-semibold">Number of Days</th>
              <th className="py-2 px-4 text-left text-md font-semibold">Status</th>
              <th className="py-2 px-4 text-left text-md font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentLeaves.length > 0 ? (
              currentLeaves.map((leave, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition duration-200 ease-in-out">
                  <td className="px-4 py-2">{leave.agentName}</td>
                  <td className="px-4 py-2">{leave.leaveType}</td>
                  <td className="px-4 py-2">{leave.startDate}</td>
                  <td className="px-4 py-2">{leave.endDate}</td>
                  <td className="px-4 py-2">{calculateDays(leave.startDate, leave.endDate)}</td>
                  <td
                    className={`px-4 py-2 ${leave.status === 'approved'
                      ? 'text-green-500'
                      : leave.status === 'pending'
                        ? 'text-yellow-500'
                        : 'text-red-500'
                      }`}
                  >
                    {leave.status === 'approved'
                      ? 'Approved'
                      : leave.status === 'pending'
                        ? 'Pending'
                        : 'Rejected'}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="relative">
                      <button
                        onClick={() => {
                          setFormData(leave);
                          setIsFormVisible(true);
                          setEditIndex(index);
                        }}
                        className="text-gray-500 hover:text-gray-600 transition duration-200 ease-in-out"
                      >
                        <HiOutlinePencilAlt size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteLeave(index)}
                        className="ml-4 text-gray-500 hover:text-gray-600 transition duration-200 ease-in-out"
                      >
                        <HiOutlineTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
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
    </div>
  );
}
