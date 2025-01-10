import React, { useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { GiCancel } from "react-icons/gi";
import { Link } from 'react-router-dom';

export default function AllAgent() {
  const [agents, setAgents] = useState([
    {
      name: 'John Doe',
      email: 'johndoe@example.com',
      mobile: '1234567890',
      adhar: '1234-5678-9101',
      address: '123 Main St',
      city: 'Mumbai',
      pincode: '400001',
      agentImage: 'https://via.placeholder.com/150',
      document: null, // For storing document details (e.g., file URL)
    },
    {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      mobile: '0987654321',
      adhar: '9876-5432-1098',
      address: '456 Elm St',
      city: 'Delhi',
      pincode: '110001',
      agentImage: 'https://via.placeholder.com/150',
      document: null, // For storing document details
    },
    {
      name: 'Alice Johnson',
      email: 'alicejohnson@example.com',
      mobile: '1122334455',
      adhar: '1122-3344-5566',
      address: '789 Oak St',
      city: 'Bangalore',
      pincode: '560001',
      agentImage: 'https://via.placeholder.com/150',
      document: null, // For storing document details
    },
  ]);

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [menuVisible, setMenuVisible] = useState(null);

  const handleCardClick = (agent) => {
    setSelectedAgent(agent);
  };

  const closeDetails = () => {
    setSelectedAgent(null);
  };

  const toggleMenu = (index) => {
    setMenuVisible(menuVisible === index ? null : index);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className='flex flex-col'>
          <h1 className="text-3xl font-semibold mb-2">Agent List</h1>
          <h1 className="font-semibold mb-4"><Link to="/" >Dashboard</Link> / Agents</h1>
        </div>
      </div>

      {/* Agent List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {agents.length > 0 ? (
          agents.map((agent, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative"
            >
              <div className="relative">
                <img
                  src={agent.agentImage || 'https://via.placeholder.com/150'}
                  alt="Agent"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover cursor-pointer"
                  onClick={() => handleCardClick(agent)}
                />
                <HiOutlineDotsVertical
                  className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => toggleMenu(index)}
                />
                {menuVisible === index && (
                  <div className="absolute top-8 right-2 bg-white shadow-lg border rounded-md text-sm z-10">
                    <button
                      onClick={() => { } /* Delete Agent Logic */}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-center">
                {agent.name}
              </h3>
              <p className="text-center text-gray-500">{agent.email}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No agents found.
          </div>
        )}
      </div>

      {/* Popover for Agent Details */}
      {selectedAgent && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 relative max-w-4xl p-6 rounded-md shadow-lg">
            <GiCancel
              onClick={closeDetails}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-600 cursor-pointer"
              size={24}
            />
            <h2 className="text-xl font-semibold mb-4">Agent Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedAgent.agentImage || 'https://via.placeholder.com/150'}
                  alt="Agent"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
              </div>
              <div>
                <p><strong>Name:</strong> {selectedAgent.name}</p>
                <p><strong>Email:</strong> {selectedAgent.email}</p>
                <p><strong>Mobile:</strong> {selectedAgent.mobile}</p>
                <p><strong>Adhar No:</strong> {selectedAgent.adhar}</p>
                <p><strong>Address:</strong> {selectedAgent.address}</p>
                <p><strong>City:</strong> {selectedAgent.city}</p>
                <p><strong>Pincode:</strong> {selectedAgent.pincode}</p>  
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
