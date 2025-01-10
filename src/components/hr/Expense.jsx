import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "",
    purchaseFrom: "",
    purchaseDate: "",
    purchasedBy: "",
    amount: "",
    paidBy: "Cash",
    status: "approved",
    attachment: null,
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    itemName: false,
    purchaseFrom: false,
    purchaseDate: false,
    purchasedBy: false,
    amount: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 5;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      attachment: e.target.files[0],
    }));
  };

  // Form validation
  const validateForm = () => {
    const errors = {
      itemName: !formData.itemName.trim(),
      purchaseFrom: !formData.purchaseFrom.trim(),
      purchaseDate: !formData.purchaseDate.trim(),
      purchasedBy: !formData.purchasedBy.trim(),
      amount: !formData.amount.trim() || isNaN(formData.amount),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  // Handle form submission for adding a new expense
  const handleAddExpense = () => {
    if (validateForm()) {
      setExpenses([...expenses, formData]);
      setFormData({
        itemName: "",
        purchaseFrom: "",
        purchaseDate: "",
        purchasedBy: "",
        amount: "",
        paidBy: "Cash",
        status: "approved",
        attachment: null,
      });
      setIsFormVisible(false);
    }
  };

  // Handle form submission for editing an expense
  const handleEditExpense = () => {
    if (validateForm()) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = formData;
      setExpenses(updatedExpenses);
      setFormData({
        itemName: "",
        purchaseFrom: "",
        purchaseDate: "",
        purchasedBy: "",
        amount: "",
        paidBy: "Cash",
        status: "approved",
        attachment: null,
      });
      setIsFormVisible(false);
      setEditIndex(null);
    }
  };

  // Delete expense
  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Pagination logic
  const filteredExpenses = expenses.filter((expense) =>
    expense.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = Array.isArray(filteredExpenses) ? filteredExpenses.slice(indexOfFirstExpense, indexOfLastExpense) : [];
  const totalPages = Math.ceil(filteredExpenses.length / expensesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex flex-col-2 sm:flex-row justify-between items-center mb-6 overflow-x-auto">
        <div className="flex flex-col mb-4 sm:mb-0">
          <h1 className="text-3xl font-semibold mb-2">Expenses</h1>
          <h1 className="font-semibold mb-4">
            <Link to="/">Dashboard</Link> / Expenses
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-end items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search expenses"
            className="px-4 py-2 border border-gray-300 rounded-md w-40 sm:w-48 transition duration-200 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Add Expense Button */}
          <button
            onClick={() => {
              setIsFormVisible(true);
              setEditIndex(null);
            }}
            className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Expense
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-100 p-6 rounded-md shadow-lg relative">
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Edit Expense" : "Add Expense"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Column 1 - Item Name */}
              <div>
                <label htmlFor="itemName" className="block text-sm font-medium">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  placeholder="Enter item name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.itemName && (
                  <p className="text-red-500 text-sm">Item name is required</p>
                )}
              </div>

              {/* Column 2 - Purchase From */}
              <div>
                <label htmlFor="purchaseFrom" className="block text-sm font-medium">
                  Purchase From <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="purchaseFrom"
                  name="purchaseFrom"
                  value={formData.purchaseFrom}
                  onChange={handleInputChange}
                  placeholder="Enter purchase source"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.purchaseFrom && (
                  <p className="text-red-500 text-sm">Purchase source is required</p>
                )}
              </div>

              {/* Column 1 - Purchase Date */}
              <div>
                <label htmlFor="purchaseDate" className="block text-sm font-medium">
                  Purchase Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="purchaseDate"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.purchaseDate && (
                  <p className="text-red-500 text-sm">Purchase date is required</p>
                )}
              </div>

              {/* Column 2 - Purchased By */}
              <div>
                <label htmlFor="purchasedBy" className="block text-sm font-medium">
                  Purchased By <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="purchasedBy"
                  name="purchasedBy"
                  value={formData.purchasedBy}
                  onChange={handleInputChange}
                  placeholder="Enter purchaser's name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.purchasedBy && (
                  <p className="text-red-500 text-sm">
                    Purchaser's name is required
                  </p>
                )}
              </div>

              {/* Column 1 - Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium">
                  Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.amount && (
                  <p className="text-red-500 text-sm">Valid amount is required</p>
                )}
              </div>

              {/* Column 2 - Paid By */}
              <div>
                <label htmlFor="paidBy" className="block text-sm font-medium">
                  Paid By <span className="text-red-500">*</span>
                </label>
                <select
                  id="paidBy"
                  name="paidBy"
                  value={formData.paidBy}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              {/* Column 1 - Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Column 2 - Attachment */}
              <div>
                <label htmlFor="attachment" className="block text-sm font-medium">
                  Attachment <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <button
              onClick={editIndex !== null ? handleEditExpense : handleAddExpense}
              className="mt-4 px-6 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-md"
            >
              {editIndex !== null ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse shadow-lg rounded-md">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left border-b font-semibold text-md tracking-wide">
                Item Name
              </th>
              <th className="px-4 py-3 text-left border-b font-semibold text-md tracking-wide">
                Purchase From
              </th>
              <th className="px-4 py-3 text-left border-b font-semibold text-md tracking-wide">
                Purchase Date
              </th>
              <th className="px-4 py-3 text-left border-b font-semibold text-md tracking-wide">
                Purchased By
              </th>
              <th className="px-4 py-3 text-left border-b font-semibold text-md tracking-wide">
                Amount
              </th>
              <th className="px-4 py-3 text-left border-b font-semibold text-md tracking-wide">
                Paid By
              </th>
              <th className="px-4 py-3 text-left border-b font-semibold text-md tracking-wide">
                Status
              </th>
              <th className="px-4 py-3 text-left border-b font-semibold text-md tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentExpenses.length > 0 ? (
              currentExpenses.map((expense, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{expense.itemName}</td>
                  <td className="px-4 py-2">{expense.purchaseFrom}</td>
                  <td className="px-4 py-2">{expense.purchaseDate}</td>
                  <td className="px-4 py-2">{expense.purchasedBy}</td>
                  <td className="px-4 py-2">{expense.amount}</td>
                  <td className="px-4 py-2">{expense.paidBy}</td>
                  <td
                    className={`px-4 py-2 ${expense.status === "approved" ? "text-green-500" : "text-yellow-500"}`}
                  >
                    {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                  </td>
                  <td className="px-4 py-2 flex items-center space-x-4">
                    <button
                      onClick={() => {
                        setFormData(expense);
                        setIsFormVisible(true);
                        setEditIndex(index);
                      }}
                      className="text-slate-500 hover:text-blue-700"
                    >
                      <HiOutlinePencilAlt size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(index)}
                      className="text-slate-500 hover:text-red-700"
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-2 text-center">
                  No Expenses added yet
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
