import React, { useState } from 'react';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { GiCancel } from "react-icons/gi";
import { Link } from 'react-router-dom';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    status: 'active',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    contact: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  // Dropdown menu state
  const [dropdownIndex, setDropdownIndex] = useState(null);

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle status change (active/inactive)
  const handleStatusChange = (e) => {
    setFormData((prevData) => ({ ...prevData, status: e.target.value }));
  };

  // Function to validate the form before adding or updating a contact
  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      contact: !formData.contact.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  // Function to handle form submission for adding a new contact
  const handleAddContact = () => {
    if (validateForm()) {
      setContacts([...contacts, formData]);
      setFormData({ name: '', email: '', contact: '', status: 'active' });
      setIsFormVisible(false);
    }
  };

  // Function to handle editing an existing contact
  const handleEditContact = () => {
    if (validateForm()) {
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = formData;
      setContacts(updatedContacts);
      setFormData({ name: '', email: '', contact: '', status: 'active' });
      setIsFormVisible(false);
      setEditIndex(null);
    }
  };

  // Function to handle deleting a contact
  const handleDeleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    setDropdownIndex(null);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate the filtered contacts
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  // Function to change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-2">Contacts</h1>
      <h1 className="font-semibold mb-4"><Link to="/" >Dashboard</Link> / Contacts</h1>
      {/* Search Bar and Add Contact Button */}
      <div className="flex justify-between items-center mb-4 space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search contacts"
          className="px-4 py-2 border border-gray-300 rounded-md w-48 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
        />
        <button
          onClick={() => {
            setIsFormVisible(true);
            setEditIndex(null); // Reset for adding new contact
          }}
          className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900 transition duration-300"
        >
          Add Contact
        </button>
      </div>

      {/* Popover Form to add or edit a contact */}
      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg relative">
            {/* Close Icon */}
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">
              {editIndex !== null ? 'Edit Contact' : 'Add Contact'}
            </h2>
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {formErrors.name && <p className="text-red-500 text-sm">Name is required</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {formErrors.email && <p className="text-red-500 text-sm">Email is required</p>}
              </div>

              {/* Contact Field */}
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {formErrors.contact && <p className="text-red-500 text-sm">Contact is required</p>}
              </div>

              {/* Status Field (Radio Buttons) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="active"
                      name="status"
                      value="active"
                      checked={formData.status === 'active'}
                      onChange={handleStatusChange}
                      className="mr-2"
                    />
                    <label htmlFor="active" className="text-sm">Active</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="inactive"
                      name="status"
                      value="inactive"
                      checked={formData.status === 'inactive'}
                      onChange={handleStatusChange}
                      className="mr-2"
                    />
                    <label htmlFor="inactive" className="text-sm">Inactive</label>
                  </div>
                </div>
              </div>

              {/* Add Button */}
              <div className="flex gap-4">
                <button
                  onClick={editIndex !== null ? handleEditContact : handleAddContact}
                  className="px-6 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 transition duration-300"
                >
                  {editIndex !== null ? 'Update' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contacts Table */}
      <div className="mt-4">
        <table className="min-w-full table-auto border-collapse shadow-lg rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b">Name</th>
              <th className="px-4 py-2 text-left border-b">Email</th>
              <th className="px-4 py-2 text-left border-b">Contact</th>
              <th className="px-4 py-2 text-left border-b">Status</th>
              <th className="px-4 py-2 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.length > 0 ? (
              currentContacts.map((contact, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition duration-200 ease-in-out">
                  <td className="px-4 py-2">{contact.name}</td>
                  <td className="px-4 py-2">{contact.email}</td>
                  <td className="px-4 py-2">{contact.contact}</td>
                  <td
                    className={`px-4 py-2 ${contact.status === 'active' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {contact.status === 'active' ? 'Active' : 'Inactive'}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setDropdownIndex(dropdownIndex === index ? null : index)
                        }
                        className="text-gray-500 hover:text-gray-600 transition duration-200 ease-in-out"
                      >
                        <HiOutlinePencilAlt className="text-slate-900 hover:text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteContact(index)}
                        className="ml-2 text-gray-500 hover:text-gray-600 transition duration-200 ease-in-out"
                      >
                        <HiOutlineTrash className="text-slate-900 hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

    </div>
  );
}
