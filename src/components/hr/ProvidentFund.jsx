import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

export default function ProvidentFund() {
  const [funds, setFunds] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: "",
    providentFundType: "",
    employeeShareAmount: "",
    organizationShareAmount: "",
    employeeSharePercentage: "",
    organizationSharePercentage: "",
    description: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    employeeName: false,
    providentFundType: false,
    employeeShareAmount: false,
    organizationShareAmount: false,
    employeeSharePercentage: false,
    organizationSharePercentage: false,
    description: false,
  });
  const [editIndex, setEditIndex] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Calculate paginated data
  const totalPages = Math.ceil(funds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFunds = funds.slice(startIndex, startIndex + itemsPerPage);

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
      employeeName: !formData.employeeName.trim(),
      providentFundType: !formData.providentFundType.trim(),
      employeeShareAmount:
        !formData.employeeShareAmount.trim() || isNaN(formData.employeeShareAmount),
      organizationShareAmount:
        !formData.organizationShareAmount.trim() || isNaN(formData.organizationShareAmount),
      employeeSharePercentage:
        !formData.employeeSharePercentage.trim() || isNaN(formData.employeeSharePercentage),
      organizationSharePercentage:
        !formData.organizationSharePercentage.trim() || isNaN(formData.organizationSharePercentage),
      description: !formData.description.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  // Handle form submission for adding a new fund
  const handleAddFund = () => {
    if (validateForm()) {
      setFunds([...funds, formData]);
      resetForm();
    }
  };

  // Handle form submission for editing a fund
  const handleEditFund = () => {
    if (validateForm()) {
      const updatedFunds = [...funds];
      updatedFunds[editIndex] = formData;
      setFunds(updatedFunds);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      employeeName: "",
      providentFundType: "",
      employeeShareAmount: "",
      organizationShareAmount: "",
      employeeSharePercentage: "",
      organizationSharePercentage: "",
      description: "",
    });
    setIsFormVisible(false);
    setEditIndex(null);
  };

  // Delete fund
  const handleDeleteFund = (index) => {
    setFunds(funds.filter((_, i) => i !== index));
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
          <h1 className="text-3xl font-semibold mb-2">Provident Fund</h1>
          <h1 className="font-semibold mb-4">
            <Link to="/">Dashboard</Link> / Provident Fund
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
            Add Fund
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-2/4 p-6 rounded-md shadow-lg relative">
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Edit Provident Fund" : "Add Provident Fund"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">
                  Employee Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.employeeName && (
                  <p className="text-red-500 text-sm">Employee name is required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Provident Fund Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="providentFundType"
                  value={formData.providentFundType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.providentFundType && (
                  <p className="text-red-500 text-sm">Fund type is required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Employee Share (Amount) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="employeeShareAmount"
                  value={formData.employeeShareAmount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.employeeShareAmount && (
                  <p className="text-red-500 text-sm">Valid amount is required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Organization Share (Amount) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="organizationShareAmount"
                  value={formData.organizationShareAmount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.organizationShareAmount && (
                  <p className="text-red-500 text-sm">Valid amount is required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Employee Share (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="employeeSharePercentage"
                  value={formData.employeeSharePercentage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.employeeSharePercentage && (
                  <p className="text-red-500 text-sm">Valid percentage is required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Organization Share (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="organizationSharePercentage"
                  value={formData.organizationSharePercentage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.organizationSharePercentage && (
                  <p className="text-red-500 text-sm">Valid percentage is required</p>
                )}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md h-24"
                />
                {formErrors.description && (
                  <p className="text-red-500 text-sm">Description is required</p>
                )}
              </div>
            </div>
            <button
              onClick={editIndex !== null ? handleEditFund : handleAddFund}
              className="mt-4 px-6 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-md"
            >
              {editIndex !== null ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}

      {/* Display table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse shadow-lg rounded-md mt-6">
          <thead>
            <tr className="bg-gray-100" > 
              <th className="px-4 py-3 text-left border-b font-semibold text-md">Employee Name</th>
              <th className="px-4 py-3 text-left border-b font-semibold text-md">Provident Fund Type</th>
              <th className="px-4 py-3 text-left border-b font-semibold text-md">Employee Share</th>
              <th className="px-4 py-3 text-left border-b font-semibold text-md">Organization Share</th>
              <th className="px-4 py-3 text-left border-b font-semibold text-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{fund.employeeName}</td>
                <td className="px-4 py-2">{fund.providentFundType}</td>
                <td className="px-4 py-2">{`${fund.employeeShareAmount} (${fund.employeeSharePercentage}%)`}</td>
                <td className="px-4 py-2">{`${fund.organizationShareAmount} (${fund.organizationSharePercentage}%)`}</td>
                <td className="px-4 py-2 flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setFormData(fund);
                      setIsFormVisible(true);
                      setEditIndex(index);
                    }}
                    className="text-slate-500 hover:text-blue-700"
                  >
                    <HiOutlinePencilAlt size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteFund(index)}
                    className="text-slate-500 hover:text-red-700"
                  >
                    <HiOutlineTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
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
