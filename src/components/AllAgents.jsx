import React, { useState } from 'react';
import { GiCancel } from 'react-icons/gi';
import { HiOutlineTrash } from 'react-icons/hi';
import { BiUserCheck } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function AllAgents() {
  const [agents, setAgents] = useState([]);
  const [pendingAgents, setPendingAgents] = useState([
    { name: 'John Doe', email: 'johndoe@example.com', contact: '1234567890' },
    { name: 'Jane Smith', email: 'janesmith@example.com', contact: '9876543210' },
    { name: 'Mary Johnson', email: 'maryjohnson@example.com', contact: '5555555555' },
  ]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    contact: false,
  });
  const [isApprovePopoverVisible, setIsApprovePopoverVisible] = useState(false);

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to validate the form before adding an agent
  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      contact: !formData.contact.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true); // Return true if no errors
  };

  // Function to handle form submission for adding a new agent
  const handleAddAgent = () => {
    if (validateForm()) {
      setPendingAgents([...pendingAgents, formData]);
      setFormData({ name: '', email: '', contact: '' });
      setIsFormVisible(false);
    }
  };

  // Function to handle approving an agent
  const handleApproveAgent = (index) => {
    const agentToApprove = pendingAgents[index];
    setAgents([...agents, agentToApprove]);  // Add to approved list
    const updatedPendingAgents = pendingAgents.filter((_, i) => i !== index);
    setPendingAgents(updatedPendingAgents);  // Remove from pending list
  };

  // Function to handle canceling an agent's approval
  const handleCancelAgent = (index) => {
    const updatedPendingAgents = pendingAgents.filter((_, i) => i !== index);
    setPendingAgents(updatedPendingAgents); // Just remove from pending list
  };

  // Function to show the approve popover
  const handleShowApprovePopover = () => {
    setIsApprovePopoverVisible(true);
  };

  // Function to hide the approve popover
  const handleCloseApprovePopover = () => {
    setIsApprovePopoverVisible(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className='flex flex-col'>
          <h1 className="text-3xl font-semibold mb-2">All Agents</h1>
          <h1 className="font-semibold mb-4"> <Link to='/'>Dashboard</Link> / All Agents</h1>
        </div>
        <button
          onClick={handleShowApprovePopover}
          className="px-6 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-900 transition duration-300 ease-in-out"
        >
          Approve Agents
        </button>
      </div>

      {/* Popover for Approving Pending Agents */}
      {isApprovePopoverVisible && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 animate__animated animate__fadeIn animate__faster">
          <div className="bg-white w-1/2 p-6 rounded-md shadow-lg relative animate__animated animate__zoomIn animate__faster">
            {/* Close Icon */}
            <GiCancel
              onClick={handleCloseApprovePopover}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">Approve Pending Agents</h2>
            <div className="space-y-4">
              {pendingAgents.length > 0 ? (
                <table className="min-w-full table-auto border-collapse shadow-lg rounded-md">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left text-md font-semibold">Name</th>
                      <th className="py-2 px-4 text-left text-md font-semibold">Email</th>
                      <th className="py-2 px-4 text-left text-md font-semibold">Contact</th>
                      <th className="py-2 px-4 text-left text-md font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingAgents.map((agent, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50 transition duration-200 ease-in-out">
                        <td className="px-4 py-2">{agent.name}</td>
                        <td className="px-4 py-2">{agent.email}</td>
                        <td className="px-4 py-2">{agent.contact}</td>
                        <td className="px-4 py-2 text-right">
                          <button
                            onClick={() => handleApproveAgent(index)}
                            className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-700 transition duration-300 ease-in-out mr-2"
                          >
                            <BiUserCheck size={20} />
                          </button>
                          <button
                            onClick={() => handleCancelAgent(index)}
                            className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
                          >
                            <HiOutlineTrash size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No pending agents to approve.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approved Agents Table */}
      <h2 className="text-xl font-semibold mb-2">Approved Agents:</h2>
      <table className="min-w-full table-auto border-collapse shadow-lg rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left text-md font-semibold">Name</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Email</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Contact</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.length > 0 ? (
            agents.map((agent, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition duration-200 ease-in-out">
                <td className="px-4 py-2">{agent.name}</td>
                <td className="px-4 py-2">{agent.email}</td>
                <td className="px-4 py-2">{agent.contact}</td>
                <td className="px-4 py-2 text-right">
                  {/* Delete Button - Trash Icon */}
                  <button
                    onClick={() => {
                      setAgents(agents.filter((_, i) => i !== index));
                    }}
                    className="text-gray-500 hover:text-gray-600 transition duration-200 ease-in-out"
                  >
                    <HiOutlineTrash size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center">
                No agents found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
