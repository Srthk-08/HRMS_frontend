import React, { useState } from 'react';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { GiCancel } from 'react-icons/gi'; // Import GiCancel icon
import { Link } from 'react-router-dom';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'vyanwebs',
    email: 'vyanwebs@gmail.com'
  });
  const [formData, setFormData] = useState({
    username: profileData.username,
    email: profileData.email
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profileData); // Reset to original profile data
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen relative">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Contacts</h1>
        <h1 className="font-semibold mb-4">
          <Link to="/">Dashboard</Link> / Contacts
        </h1>
      </div>
      <div className="bg-gray-100 flex p-4 rounded-lg shadow-md">
        {/* Profile Picture Section */}
        <div className="mr-4">
          {/* Increased the size of the rounded div */}
          <div className="w-20 h-20 rounded-full bg-gray-300"></div>
        </div>

        {/* Info Section with relative positioning to place pencil icon */}
        <div className="flex flex-col justify-center w-full relative">
          {/* Edit Icon (Pencil) positioned at the top-right corner of the details section */}
          <div className="absolute top-4 right-4 ">
            <HiOutlinePencilSquare
              size={24}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
              onClick={() => setIsEditing(true)} // Trigger edit mode
            />
          </div>

          <h2 className="text-lg font-semibold mb-2">{profileData.username}</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Username:</span>
              {/* Shifted the username to the right */}
              <span className="ml-auto">{profileData.username}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Email:</span>
              {/* Shifted the email to the right */}
              <span className="ml-auto">{profileData.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popover Form for Editing */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-4 rounded-md shadow-lg relative flex flex-col h-80">
            {/* Cancel Icon */}
            <div className="absolute top-4 right-4">
              <GiCancel
                size={24}
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={handleCancel} // Cancel editing
              />
            </div>

            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            {/* Form for Editing */}
            <div className="flex-1 overflow-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            {/* Save Button at the bottom */}
            <div className="mt-auto flex">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
