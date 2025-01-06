import React, { useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { GiCancel } from "react-icons/gi";
import { Link } from 'react-router-dom';

export default function AllClient() {
  const [clients, setClients] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    clientImage: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [menuVisible, setMenuVisible] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, [key]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};
    ['firstName', 'lastName', 'email', 'phone', 'company'].forEach((key) => {
      if (!formData[key].trim()) {
        errors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddClient = () => {
    if (validateForm()) {
      if (editingIndex !== null) {
        const updatedClients = [...clients];
        updatedClients[editingIndex] = formData;
        setClients(updatedClients);
        setEditingIndex(null);
      } else {
        setClients([...clients, formData]);
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        clientImage: '',
      });
      setIsFormVisible(false);
    }
  };

  const handleEditClient = (index) => {
    setEditingIndex(index);
    setFormData(clients[index]);
    setIsFormVisible(true);
    setMenuVisible(null);
  };

  const handleDeleteClient = (index) => {
    const updatedClients = clients.filter((_, i) => i !== index);
    setClients(updatedClients);
    setMenuVisible(null);
  };

  const toggleMenu = (index) => {
    setMenuVisible(menuVisible === index ? null : index);
  };

  const handleCardClick = (client) => {
    setSelectedClient(client);
  };

  const closeDetails = () => {
    setSelectedClient(null);
  };
  return (
    <div className="p-4 ">
      <div div className="flex justify-between items-center mb-6" >
        <div className='flex flex-col gap-3'>
          <h1 className="text-2xl font-semibold mb-4">Client List</h1>
          <h1 className="font-semibold mb-4"><Link to="/" >Dashboard</Link> / Clients</h1>
        </div>
        {/* Add Client Section */}
        <div className="mb-4 flex justify-end items-center">
          <button
            onClick={() => setIsFormVisible(true)}
            className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900"
          >
            Add Client
          </button>
        </div>
      </div >

      {/* Client List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {clients.length > 0 ? ( 
          clients.map((client, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative"
            >
              <div className="relative">
                <img
                  src={client.clientImage || 'https://via.placeholder.com/150'}
                  alt="Client"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover cursor-pointer"
                  onClick={() => handleCardClick(client)}
                />
                <HiOutlineDotsVertical
                  className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => toggleMenu(index)}
                />
                {menuVisible === index && (
                  <div className="absolute top-8 right-2 bg-white shadow-lg border rounded-md text-sm z-10">
                    <button
                      onClick={() => handleEditClient(index)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClient(index)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-center">
                {client.firstName} {client.lastName}
              </h3>
              <p className="text-center text-gray-500">{client.email}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No clients found.
          </div>
        )}
      </div>

      {/* Popover for Client Details */}
      {
        selectedClient && (
          <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-11/12  relative max-w-4xl p-6 rounded-md shadow-lg">
              <GiCancel
                onClick={closeDetails}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-600 cursor-pointer"
                size={24}
              />
              <h2 className="text-xl font-semibold mb-4">Client Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedClient.clientImage || 'https://via.placeholder.com/150'}
                    alt="Client"
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                </div>
                <div>
                  <p><strong>First Name:</strong> {selectedClient.firstName}</p>
                  <p><strong>Last Name:</strong> {selectedClient.lastName}</p>
                  <p><strong>Email:</strong> {selectedClient.email}</p>
                  <p><strong>Phone:</strong> {selectedClient.phone}</p>
                  <p><strong>Company:</strong> {selectedClient.company}</p>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Popover Form to Add/Edit Client */}
      {
        isFormVisible && (
          <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white relative  w-11/12 max-w-4xl p-6 rounded-md shadow-lg">
              <GiCancel
                onClick={() => setIsFormVisible(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-600 cursor-pointer"
                size={24}
              />
              <h2 className="text-xl font-semibold mb-4">{editingIndex !== null ? 'Edit Client' : 'Add Client'}</h2>
              {/* Form Content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formErrors.company && <p className="text-red-500 text-sm">{formErrors.company}</p>}
                </div>

                {/* Client Image */}
                <div>
                  <label htmlFor="clientImage" className="block text-sm font-medium">
                    Client Image
                  </label>
                  <input
                    type="file"
                    id="clientImage"
                    onChange={(e) => handleImageChange(e, 'clientImage')}
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {formData.clientImage && (
                    <img
                      src={formData.clientImage}
                      alt="Client"
                      className="w-32 h-32 rounded-full mx-auto mt-4 object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={handleAddClient}
                  className="px-6 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600"
                >
                  {editingIndex !== null ? 'Save Changes' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}
