import React, { useState, useEffect } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { GiCancel } from "react-icons/gi";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Clients() {
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
    clientImage: null, // Ensure it's null initially
  });
  const [formErrors, setFormErrors] = useState({});
  const [menuVisible, setMenuVisible] = useState(null);

  // Fetch all clients when the component mounts
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/clients', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setClients(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, [key]: file })); // Store the file itself, not the base64 string
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

    // Optional: Check for client image when adding or editing a client
    if (!formData.clientImage && editingIndex === null) {
      errors.clientImage = 'Client image is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddClient = async () => {
    if (validateForm()) {
      const clientFormData = new FormData();
      clientFormData.append('first_name', formData.firstName);
      clientFormData.append('last_name', formData.lastName);
      clientFormData.append('email', formData.email);
      clientFormData.append('number', formData.phone);
      clientFormData.append('company', formData.company);

      // Only append client_image if it exists
      if (formData.clientImage) {
        clientFormData.append('client_picture', formData.clientImage);
      }

      try {
        const response = await fetch('http://localhost:3000/api/clients', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
          body: clientFormData,
        });

        const data = await response.json();
        if (response.ok) {
          setClients([...clients, data.client]);
          setIsFormVisible(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            clientImage: null, // Reset image data
          });
        } else {
          console.error(data.error);
          alert('Failed to add client: ' + data.error);
        }
      } catch (error) {
        console.error('Error adding client:', error);
        alert('An error occurred while adding the client.');
      }
    }
  };

  const handleEditClient = async (index) => {
    setEditingIndex(index);
    setFormData(clients[index]);
    setIsFormVisible(true);
    setMenuVisible(null);
  };

  const handleDeleteClient = async (index) => {
    const clientId = clients[index]._id;
    try {
      const response = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      });
      if (response.ok) {
        const updatedClients = clients.filter((_, i) => i !== index);
        setClients(updatedClients);
        setMenuVisible(null);
      } else {
        const data = await response.json();
        console.error(data.error);
        alert('Failed to delete client: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('An error occurred while deleting the client.');
    }
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
    <div>
      <div className="flex justify-between items-center mb-6" >
        <div className='flex flex-col'>
          <h1 className="text-3xl font-semibold mb-2">Client List</h1>
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
          clients.map((client, index) => {
            const imageSrc = client.client_picture || 'https://via.placeholder.com/150'; // Fallback if client_picture is undefined
            return (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative"
              >
                <div className="relative">
                  <img
                    src={imageSrc} // Use the imageSrc defined inside the map method
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
                  {client.first_name} {client.last_name}
                </h3>
                <p className="text-center text-gray-500">{client.email}</p>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No clients found.
          </div>
        )}
      </div>

      {/* Popover for Client Details */}
      {selectedClient && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 max-w-4xl p-6 rounded-md shadow-lg">
            <GiCancel
              onClick={closeDetails}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-600 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">Client Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedClient.client_picture || 'https://via.placeholder.com/150'} // Fallback if client_picture is undefined
                  alt="Client"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
              </div>
              <div>
                <p><strong>First Name:</strong> {selectedClient.first_name}</p>
                <p><strong>Last Name:</strong> {selectedClient.last_name}</p>
                <p><strong>Email:</strong> {selectedClient.email}</p>
                <p><strong>Phone:</strong> {selectedClient.number}</p>
                <p><strong>Company:</strong> {selectedClient.company}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popover Form to Add/Edit Client */}
      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white relative w-11/12 max-w-4xl p-6 rounded-md shadow-lg">
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-600 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">{editingIndex !== null ? 'Edit Client' : 'Add Client'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-xs">{formErrors.firstName}</p>
                )}
              </div>
              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-xs">{formErrors.lastName}</p>
                )}
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs">{formErrors.email}</p>
                )}
              </div>
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-xs">{formErrors.phone}</p>
                )}
              </div>
              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {formErrors.company && (
                  <p className="text-red-500 text-xs">{formErrors.company}</p>
                )}
              </div>
              {/* Client Image */}
              <div>
                <label htmlFor="clientImage" className="block text-sm font-medium">
                  Client Image
                </label>
                <input
                  type="file"
                  id="clientImage"
                  name="clientImage"
                  onChange={(e) => handleImageChange(e, 'clientImage')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {formErrors.clientImage && (
                  <p className="text-red-500 text-xs">{formErrors.clientImage}</p>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAddClient}
                className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900"
              >
                {editingIndex !== null ? 'Save Changes' : 'Add Client'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}
