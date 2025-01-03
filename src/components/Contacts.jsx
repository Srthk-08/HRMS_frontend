import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contacts() {
  // State to manage the list of contacts and the form state
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    status: 'active', // 'active' or 'inactive'
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    contact: false,
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5; // Display 5 contacts per page

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle status change (active/inactive)
  const handleStatusChange = (e) => {
    setFormData((prevData) => ({ ...prevData, status: e.target.value }));
  };

  // Function to validate the form before adding a contact
  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      contact: !formData.contact.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true); // Return true if no errors
  };

  // Function to handle form submission and add contact
  const handleAddContact = () => {
    if (validateForm()) {
      setContacts([...contacts, formData]);
      setFormData({ name: '', email: '', contact: '', status: 'active' });
      setIsFormVisible(false); // Hide form after submitting
    }
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
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Contacts</h1>

      {/* Search Bar and Add Contact Button */}
      <div className="flex justify-end items-center mb-4 space-x-4">
        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search contacts"
          className="px-4 py-2 border border-gray-300 rounded-md w-48"
        />

        {/* Add Contact Button */}
        <button
          onClick={() => setIsFormVisible(true)}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Contact
        </button>
      </div>

      {/* Popover Form to add a new contact */}
      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add Contact</h2>

            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.name && <p className="text-red-500 text-sm">Name is required</p>}
              </div>

              {/* Email Field */}
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
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.email && <p className="text-red-500 text-sm">Email is required</p>}
              </div>

              {/* Contact Field */}
              <div>
                <label htmlFor="contact" className="block text-sm font-medium">
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.contact && <p className="text-red-500 text-sm">Contact is required</p>}
              </div>

              {/* Status Field (Radio Buttons) */}
              <div>
                <label className="block text-sm font-medium">Status</label>
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

              {/* Add and Cancel Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddContact}
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsFormVisible(false)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contacts Table */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Contact List:</h2>

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b">Name</th>
              <th className="px-4 py-2 text-left border-b">Email</th>
              <th className="px-4 py-2 text-left border-b">Contact</th>
              <th className="px-4 py-2 text-left border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.length > 0 ? (
              currentContacts.map((contact, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{contact.name}</td>
                  <td className="px-4 py-2">{contact.email}</td>
                  <td className="px-4 py-2">{contact.contact}</td>
                  <td
                    className={`px-4 py-2 ${contact.status === 'active' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {contact.status === 'active' ? 'Active' : 'Inactive'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Link back to dashboard */}
      <div className="mt-6">
        <Link to="/" className="text-blue-500 underline">Go to Dashboard</Link>
      </div>
    </div>
  );
}
