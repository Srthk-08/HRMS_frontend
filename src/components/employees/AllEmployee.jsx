import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios
import Cookies from 'js-cookie'; // Import js-cookie for cookie management
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { GiCancel } from "react-icons/gi";

export default function AllEmployee() {
  const [employees, setEmployees] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',  // This will be auto-generated
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    salary: '',
    reportingManager: '',
    area: '',
    employeeType: '',
    dateOfJoining: '',
    department: '',
    designation: '',
    employeeImage: '',
    adharNo: '',
    permanentAddress: '',
    birthday: '',
    religion: '',
    pincode: '',
    gender: '',
    city: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [menuVisible, setMenuVisible] = useState(null);
  const [filterDesignation, setFilterDesignation] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to generate a random 5-digit employee ID
  const generateEmployeeId = () => {
    const min = 10000; // Minimum 5-digit number
    const max = 99999; // Maximum 5-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Fetch employees from the backend with cookie-based authentication
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = Cookies.get('authToken');
        console.log(token);  // Get the auth token from cookies
        if (token) {
          // Include the token in the request header for authorization
          const response = await axios.get('http://localhost:3000/api/employees', {
            headers: {
              Authorization: `Bearer ${token}`,  // Attach token in Authorization header
            }
          });
          setEmployees(response.data);
          setFilteredEmployees(response.data); // Set filtered employees initially
        } else {
          console.error("Authentication token not found.");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

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
    Object.keys(formData).forEach((key) => {
      if (
        !formData[key].trim() &&
        ['employeeId', 'firstName', 'lastName', 'email', 'salary', 'reportingManager', 'area', 'company', 'department', 'designation'].includes(key)
      ) {
        errors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddEmployee = async () => {
    console.log(formData);
    if (validateForm()) {
      try {
        const token = Cookies.get('authToken');  // Get the auth token from cookies
        if (!token) {
          console.error("Authentication token not found.");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,  // Attach token in Authorization header
        };

        console.log("Form data being sent:", formData);  // Log formData for debugging

        if (editingIndex !== null) {
          // Edit existing employee
          const response = await axios.put(`http://localhost:3000/api/employees/${formData.employeeId}`, formData, { headers });
          console.log("Employee updated successfully:", response.data);
          const updatedEmployees = [...employees];
          updatedEmployees[editingIndex] = formData;
          setEmployees(updatedEmployees);
          setEditingIndex(null);
        } else {
          // Add new employee
          const response = await axios.post('http://localhost:3000/api/employees', formData, { headers });
          console.log("Employee added successfully:", response.data);
          setEmployees([...employees, formData]);
        }

        // Reset form data
        setFormData({
          employeeId: '', // Employee ID will be auto-generated when needed
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          salary: '',
          reportingManager: '',
          area: '',
          employeeType: '',
          dateOfJoining: '',
          department: '',
          designation: '',
          employeeImage: '',
          adharNo: '',
          permanentAddress: '',
          birthday: '',
          religion: '',
          pincode: '',
          gender: '',
          city: '',
        });
        setIsFormVisible(false);
      } catch (error) {
        console.error("Error adding/updating employee:", error);
      }
    }
  };

  const applyFilter = () => {
    if (filterDesignation.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(employee =>
        employee.designation.toLowerCase().includes(filterDesignation.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  };

  const handleEditEmployee = (index) => {
    setEditingIndex(index);
    setFormData(employees[index]);
    setIsFormVisible(true);
    setMenuVisible(null);
  };

  const handleDeleteEmployee = async (index) => {
    const employeeId = employees[index].employeeId;
    try {
      const token = Cookies.get('authToken');  // Get the auth token from cookies
      if (!token) {
        console.error("Authentication token not found.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,  // Attach token in Authorization header
      };

      await axios.delete(`http://localhost:3000/api/employees/${employeeId}`, { headers });
      const updatedEmployees = employees.filter((_, i) => i !== index);
      setEmployees(updatedEmployees);
      setMenuVisible(null);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const toggleMenu = (index) => {
    setMenuVisible(menuVisible === index ? null : index);
  };

  const openEmployeeModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  };

  const closeEmployeeModal = () => {
    setIsModalVisible(false);
    setSelectedEmployee(null);
  };

  const openAddEmployeeForm = () => {
    setFormData({
      ...formData,
      employeeId: generateEmployeeId(), // Auto-generate Employee ID
    });
    setIsFormVisible(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold mb-2">Employees</h1>
          <h1 className="font-semibold mb-4">
            <Link to="/">Dashboard</Link> / Employee
          </h1>
        </div>

        {/* Add Employee Button - Positioned in the top-right corner for mobile */}
        <button
          onClick={() => setIsFormVisible(true)}
          className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900"
        >
          Add Employee
        </button>
      </div>

      {/* Add Employee and Filter Section */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 relative">

        {/* Filter Section */}
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <input
            type="text"
            value={filterDesignation}
            onChange={(e) => setFilterDesignation(e.target.value)}
            placeholder="Filter by designation"
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
          />
          <button
            onClick={applyFilter}
            className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900"
          >
            Apply Filter
          </button>
        </div>
      </div>

      {/* Employee List in Card Format */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee, index) => (
            <div
              key={employee.employeeId}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative"
            >
              <img
                src={employee.employeeImage || 'https://via.placeholder.com/150'}
                alt="Employee"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover cursor-pointer"
                onClick={() => openEmployeeModal(employee)} // Open modal on click
              />
              <h3 className="text-lg font-semibold text-center">{employee.firstName} {employee.lastName}</h3>
              <p className="text-center text-gray-500">{employee.email}</p>
              <p className="text-center text-gray-700 mt-2">{employee.designation}</p>

              {/* Three dots menu for Edit/Delete */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => toggleMenu(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <HiOutlineDotsVertical className="text-xl" />
                </button>

                {menuVisible === index && (
                  <div className="absolute top-8 right-0 bg-white shadow-lg rounded-md w-32 py-2 z-10">
                    <button
                      onClick={() => handleEditEmployee(index)}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(index)}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No employees found.
          </div>
        )}
      </div>


      {/* Employee Details Modal */}
      {isModalVisible && selectedEmployee && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 max-w-4xl p-6 rounded-md shadow-lg transform transition-all duration-500 ease-in-out scale-95 opacity-0 animate-fadeIn relative">

            {/* Cancel Icon to Close Modal */}
            <GiCancel
              onClick={closeEmployeeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer z-60"
              size={24}
            />

            {/* Display Employee Profile Picture at the Top */}
            {selectedEmployee.employeeImage && (
              <img
                src={selectedEmployee.employeeImage}
                alt="Employee Profile"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
            )}

            <h2 className="text-xl font-semibold mb-4 text-center">
              {selectedEmployee.firstName} {selectedEmployee.lastName}
            </h2>

            {/* Modal Content with Scrollable Body */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 overflow-y-auto max-h-[60vh]">
              <p><strong>Email:</strong> {selectedEmployee.email}</p>
              <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
              <p><strong>Designation:</strong> {selectedEmployee.designation}</p>
              <p><strong>Salary:</strong> {selectedEmployee.salary}</p>
              <p><strong>Reporting Manager:</strong> {selectedEmployee.reportingManager}</p>
              <p><strong>Company:</strong> {selectedEmployee.company}</p>
              <p><strong>Date of Joining:</strong> {selectedEmployee.dateOfJoining}</p>
              <p><strong>Employee Type:</strong> {selectedEmployee.employeeType}</p>
              <p><strong>Department:</strong> {selectedEmployee.department}</p>
              <p><strong>Birthday:</strong> {selectedEmployee.birthday}</p>
              <p><strong>Address:</strong> {selectedEmployee.permanentAddress}</p>

              {/* Edit Button */}
              <div className="col-span-2 text-center mt-4">
                <button
                  onClick={() => handleEditEmployee(selectedEmployee.employeeId)}
                  className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900"
                >
                  Edit Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Popover Form to Add Employee */}
      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 max-w-4xl p-6 rounded-md relative">
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer z-60"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-96 overflow-y-auto pr-4">
              {/* Employee form fields */}
              <div>
                <label htmlFor="employeeId" className="block text-sm font-medium">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId || generateEmployeeId()}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.employeeId && <p className="text-red-500 text-sm">{formErrors.employeeId}</p>}
              </div>

              <div>
                <label htmlFor="firstName" className="block text-sm font-medium">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
              </div>

              <div>
                <label htmlFor="salary" className="block text-sm font-medium">
                  Salary <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary || ""}
                  onChange={handleInputChange}
                  placeholder="Enter salary"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.salary && <p className="text-red-500 text-sm">{formErrors.salary}</p>}
              </div>

              <div>
                <label htmlFor="reportingManager" className="block text-sm font-medium">
                  Reporting Manager <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="reportingManager"
                  name="reportingManager"
                  value={formData.reportingManager || ""}
                  onChange={handleInputChange}
                  placeholder="Enter reporting manager"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.reportingManager && <p className="text-red-500 text-sm">{formErrors.reportingManager}</p>}
              </div>

              <div>
                <label htmlFor="employeeType" className="block text-sm font-medium">
                  Employee Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="employeeType"
                  name="employeeType"
                  value={formData.employeeType || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Employee Type</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Contract">Contract</option>
                  <option value="Intern">Intern</option>
                </select>
                {formErrors.employeeType && <p className="text-red-500 text-sm">{formErrors.employeeType}</p>}
              </div>

              <div>
                <label htmlFor="dateOfJoining" className="block text-sm font-medium">
                  Date of Joining <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dateOfJoining"
                  name="dateOfJoining"
                  value={formData.dateOfJoining || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.dateOfJoining && <p className="text-red-500 text-sm">{formErrors.dateOfJoining}</p>}
              </div>

              <div>
                <label htmlFor="area" className="block text-sm font-medium">
                  Area <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={formData.area || ""}
                  onChange={handleInputChange}
                  placeholder="Enter area"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.area && <p className="text-red-500 text-sm">{formErrors.area}</p>}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company || ""}
                  onChange={handleInputChange}
                  placeholder="Enter company"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.company && <p className="text-red-500 text-sm">{formErrors.company}</p>}
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium">
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department || ""}
                  onChange={handleInputChange}
                  placeholder="Enter department"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.department && <p className="text-red-500 text-sm">{formErrors.department}</p>}
              </div>

              <div>
                <label htmlFor="designation" className="block text-sm font-medium">
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation || ""}
                  onChange={handleInputChange}
                  placeholder="Enter designation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.designation && <p className="text-red-500 text-sm">{formErrors.designation}</p>}
              </div>

              <div>
                <label htmlFor="employeeImage" className="block text-sm font-medium">
                  Employee Image
                </label>
                <input
                  type="file"
                  id="employeeImage"
                  onChange={(e) => handleImageChange(e, 'employeeImage')}
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formData.employeeImage && (
                  <img
                    src={formData.employeeImage}
                    alt="Employee"
                    className="w-32 h-32 rounded-full mx-auto mt-4 object-cover"
                  />
                )}
              </div>

              <div>
                <label htmlFor="adharNo" className="block text-sm font-medium">
                  Aadhar No
                </label>
                <input
                  type="text"
                  id="adharNo"
                  name="adharNo"
                  value={formData.adharNo || ""}
                  onChange={handleInputChange}
                  placeholder="Enter Aadhar number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="permanentAddress" className="block text-sm font-medium">
                  Permanent Address
                </label>
                <textarea
                  id="permanentAddress"
                  name="permanentAddress"
                  value={formData.permanentAddress || ""}
                  onChange={handleInputChange}
                  placeholder="Enter permanent address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="birthday" className="block text-sm font-medium">
                  Birthday
                </label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={formData.birthday || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="religion" className="block text-sm font-medium">
                  Religion
                </label>
                <input
                  type="text"
                  id="religion"
                  name="religion"
                  value={formData.religion || ""}
                  onChange={handleInputChange}
                  placeholder="Enter religion"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="picode" className="block text-sm font-medium">
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode || ""}
                  onChange={handleInputChange}
                  placeholder="Enter pincode"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={handleAddEmployee}
                className="px-6 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
