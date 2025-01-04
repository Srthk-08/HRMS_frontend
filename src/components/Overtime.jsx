import React, { useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { GiCancel } from "react-icons/gi";
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';

export default function Overtime() {
  const [overtime, setOvertime] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: '',
    overtimeDate: '',
    overtimeHours: '',
    description: '',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    employeeName: false,
    overtimeDate: false,
    overtimeHours: false,
    description: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const overtimePerPage = 5;

  // Dropdown menu state
  const [dropdownIndex, setDropdownIndex] = useState(null);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {
      employeeName: !formData.employeeName.trim(),
      overtimeDate: !formData.overtimeDate.trim(),
      overtimeHours: !formData.overtimeHours.trim(),
      description: !formData.description.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  // Add new overtime entry
  const handleAddOvertime = () => {
    if (validateForm()) {
      setOvertime([...overtime, formData]);
      setFormData({
        employeeName: '',
        overtimeDate: '',
        overtimeHours: '',
        description: '',
      });
      setIsFormVisible(false);
    }
  };

  // Edit overtime entry
  const handleEditOvertime = () => {
    if (validateForm()) {
      const updatedOvertime = [...overtime];
      updatedOvertime[editIndex] = formData;
      setOvertime(updatedOvertime);
      setFormData({
        employeeName: '',
        overtimeDate: '',
        overtimeHours: '',
        description: '',
      });
      setIsFormVisible(false);
      setEditIndex(null);
    }
  };

  // Delete overtime entry
  const handleDeleteOvertime = (index) => {
    const updatedOvertime = overtime.filter((_, i) => i !== index);
    setOvertime(updatedOvertime);
    setDropdownIndex(null);
  };

  // Search overtime entries
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter overtime entries based on search query
  const filteredOvertime = overtime.filter((overtimeEntry) =>
    overtimeEntry.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate overtime entries
  const indexOfLastOvertime = currentPage * overtimePerPage;
  const indexOfFirstOvertime = indexOfLastOvertime - overtimePerPage;
  const currentOvertime = filteredOvertime.slice(indexOfFirstOvertime, indexOfLastOvertime);

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredOvertime.length / overtimePerPage);

  return (
    <div className="p-4">
      {/* <div className=" max-w-7xl mx-auto bg-white rounded-lg shadow-lg"> */}
      <div className="flex justify-between items-center mb-6">
        <div className='flex flex-col gap-3'>
          <h1 className="text-3xl font-semibold text-gray-800 mb-6"> Employee Overtime</h1>
          <h1 className="font-semibold mb-4"><Link to="/" >Dashboard</Link> / Overtime</h1>
        </div>
        {/* Search Bar and Add Overtime Button */}
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
      {/* Overtime Form (Popover) */}
      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 animate__animated animate__fadeIn animate__faster">
          <div className="bg-white w-96 p-6 rounded-md relative shadow-lg animate__animated animate__zoomIn animate__faster">
            {/* Close Icon */}
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
                <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">
                  Employee Name
                </label>
                <input
                  type="text"
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  placeholder="Enter employee name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ease-in-out hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formErrors.employeeName && <p className="text-red-500 text-sm">Employee name is required</p>}
              </div>

              {/* Overtime Date */}
              <div>
                <label htmlFor="overtimeDate" className="block text-sm font-medium text-gray-700">
                  Overtime Date
                </label>
                <input
                  type="date"
                  id="overtimeDate"
                  name="overtimeDate"
                  value={formData.overtimeDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ease-in-out hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formErrors.overtimeDate && <p className="text-red-500 text-sm">Overtime date is required</p>}
              </div>

              {/* Overtime Hours */}
              <div>
                <label htmlFor="overtimeHours" className="block text-sm font-medium text-gray-700">
                  Overtime Hours
                </label>
                <input
                  type="number"
                  id="overtimeHours"
                  name="overtimeHours"
                  value={formData.overtimeHours}
                  onChange={handleInputChange}
                  placeholder="Enter overtime hours"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ease-in-out hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formErrors.overtimeHours && <p className="text-red-500 text-sm">Overtime hours are required</p>}
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
                  placeholder="Enter overtime description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ease-in-out hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formErrors.description && <p className="text-red-500 text-sm">Description is required</p>}
              </div>

              {/* Add or Update Overtime Button */}
              <div className="flex gap-4">
                <button
                  onClick={editIndex !== null ? handleEditOvertime : handleAddOvertime}
                  className="px-6 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  {editIndex !== null ? 'Update' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overtime Table */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Overtime List:</h2>

        <table className="min-w-full table-auto border-collapse shadow-lg rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b text-gray-700">Employee Name</th>
              <th className="px-4 py-2 text-left border-b text-gray-700">Overtime Date</th>
              <th className="px-4 py-2 text-left border-b text-gray-700">Overtime Hours</th>
              <th className="px-4 py-2 text-left border-b text-gray-700">Description</th>
              <th className="px-4 py-2 text-left border-b text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOvertime.length > 0 ? (
              currentOvertime.map((entry, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition duration-200 ease-in-out">
                  <td className="px-4 py-2">{entry.employeeName}</td>
                  <td className="px-4 py-2">{entry.overtimeDate}</td>
                  <td className="px-4 py-2">{entry.overtimeHours}</td>
                  <td className="px-4 py-2">{entry.description}</td>
                  <td className="px-4 py-2 text-right">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setDropdownIndex(dropdownIndex === index ? null : index)
                        }
                        className="text-gray-500 hover:text-gray-600 transition duration-200 ease-in-out"
                      >
                        <HiOutlinePencilAlt className="text-slate-500 hover:text-blue-600" size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteOvertime(index)}
                        className="ml-4 text-red-500 hover:text-red-600 transition duration-200 ease-in-out"
                      >
                        <HiOutlineTrash className="text-slate-500 hover:text-red-600" size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center">
                  No overtime records found.
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
