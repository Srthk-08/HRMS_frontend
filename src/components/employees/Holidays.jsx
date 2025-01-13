import React, { useState, useEffect } from 'react';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { GiCancel } from "react-icons/gi";
import Cookies from 'js-cookie';

export default function Holidays() {
  // State to store holidays and form inputs
  const [holidays, setHolidays] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [holidayName, setHolidayName] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [selectedHolidayIndex, setSelectedHolidayIndex] = useState(null);
  const [dropdownVisibleIndex, setDropdownVisibleIndex] = useState(null); // State for dropdown visibility

  const apiUrl = 'http://localhost:3000/api/holidays'; // Update with your API URL
  const token = Cookies.get('authToken'); // Get the token from cookies
 
  // Fetch holidays from backend
  const fetchHolidays = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Attach token to Authorization header
        },
      });
      if (!response.ok) throw new Error('Failed to fetch holidays');
      const data = await response.json();
      setHolidays(data);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  // Fetch holidays when the component mounts
  useEffect(() => {
    if (token) {
      fetchHolidays();
    } else {
      console.error("Authentication token not found");
    }
  }, [token]);

  // Handler to add or update holiday
  const saveHoliday = async (e) => {
    e.preventDefault();

    if (holidayName && holidayDate) {
      const day = new Date(holidayDate).toLocaleString('en-US', { weekday: 'long' }); // Get the day of the week

      const holidayData = { title: holidayName, date: holidayDate, day };

      try {
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        if (selectedHolidayIndex !== null) {
          // If editing, update the holiday
          const response = await fetch(`${apiUrl}/${holidays[selectedHolidayIndex]._id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(holidayData),
          });
          if (!response.ok) throw new Error('Failed to update holiday');
          fetchHolidays(); // Refresh the holidays list
        } else {
          // If adding, add the new holiday
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(holidayData),
          });
          if (!response.ok) throw new Error('Failed to add holiday');
          fetchHolidays(); // Refresh the holidays list
        }

        // Reset the form fields and hide the form
        setHolidayName('');
        setHolidayDate('');
        setIsFormVisible(false);
        setSelectedHolidayIndex(null); // Reset selected index after saving
      } catch (error) {
        console.error("Error saving holiday:", error);
      }
    } else {
      alert('Please fill out both fields');
    }
  };

  // Handler to delete holiday
  const deleteHoliday = async (index) => {
    try {
      const response = await fetch(`${apiUrl}/${holidays[index]._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete holiday');
      fetchHolidays(); // Refresh the holidays list after deletion
    } catch (error) {
      console.error("Error deleting holiday:", error);
    }
  };

  // Handler to edit holiday
  const editHoliday = (index) => {
    const holiday = holidays[index];
    setHolidayName(holiday.title);
    setHolidayDate(holiday.date);
    setSelectedHolidayIndex(index);
    setIsFormVisible(true); // Open the form to edit
  };

  // Toggle the dropdown visibility for a specific holiday
  const toggleDropdown = (index) => {
    setDropdownVisibleIndex(dropdownVisibleIndex === index ? null : index);
  };

  return (
    <div>
      {/* Header with flexbox layout */}
      <div className="flex justify-between items-center mb-6">
        <div className='flex flex-col gap-3'>
          <h1 className="text-3xl font-semibold text-gray-800">Holidays</h1>
          <h1 className="font-semibold mb-4"><Link to="/" >Dashboard</Link> / Holidays</h1>
        </div>
        <button
          onClick={() => setIsFormVisible(true)}
          className="px-6 py-3 bg-slate-700 text-white rounded-md hover:bg-slate-900 transition duration-200 ease-in-out"
        >
          Add Holiday
        </button>
      </div>

      {/* Popover Modal for Form */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out opacity-0" style={{ opacity: 1 }}>
          <div className="bg-white p-6 rounded-md shadow-lg w-96 transform transition-all duration-300 scale-95 hover:scale-100 relative">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">{selectedHolidayIndex !== null ? 'Edit Holiday' : 'Add New Holiday'}</h2>
            <form onSubmit={saveHoliday}>
              <div className="mb-4">
                <label htmlFor="holidayName" className="block text-lg text-gray-700">Holiday Name</label>
                <input
                  id="holidayName"
                  type="text"
                  value={holidayName}
                  onChange={(e) => setHolidayName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="holidayDate" className="block text-lg text-gray-700">Holiday Date</label>
                <input
                  id="holidayDate"
                  type="date"
                  value={holidayDate}
                  onChange={(e) => setHolidayDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 transition duration-200 ease-in-out"
                >
                  {selectedHolidayIndex !== null ? 'Update Holiday' : 'Add Holiday'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer z-60"
                >
                  <GiCancel size={24} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Holiday List in Table Format */}
      <div className="mt-6">
        <table className="min-w-full table-auto border-collapse bg-gray-50 rounded-md shadow-md">
          <thead className="text-bold">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Day</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {holidays.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-3 px-4 text-center text-gray-600">No holidays added yet.</td>
              </tr>
            ) : (
              holidays.map((holiday, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{holiday.title}</td>
                  <td className="py-3 px-4">{new Date(holiday.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}</td>
                  <td className="py-3 px-4">{holiday.day}</td>
                  <td className="py-3 px-4 relative">
                    <button
                      onClick={() => editHoliday(index)}
                      className="text-gray-600 hover:text-blue-600 transition duration-200 ease-in-out"
                    >
                      <HiOutlinePencilAlt />
                    </button>
                    <button
                      onClick={() => deleteHoliday(index)}
                      className="ml-4 text-gray-600 hover:text-red-600 transition duration-200 ease-in-out"
                    >
                      <HiOutlineTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
