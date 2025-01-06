import React, { useState } from 'react';
import { GiCancel } from "react-icons/gi";
import { HiOutlinePlusCircle, HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [formData, setFormData] = useState({
    client: '',
    project: '',
    email: '',
    tax: '',
    clientAddress: '',
    billingAddress: '',
    invoiceDate: '',
    dueDate: '',
    discount: '',
    status: 'pending',
    otherInfo: '',
    invoiceNumber: '', // New field for invoice number
    items: [],
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  // Function to generate a random 5-digit invoice number
  const generateInvoiceNumber = () => {
    return Math.floor(10000 + Math.random() * 90000).toString(); // Generates a 5-digit number
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.client.trim()) errors.client = 'Client name is required';
    if (!formData.project.trim()) errors.project = 'Project is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (formData.discount && isNaN(formData.discount)) errors.discount = 'Discount must be a number';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Assign a random invoice number if creating a new invoice
      if (editIndex === null) {
        formData.invoiceNumber = generateInvoiceNumber();
      }

      // Mark as modified only when the data is being edited
      if (editIndex !== null) {
        const updatedInvoices = [...invoices];
        updatedInvoices[editIndex] = { ...formData, modified: true }; // Mark as modified
        setInvoices(updatedInvoices);
      } else {
        setInvoices([...invoices, { ...formData, modified: true }]); // New invoice marked as modified
      }

      setFormData({
        client: '',
        project: '',
        email: '',
        tax: '',
        clientAddress: '',
        billingAddress: '',
        invoiceDate: '',
        dueDate: '',
        discount: '',
        status: 'pending',
        otherInfo: '',
        invoiceNumber: '', // Reset the invoice number
        items: [],
        modified: false
      });
      setIsFormVisible(false);
      setEditIndex(null);
    }
  };

  const handleAddItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { item: '', description: '', unitCost: '', quantity: '', amount: '' }],
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;

    // Automatically calculate amount if unit cost and quantity are entered
    if (field === 'unitCost' || field === 'quantity') {
      const unitCost = parseFloat(updatedItems[index].unitCost || 0);
      const quantity = parseFloat(updatedItems[index].quantity || 0);
      updatedItems[index].amount = (unitCost * quantity).toFixed(2);
    }

    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const handleDeleteItem = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      items: prevData.items.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className='flex flex-col gap-3'>
          <h1 className="text-3xl font-semibold mb-4">Invoices</h1>
          <h1 className="font-semibold mb-4">
            <Link to="/">Dashboard</Link> / Invoices
          </h1>
        </div>
        {/* Add Invoice Button */}
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={() => {
              setIsFormVisible(true);
              setEditIndex(null);
            }}
            className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900"
          >
            Add Invoice
          </button>
        </div>
      </div>
      {/* Invoices table when invoices exist or no invoices */}
      {/* Invoices table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Invoice Number</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Client</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Invoice Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Due Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-600">
                  <h2 className="text-xl font-semibold">No invoices added yet</h2>
                </td>
              </tr>
            ) : (
              invoices.map((invoice, index) => (
                <tr
                  key={index}
                  className={invoice.modified ? "bg-yellow-100" : ""} // Apply highlight for modified invoices
                >
                  <td className="border border-gray-300 px-4 py-2">{invoice.invoiceNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{invoice.client}</td>
                  <td className="border border-gray-300 px-4 py-2">{invoice.invoiceDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{invoice.dueDate}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {invoice.items.reduce((total, item) => total + parseFloat(item.amount || 0), 0).toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{invoice.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex justify-center space-x-4">
                      <HiOutlinePencilAlt
                        onClick={() => {
                          setEditIndex(index);
                          setFormData(invoice);
                          setIsFormVisible(true);
                        }}
                        className="text-slate-500 hover:text-blue-700 cursor-pointer"
                        size={24}
                      />
                      <HiOutlineTrash
                        onClick={() => {
                          const updatedInvoices = invoices.filter((_, i) => i !== index);
                          setInvoices(updatedInvoices);
                        }}
                        className="text-slate-500 hover:text-red-700 cursor-pointer"
                        size={24}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Form */}
      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-5xl p-6 rounded-md shadow-lg relative overflow-auto max-h-[80vh]">
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">
              {editIndex !== null ? 'Edit Invoice' : 'Add Invoice'}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Standard Fields with Required Red Star */}
              {['client', 'project', 'email', 'tax', 'clientAddress', 'billingAddress'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                    {field.replace(/([A-Z])/g, ' $1')}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={['tax'].includes(field) ? 'number' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${field}`}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  {formErrors[field] && <p className="text-red-500 text-sm">{formErrors[field]}</p>}
                </div>
              ))}

              {/* Invoice Number */}
              <div>
                <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700">
                  Invoice Number
                </label>
                <input
                  type="text"
                  id="invoiceNumber"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleInputChange}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Invoice Date and Due Date */}
              <div>
                <label htmlFor="invoiceDate" className="block text-sm font-medium text-gray-700">
                  Invoice Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="invoiceDate"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.invoiceDate && <p className="text-red-500 text-sm">{formErrors.invoiceDate}</p>}
              </div>

              {/* Due Date */}
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.dueDate && <p className="text-red-500 text-sm">{formErrors.dueDate}</p>}
              </div>
            </div>
            {/* Items Table */}
            <h3 className="text-lg font-semibold mt-6 mb-2">Items</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Item</th>
                  <th className="border border-gray-300 px-4 py-2">Description</th>
                  <th className="border border-gray-300 px-4 py-2">Unit Cost</th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">Amount</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    <HiOutlinePlusCircle
                      onClick={handleAddItem}
                      className="text-slate-500 hover:text-slate-600 cursor-pointer"
                      size={24}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={item.item}
                        onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        value={item.unitCost}
                        onChange={(e) => handleItemChange(index, 'unitCost', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{item.amount || '0.00'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <HiOutlineTrash
                        onClick={() => handleDeleteItem(index)}
                        className="text-slate-600 hover:text-red-700 cursor-pointer"
                        size={24}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {/* Discount */}
              <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount</label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="Enter Discount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.discount && <p className="text-red-500 text-sm">{formErrors.discount}</p>}
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              {/* Other Information */}
              <div className="col-span-2">
                <label htmlFor="otherInfo" className="block text-sm font-medium text-gray-700">Other Information</label>
                <textarea
                  id="otherInfo"
                  name="otherInfo"
                  value={formData.otherInfo}
                  onChange={handleInputChange}
                  placeholder="Additional information"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 px-6 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600"
            >
              {editIndex !== null ? 'Update' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

