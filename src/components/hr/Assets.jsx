import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    assetId: "", // Added assetId field
    assetName: "",
    purchaseDate: "",
    purchaseFrom: "",
    manufacturer: "",
    model: "",
    serialNumber: "",
    supplier: "",
    condition: "",
    warranty: "",
    value: "",
    status: "Approved",
    description: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssets = assets.slice(startIndex, startIndex + itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {
      assetName: !formData.assetName.trim(),
      purchaseDate: !formData.purchaseDate.trim(),
      purchaseFrom: !formData.purchaseFrom.trim(),
      manufacturer: !formData.manufacturer.trim(),
      model: !formData.model.trim(),
      serialNumber: !formData.serialNumber.trim(),
      supplier: !formData.supplier.trim(),
      condition: !formData.condition.trim(),
      warranty: !formData.warranty.trim(),
      value: !formData.value.trim(),
      description: !formData.description.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  const generateAssetId = () => {
    return Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit ID
  };

  const handleAddAsset = () => {
    if (validateForm()) {
      const newAsset = {
        ...formData,
        assetId: generateAssetId(), // Automatically generate assetId
      };
      setAssets([...assets, newAsset]);
      resetForm();
    }
  };

  const handleEditAsset = () => {
    if (validateForm()) {
      const updatedAssets = [...assets];
      updatedAssets[editIndex] = formData;
      setAssets(updatedAssets);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      assetId: "", // Reset assetId
      assetName: "",
      purchaseDate: "",
      purchaseFrom: "",
      manufacturer: "",
      model: "",
      serialNumber: "",
      supplier: "",
      condition: "",
      warranty: "",
      value: "",
      status: "Approved",
      description: "",
    });
    setIsFormVisible(false);
    setEditIndex(null);
  };

  const handleDeleteAsset = (index) => {
    setAssets(assets.filter((_, i) => i !== index));
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
          <h1 className="text-3xl font-semibold mb-2">Assets</h1>
          <h1 className="font-semibold mb-4">
            <Link to="/">Dashboard</Link> / Asset Management
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
            Add Asset
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-1/2 max-h-[80vh] p-6 rounded-md shadow-lg relative overflow-y-auto">
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Edit Asset" : "Add Asset"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div >
                  <label className="block text-sm font-medium">
                    Asset Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="assetName"
                    placeholder="Enter asset name"
                    value={formData.assetName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.assetName && (
                    <p className="text-red-500 text-sm">Asset name is required</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Supplier <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="supplier"
                    placeholder="Enter supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.supplier && (
                    <p className="text-red-500 text-sm">Supplier is required</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Purchase Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.purchaseDate && (
                    <p className="text-red-500 text-sm">Purchase date is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Purchase From <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="purchaseFrom"
                    placeholder="Enter purchase source"
                    value={formData.purchaseFrom}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.purchaseFrom && (
                    <p className="text-red-500 text-sm">Purchase source is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Manufacturer <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="manufacturer"
                    placeholder="Enter manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.manufacturer && (
                    <p className="text-red-500 text-sm">Manufacturer is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="model"
                    placeholder="Enter model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.model && (
                    <p className="text-red-500 text-sm">Model is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Serial Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="serialNumber"
                    placeholder="Enter serial number"
                    value={formData.serialNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.serialNumber && (
                    <p className="text-red-500 text-sm">Serial number is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Condition <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="condition"
                    placeholder="Enter condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.condition && (
                    <p className="text-red-500 text-sm">Condition is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Warranty (in months) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="warranty"
                    placeholder="e.g., 12"
                    value={formData.warranty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.warranty && (
                    <p className="text-red-500 text-sm">Warranty is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Value <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="value"
                    placeholder="Enter value"
                    value={formData.value}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.value && (
                    <p className="text-red-500 text-sm">Value is required</p>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md h-24"
                  ></textarea>
                  {formErrors.description && (
                    <p className="text-red-500 text-sm">Description is required</p>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Returned">Returned</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              onClick={editIndex !== null ? handleEditAsset : handleAddAsset}
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
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Asset Name</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Asset Id</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Purchase Date</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Supplier</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Warranty</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Value</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Status</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAssets.map((asset, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{asset.assetName}</td>
              <td className="px-4 py-2">{asset.assetId}</td>
              <td className="px-4 py-2">{asset.purchaseDate}</td>
              <td className="px-4 py-2">{asset.supplier}</td>
              <td className="px-4 py-2">{asset.warranty}</td>
              <td className="px-4 py-2">{asset.value}</td>
              <td className="px-4 py-2">{asset.status}</td>
              <td className="px-4 py-2 flex items-center space-x-4">
                <button
                  onClick={() => {
                    setFormData(asset);
                    setIsFormVisible(true);
                    setEditIndex(index);
                  }}
                  className="text-slate-500 hover:text-blue-700"
                >
                  <HiOutlinePencilAlt size={20} />
                </button>
                <button
                  onClick={() => handleDeleteAsset(index)}
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
