import React, { useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';

export default function Holidays() {
  // State to store holidays and form inputs
  const [holidays, setHolidays] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [holidayName, setHolidayName] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [selectedHolidayIndex, setSelectedHolidayIndex] = useState(null);
  const [dropdownVisibleIndex, setDropdownVisibleIndex] = useState(null); // State for dropdown visibility

  // Handler to add or update holiday
  const saveHoliday = (e) => {
    e.preventDefault();

    if (holidayName && holidayDate) {
      const day = new Date(holidayDate).toLocaleString('en-US', { weekday: 'long' }); // Get the day of the week

      if (selectedHolidayIndex !== null) {
        // If editing, update the holiday
        const updatedHolidays = holidays.map((holiday, index) =>
          index === selectedHolidayIndex
            ? { ...holiday, name: holidayName, date: holidayDate, day }
            : holiday
        );
        setHolidays(updatedHolidays);
      } else {
        // If adding, add the new holiday
        setHolidays([...holidays, { name: holidayName, date: holidayDate, day }]);
      }

      // Reset the form fields and hide the form
      setHolidayName('');
      setHolidayDate('');
      setIsFormVisible(false);
      setSelectedHolidayIndex(null); // Reset selected index after saving
    } else {
      alert('Please fill out both fields');
    }
  };

  // Handler to delete holiday
  const deleteHoliday = (index) => {
    const newHolidays = holidays.filter((_, i) => i !== index);
    setHolidays(newHolidays);
  };

  // Handler to edit holiday (example)
  const editHoliday = (index) => {
    const holiday = holidays[index];
    setHolidayName(holiday.name);
    setHolidayDate(holiday.date);
    setSelectedHolidayIndex(index);
    setIsFormVisible(true); // Open the form to edit
  };

  // Toggle the dropdown visibility for a specific holiday
  const toggleDropdown = (index) => {
    setDropdownVisibleIndex(dropdownVisibleIndex === index ? null : index);
  };

  return (
    <div className="p-6">
      {/* Header with flexbox layout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Holidays</h1>
        <button
          onClick={() => setIsFormVisible(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Add Holiday
        </button>
      </div>

      {/* Popover Modal for Form */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out opacity-0" style={{ opacity: 1 }}>
          <div className="bg-white p-6 rounded-md shadow-lg w-96 transform transition-all duration-300 scale-95 hover:scale-100">
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
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 ease-in-out"
                >
                  {selectedHolidayIndex !== null ? 'Update Holiday' : 'Add Holiday'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 ease-in-out"
                >
                  Cancel
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
                  <td className="py-3 px-4">{holiday.name}</td>
                  <td className="py-3 px-4">{holiday.date}</td>
                  <td className="py-3 px-4">{holiday.day}</td>
                  <td className="py-3 px-4 relative">
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="text-gray-600 hover:text-black transition duration-200 ease-in-out"
                    >
                      <HiOutlineDotsVertical />
                    </button>

                    {/* Dropdown Menu with animation */}
                    {dropdownVisibleIndex === index && (
                      <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-32 border transition-transform transform origin-top-right">
                        <button
                          onClick={() => editHoliday(index)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteHoliday(index)}
                          className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
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
