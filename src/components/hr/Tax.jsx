import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

export default function Tax() {
  const [taxes, setTaxes] = useState([]);
  const [formData, setFormData] = useState({
    taxName: "",
    taxPercentage: "",
    status: "Active",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    taxName: false,
    taxPercentage: false,
    status: false,
  });
  const [editIndex, setEditIndex] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate paginated data
  const totalPages = Math.ceil(taxes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTaxes = taxes.slice(startIndex, startIndex + itemsPerPage);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const errors = {
      taxName: !formData.taxName.trim(),
      taxPercentage: !formData.taxPercentage.trim() || isNaN(formData.taxPercentage),
      status: !formData.status,
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  // Handle form submission for adding a new tax
  const handleAddTax = () => {
    if (validateForm()) {
      setTaxes([...taxes, formData]);
      resetForm();
    }
  };

  // Handle form submission for editing a tax
  const handleEditTax = () => {
    if (validateForm()) {
      const updatedTaxes = [...taxes];
      updatedTaxes[editIndex] = formData;
      setTaxes(updatedTaxes);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      taxName: "",
      taxPercentage: "",
      status: "Active",
    });
    setIsFormVisible(false);
    setEditIndex(null);
  };

  // Delete tax
  const handleDeleteTax = (index) => {
    setTaxes(taxes.filter((_, i) => i !== index));
  };

  // Handle page navigation
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold mb-2">Taxes</h1>
          <h1 className="font-semibold mb-4">
            <Link to="/">Dashboard</Link> / Tax Management
          </h1>
        </div>
        <div className="flex justify-end items-center mb-4 space-x-4">
          <button
            onClick={() => {
              setIsFormVisible(true);
              setEditIndex(null);
            }}
            className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Tax
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-1/4 p-6 rounded-md shadow-lg relative">
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Edit Tax" : "Add Tax"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium">
                  Tax Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="taxName"
                  value={formData.taxName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.taxName && (
                  <p className="text-red-500 text-sm">Tax name is required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Tax Percentage (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="taxPercentage"
                  value={formData.taxPercentage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.taxPercentage && (
                  <p className="text-red-500 text-sm">Valid percentage is required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <button
              onClick={editIndex !== null ? handleEditTax : handleAddTax}
              className="mt-4 px-6 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-md"
            >
              {editIndex !== null ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}

      {/* Display table */}
      <table className="min-w-full table-auto border-collapse shadow-lg rounded-md mt-6">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Tax Name</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Percentage (%)</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Status</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTaxes.map((tax, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{tax.taxName}</td>
              <td className="px-4 py-2">{tax.taxPercentage}</td>
              <td className="px-4 py-2">{tax.status}</td>
              <td className="px-4 py-2 flex items-center space-x-4">
                <button
                  onClick={() => {
                    setFormData(tax);
                    setIsFormVisible(true);
                    setEditIndex(index);
                  }}
                  className="text-slate-500 hover:text-blue-700"
                >
                  <HiOutlinePencilAlt size={20} />
                </button>
                <button
                  onClick={() => handleDeleteTax(index)}
                  className="text-slate-500 hover:text-red-700"
                >
                  <HiOutlineTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex justify-end mt-4">
        <div className="flex items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200 ease-in-out disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
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
