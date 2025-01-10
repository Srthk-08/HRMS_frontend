import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

export default function PolicyManagement() {
  const [policies, setPolicies] = useState([]);
  const [formData, setFormData] = useState({
    policyName: "",
    description: "",
    department: "",
    file: null,
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    policyName: false,
    description: false,
    department: false,
    file: false,
  });
  const [editIndex, setEditIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(policies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPolicies = policies.slice(startIndex, startIndex + itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const validateForm = () => {
    const errors = {
      policyName: !formData.policyName.trim(),
      description: !formData.description.trim(),
      department: !formData.department.trim(),
      file: !formData.file,
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  const handleAddPolicy = () => {
    if (validateForm()) {
      setPolicies([...policies, formData]);
      resetForm();
    }
  };

  const handleEditPolicy = () => {
    if (validateForm()) {
      const updatedPolicies = [...policies];
      updatedPolicies[editIndex] = formData;
      setPolicies(updatedPolicies);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      policyName: "",
      description: "",
      department: "",
      file: null,
    });
    setIsFormVisible(false);
    setEditIndex(null);
  };

  const handleDeletePolicy = (index) => {
    setPolicies(policies.filter((_, i) => i !== index));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold mb-2">Policies</h1>
          <h1 className="font-semibold mb-4">
            <Link to="/">Dashboard</Link> / Policy Management
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
            Add Policy
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-1/3 p-6 rounded-md shadow-lg relative">
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Edit Policy" : "Add Policy"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium">
                  Policy Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="policyName"
                  value={formData.policyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.policyName && (
                  <p className="text-red-500 text-sm">Policy name is required</p>
                )}
              </div>
              <div>
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
              <div>
                <label className="block text-sm font-medium">
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.department && (
                  <p className="text-red-500 text-sm">Department is required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Upload File <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.file && (
                  <p className="text-red-500 text-sm">File is required</p>
                )}
              </div>
            </div>
            <button
              onClick={editIndex !== null ? handleEditPolicy : handleAddPolicy}
              className="mt-4 px-6 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-md"
            >
              {editIndex !== null ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full table-auto border-collapse shadow-lg rounded-md mt-6">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Policy Name</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Description</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Department</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPolicies.map((policy, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{policy.policyName}</td>
              <td className="px-4 py-2">{policy.description}</td>
              <td className="px-4 py-2">{policy.department}</td>
              <td className="px-4 py-2 flex items-center space-x-4">
                <button
                  onClick={() => {
                    setFormData(policy);
                    setIsFormVisible(true);
                    setEditIndex(index);
                  }}
                  className="text-slate-500 hover:text-blue-700"
                >
                  <HiOutlinePencilAlt size={20} />
                </button>
                <button
                  onClick={() => handleDeletePolicy(index)}
                  className="text-slate-500 hover:text-red-700"
                >
                  <HiOutlineTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
      