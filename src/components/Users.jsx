import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    avatar: null,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    fullName: false,
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      avatar: e.target.files[0],
    }));
  };

  const validateForm = () => {
    const errors = {
      fullName: !formData.fullName.trim(),
      username: !formData.username.trim(),
      email: !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email),
      password: !formData.password.trim(),
      confirmPassword: formData.password !== formData.confirmPassword,
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  const handleAddUser = () => {
    if (validateForm()) {
      setUsers([
        ...users,
        {
          ...formData,
          createdDate: new Date().toLocaleDateString(), // Add the current date
        },
      ]);
      setFormData({
        fullName: "",
        avatar: null,
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsFormVisible(false);
    }
  };

  const handleEditUser = () => {
    if (validateForm()) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = {
        ...formData,
        createdDate: users[editIndex].createdDate, // Preserve the original created date
      };
      setUsers(updatedUsers);
      setFormData({
        fullName: "",
        avatar: null,
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsFormVisible(false);
      setEditIndex(null);
    }
  };

  const handleDeleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">Users</h1>
          <h1 className="font-semibold mb-4">
            <Link to="/">Dashboard</Link> / Users
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search users"
            className="px-4 py-2 border rounded-md"
          />
          <button
            onClick={() => {
              setIsFormVisible(true);
              setEditIndex(null);
            }}
            className="bg-slate-700 hover:bg-slate-900 text-white px-4 py-2 rounded-md"
          >
            Add User
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="text-gray-500 cursor-pointer float-right"
              size={24}
            />
            <h2 className="text-xl mb-4">{editIndex !== null ? "Edit" : "Add"} User</h2>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="mb-4 w-full px-4 py-2 border rounded-md"
            />
            <input
              type="file"
              name="avatar"
              onChange={handleFileChange}
              className="mb-4 w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              className="mb-4 w-full px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="mb-4 w-full px-4 py-2 border rounded-md"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="mb-4 w-full px-4 py-2 border rounded-md"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="mb-4 w-full px-4 py-2 border rounded-md"
            />
            <button
              onClick={editIndex !== null ? handleEditUser : handleAddUser}
              className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md w-full"
            >
              {editIndex !== null ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full table-auto border-collapse shadow-lg rounded-md">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left border-b font-semibold text-md tracking-wide">
              Name
            </th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md tracking-wide">
              Username
            </th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md tracking-wide">
              Email
            </th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md tracking-wide">
              Created Date
            </th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{user.fullName}</td>
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.createdDate}</td>
              <td className="px-4 py-2 flex items-center space-x-4">
                <button
                  onClick={() => {
                    setFormData(user);
                    setIsFormVisible(true);
                    setEditIndex(index);
                  }}
                  className="text-slate-500 hover:text-blue-700"
                >
                  <HiOutlinePencilAlt size={20} />
                </button>
                <button
                  onClick={() => handleDeleteUser(index)}
                  className="text-slate-500 hover:text-red-700"
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
