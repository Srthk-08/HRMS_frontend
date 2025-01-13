import React, { useState, useEffect } from 'react';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { GiCancel } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [updateList, setUpdateList] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    status: 'active',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    number: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;

  // Get the token from cookies
  const token = Cookies.get('authToken');


  // Fetch contacts from the backend with token authorization
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/contact', {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass token in the Authorization header
          },
        });
        if (Array.isArray(response.data)) {
          setContacts(response.data);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    if (token) {
      fetchContacts();
    } else {
      console.error('No token found, please log in');
    }
  }, [token, updateList]);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle status change (active/inactive)
  const handleStatusChange = (e) => {
    setFormData((prevData) => ({ ...prevData, status: e.target.value }));
  };

  // Validate form inputs
  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      number: !formData.number.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  // Add contact
  const handleAddContact = async () => {
    setUpdateList(!updateList);
    if (validateForm()) {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/contact',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Log the response to verify the data
        console.log('Added contact:', response.data);

        // Add the new contact to the contacts list
        setContacts((prevContacts) => {
          return [...prevContacts, response.data];
        });

        // Reset the form and close the form modal
        setFormData({ name: '', email: '', number: '', status: 'active' });
        setIsFormVisible(false);
      } catch (error) {
        console.error('Error adding contact:', error);
      }
    }
  };

  // Edit contact
  const handleEditContact = async () => {
    setUpdateList(!updateList);
    if (validateForm()) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/contact/${formData._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update the contact list with the updated contact
        const updatedContacts = contacts.map((contact) =>
          contact._id === formData._id ? response.data : contact
        );
        setContacts(updatedContacts);

        // Reset the form and close the form modal
        setFormData({ name: '', email: '', number: '', status: 'active' });
        setIsFormVisible(false);
        setEditIndex(null);
      } catch (error) {
        console.error('Error updating contact:', error);
      }
    }
  };

  // Delete contact
  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) =>
    contact.name && contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate the filtered contacts
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  // Change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total number of pages
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold mb-2">Contacts</h1>
          <h1 className="font-semibold mb-4">
            <Link to="/">Dashboard</Link> / Contacts
          </h1>
        </div>
        <div className="flex justify-end items-center mb-4 space-x-4">
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
              setEditIndex(null);
            }}
            className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900 transition duration-300"
          >
            Add Contact
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg relative">
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">
              {editIndex !== null ? 'Edit Contact' : 'Add Contact'}
            </h2>
            <div className="space-y-4">
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

              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {formErrors.number && <p className="text-red-500 text-sm">Contact is required</p>}
              </div>

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

      <table className="min-w-full table-auto border-collapse shadow-lg rounded-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left text-md font-semibold">Name</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Email</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Contact</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Status</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentContacts.map((contact, index) => (
            <tr key={contact._id} className='border-b hover:bg-gray-50 transition duration-200 ease-in-out'>
              <td className="px-4 py-2">{contact.name}</td>
              <td className="px-4 py-2">{contact.email}</td>
              <td className="px-4 py-2">{contact.number}</td>
              <td className="px-4 py-2">{contact.status}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => {
                    setEditIndex(index);
                    setFormData(contact);
                    setIsFormVisible(true);
                  }}
                  className="text-slate-500 hover:text-blue-700"
                >
                  <HiOutlinePencilAlt size={20} />
                </button>
                <button
                  onClick={() => handleDeleteContact(contact._id)}
                  className="ml-2 text-slate-500 hover:text-red-700"
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
