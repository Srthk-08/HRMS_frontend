import React, { useState } from 'react';
import { GiCancel } from 'react-icons/gi';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router-dom';
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [visibleDropdownIndex, setVisibleDropdownIndex] = useState(null); // Track which dropdown is visible
  const [formData, setFormData] = useState({
    projectName: '',
    client: '',
    startDate: '',
    endDate: '',
    rate: '',
    projectLeader: '',
    team: '',
    description: '',
    files: []
  });
  const [formErrors, setFormErrors] = useState({});
  const [selectedProject, setSelectedProject] = useState(null); // Track the selected project for popover

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, files: [...e.target.files] }));
  };

  const validateForm = () => {
    const errors = {};
    ['projectName', 'client', 'startDate', 'endDate', 'rate', 'projectLeader'].forEach((key) => {
      if (!formData[key].trim()) {
        errors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProject = () => {
    if (validateForm()) {
      if (editingIndex !== null) {
        const updatedProjects = [...projects];
        updatedProjects[editingIndex] = formData;
        setProjects(updatedProjects);
        setEditingIndex(null);
      } else {
        setProjects([...projects, formData]);
      }
      setFormData({
        projectName: '',
        client: '',
        startDate: '',
        endDate: '',
        rate: '',
        projectLeader: '',
        team: '',
        description: '',
        files: []
      });
      setIsFormVisible(false);
    }
  };

  const handleEditProject = (index) => {
    setEditingIndex(index);
    setFormData(projects[index]);
    setIsFormVisible(true);
    setVisibleDropdownIndex(null); // Close dropdown
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    setVisibleDropdownIndex(null); // Close dropdown
  };

  const toggleDropdown = (index) => {
    setVisibleDropdownIndex(visibleDropdownIndex === index ? null : index);
  };

  const handleProjectClick = (index) => {
    setSelectedProject(projects[index]); // Show the popover with selected project details
  };

  const closeDetails = () => {
    setSelectedProject(null); // Close the popover
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className='flex flex-col gap-3'>
          <h1 className="text-2xl font-semibold">Project List</h1>
          <h1 className="font-semibold mb-4"><Link to="/" >Dashboard</Link> / Overtime</h1>
        </div>
        <button
          onClick={() => setIsFormVisible(true)}
          className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900"
        >
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative"
            >
              <HiOutlineDotsVertical
                className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => toggleDropdown(index)}
              />
              {visibleDropdownIndex === index && (
                <div className="absolute top-8 right-2 bg-white shadow-md rounded-md py-2 z-10">
                  <button
                    onClick={() => handleEditProject(index)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(index)}
                    className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full text-left"
                  >
                    Delete
                  </button>
                </div>
              )}
              <h3
                className="text-lg font-semibold cursor-pointer"
                onClick={() => handleProjectClick(index)} // Open popover on click
              >
                {project.projectName}
              </h3>
              <p className="text-gray-500">{project.client}</p>
              <p className="text-gray-500">Project Leader: {project.projectLeader}</p>
              <p className="text-gray-500">Deadline: {project.endDate}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No projects found.</div>
        )}
      </div>

      {/* Popover for Project Details */}
      {selectedProject && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 relative max-w-4xl p-6 rounded-md shadow-lg">
            <GiCancel
              onClick={closeDetails}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-600 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">Project Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p><strong>Project Name:</strong> {selectedProject.projectName}</p>
                <p><strong>Client:</strong> {selectedProject.client}</p>
                <p><strong>Start Date:</strong> {selectedProject.startDate}</p>
                <p><strong>End Date:</strong> {selectedProject.endDate}</p>
                <p><strong>Rate:</strong> {selectedProject.rate}</p>
                <p><strong>Project Leader:</strong> {selectedProject.projectLeader}</p>
                <p><strong>Team:</strong> {selectedProject.team}</p>
                <p><strong>Description:</strong> {selectedProject.description}</p>
              </div>
              <div>
                <p><strong>Files:</strong> {selectedProject.files.length ? selectedProject.files.length : 'No files uploaded'}</p>

                {/* Display Images if the file is an image */}
                <div className="flex flex-wrap gap-4 mt-4">
                  {selectedProject.files.map((file, index) => {
                    // Check if file is an image
                    const isImage = file.type.startsWith('image/');
                    return (
                      <div key={index} className="flex flex-col items-center">
                        {isImage ? (
                          <img src={URL.createObjectURL(file)} alt={`File ${index}`} className="w-32 h-32 object-cover rounded-md" />
                        ) : (
                          <div className="text-center">{file.name}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {isFormVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white relative w-11/12 max-w-4xl p-6 rounded-md shadow-lg">
            <GiCancel
              onClick={() => setIsFormVisible(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-600 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">{editingIndex !== null ? 'Edit Project' : 'Add Project'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium">Project Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.projectName && <p className="text-red-500 text-sm">{formErrors.projectName}</p>}
              </div>
              <div>
                <label htmlFor="client" className="block text-sm font-medium">Client <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.client && <p className="text-red-500 text-sm">{formErrors.client}</p>}
              </div>
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium">Start Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.startDate && <p className="text-red-500 text-sm">{formErrors.startDate}</p>}
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium">End Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.endDate && <p className="text-red-500 text-sm">{formErrors.endDate}</p>}
              </div>
              <div>
                <label htmlFor="rate" className="block text-sm font-medium">Rate <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="rate"
                  name="rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.rate && <p className="text-red-500 text-sm">{formErrors.rate}</p>}
              </div>
              <div>
                <label htmlFor="projectLeader" className="block text-sm font-medium">Project Leader <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="projectLeader"
                  name="projectLeader"
                  value={formData.projectLeader}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {formErrors.projectLeader && <p className="text-red-500 text-sm">{formErrors.projectLeader}</p>}
              </div>
              <div>
                <label htmlFor="team" className="block text-sm font-medium">Add Team</label>
                <input
                  type="text"
                  id="team"
                  name="team"
                  value={formData.team}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="files" className="block text-sm font-medium">Upload Files</label>
                <input
                  type="file"
                  id="files"
                  onChange={handleFileChange}
                  multiple
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={handleAddProject}
                className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900"
              >
                {editingIndex !== null ? 'Save Changes' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
