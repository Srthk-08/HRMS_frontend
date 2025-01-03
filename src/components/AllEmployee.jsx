import React, { useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi'; // Import the icon

export default function AllEmployee() {
  const [employees, setEmployees] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); 
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
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
    picode: '',
    gender: '',
    city: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [menuVisible, setMenuVisible] = useState(null); // For managing the visibility of the dropdown menu for each employee
  const [filterDesignation, setFilterDesignation] = useState(''); // State for filter
  const [filteredEmployees, setFilteredEmployees] = useState([]); // State for filtered employees

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle image change (for employee image upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, employeeImage: reader.result }));
      };
      reader.readAsDataURL(file); // Convert the file to a base64 string
    }
  };

  // Validate form
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

  // Add or update employee
  const handleAddEmployee = () => {
    if (validateForm()) {
      if (editingIndex !== null) {
        // Update existing employee
        const updatedEmployees = [...employees];
        updatedEmployees[editingIndex] = formData;
        setEmployees(updatedEmployees);
        setEditingIndex(null);
      } else {
        // Add new employee
        setEmployees([...employees, formData]);
      }
      setFormData({
        employeeId: '',
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
        picode: '',
        gender: '',
        city: ''
      });
      setIsFormVisible(false);
    }
  };

  // Edit employee
  const handleEditEmployee = (index) => {
    const employee = employees[index];
    setFormData({ ...employee });
    setEditingIndex(index); // Set the index of the employee being edited
    setIsFormVisible(true);
  };
  // Delete employee
  const handleDeleteEmployee = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  // Toggle menu visibility
  const toggleMenu = (index) => {
    setMenuVisible(menuVisible === index ? null : index);
  };


   const applyFilter = () => {
    if (filterDesignation.trim()) {
      const filtered = employees.filter((employee) =>
        employee.designation.toLowerCase() === filterDesignation.toLowerCase()
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees); // Reset to all employees
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Employee List</h1>

      {/* Add Employee and Filter Section */}
      <div className="mb-4 flex flex-wrap justify-between items-center">
        <button
          onClick={() => setIsFormVisible(true)}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Employee
        </button>

        {/* Filter Section */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={filterDesignation}
            onChange={(e) => setFilterDesignation(e.target.value)}
            placeholder="Filter by designation"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={applyFilter}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Apply Filter
          </button>
        </div>
      </div>

      {/* Employee List in Card Format */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative"
            >
              <img
                src={employee.employeeImage || 'https://via.placeholder.com/150'}
                alt="Employee"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
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

      {/* Popover Form to Add Employee */}
      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 max-w-4xl p-6 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-96 overflow-y-scroll">
              {/* Employee ID Field */}
              <div>
                <label htmlFor="employeeId" className="block text-sm font-medium">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="Enter employee ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.employeeId && <p className="text-red-500 text-sm">{formErrors.employeeId}</p>}
              </div>

              {/* First Name Field */}
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
                  placeholder="Enter first name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
              </div>

              {/* Last Name Field */}
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
                  placeholder="Enter last name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
              </div>

              {/* Email Field */}
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
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
              </div>

              {/* Phone Field */}
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
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
              </div>

              {/* Salary Field */}
              <div>
                <label htmlFor="salary" className="block text-sm font-medium">
                  Salary <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="Enter salary"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.salary && <p className="text-red-500 text-sm">{formErrors.salary}</p>}
              </div>

              {/* Reporting Manager Field */}
              <div>
                <label htmlFor="reportingManager" className="block text-sm font-medium">
                  Reporting Manager <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="reportingManager"
                  name="reportingManager"
                  value={formData.reportingManager}
                  onChange={handleInputChange}
                  placeholder="Enter reporting manager"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.reportingManager && <p className="text-red-500 text-sm">{formErrors.reportingManager}</p>}
              </div>

              {/* Area Field */}
              <div>
                <label htmlFor="area" className="block text-sm font-medium">
                  Area <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="Enter area"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.area && <p className="text-red-500 text-sm">{formErrors.area}</p>}
              </div>

              {/* Company Field */}
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
                  placeholder="Enter company"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.company && <p className="text-red-500 text-sm">{formErrors.company}</p>}
              </div>

              {/* Department Field */}
              <div>
                <label htmlFor="department" className="block text-sm font-medium">
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Enter department"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.department && <p className="text-red-500 text-sm">{formErrors.department}</p>}
              </div>

              {/* Designation Field */}
              <div>
                <label htmlFor="designation" className="block text-sm font-medium">
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Enter designation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.designation && <p className="text-red-500 text-sm">{formErrors.designation}</p>}
              </div>

              {/* Employee Image Field */}
              <div>
                <label htmlFor="employeeImage" className="block text-sm font-medium">
                  Employee Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="employeeImage"
                  name="employeeImage"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.employeeImage && <p className="text-red-500 text-sm">{formErrors.employeeImage}</p>}
                {formData.employeeImage && (
                  <img
                    src={formData.employeeImage}
                    alt="Employee"
                    className="w-32 h-32 rounded-full mx-auto mt-4 object-cover"
                  />
                )}
              </div>

              {/* Aadhar No Field */}
              <div>
                <label htmlFor="adharNo" className="block text-sm font-medium">
                  Aadhar No
                </label>
                <input
                  type="text"
                  id="adharNo"
                  name="adharNo"
                  value={formData.adharNo}
                  onChange={handleInputChange}
                  placeholder="Enter Aadhar number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Permanent Address Field */}
              <div>
                <label htmlFor="permanentAddress" className="block text-sm font-medium">
                  Permanent Address
                </label>
                <textarea
                  id="permanentAddress"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                  placeholder="Enter permanent address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Birthday Field */}
              <div>
                <label htmlFor="birthday" className="block text-sm font-medium">
                  Birthday
                </label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Religion Field */}
              <div>
                <label htmlFor="religion" className="block text-sm font-medium">
                  Religion
                </label>
                <input
                  type="text"
                  id="religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  placeholder="Enter religion"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Pincode Field */}
              <div>
                <label htmlFor="picode" className="block text-sm font-medium">
                  Pincode
                </label>
                <input
                  type="text"
                  id="picode"
                  name="picode"
                  value={formData.picode}
                  onChange={handleInputChange}
                  placeholder="Enter pincode"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Gender Field */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* City Field */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={handleAddEmployee}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add Employee
              </button>
              <button
                onClick={() => setIsFormVisible(false)}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
