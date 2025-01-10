import React, { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default function AgentsStatus() {
  const [agents, setAgents] = useState([
    {
      agentName: 'Agent 1',
      clientName: 'John Doe',
      mobileNumber: '1234567890',
      email: 'johndoe@example.com',
      aadharNumber: '1234-5678-9101',
      clientAddress: '123 Street, City',
      fieldAddress: '456 Field, Village',
      companyBidAmount: '50000',
      clientBidAmount: '48000',
      status: 'Pending',
    },
    {
      agentName: 'Agent 2',
      clientName: 'Jane Smith',
      mobileNumber: '9876543210',
      email: 'janesmith@example.com',
      aadharNumber: '5678-9101-1121',
      clientAddress: '456 Avenue, Town',
      fieldAddress: '789 Field, Suburb',
      companyBidAmount: '60000',
      clientBidAmount: '59000',
      status: 'Success',
    },
    {
      agentName: 'Agent 3',
      clientName: 'Alex Brown',
      mobileNumber: '1122334455',
      email: 'alexbrown@example.com',
      aadharNumber: '9876-5432-1012',
      clientAddress: '789 Road, State',
      fieldAddress: '123 Field, Countryside',
      companyBidAmount: '70000',
      clientBidAmount: '69000',
      status: 'Cancel',
    },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold mb-2">Agents Status</h1>
          <h1 className="font-semibold mb-4">
            <Link to="/">Dashboard</Link> / Agents Status
          </h1>
        </div>
      </div>

      {/* Approved Agents Status Table */}
      <table className="min-w-full table-auto border-collapse shadow-lg rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left text-md font-semibold">Agent Name</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Client Name</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Mobile Number</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Email</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Aadhar Number</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Client Address</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Field Address</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Company Bid Amount</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Client Bid Amount</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Status</th>
            <th className="py-2 px-4 text-left text-md font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.length > 0 ? (
            agents.map((agent, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition duration-200 ease-in-out">
                <td className="px-4 py-2">{agent.agentName}</td>
                <td className="px-4 py-2">{agent.clientName}</td>
                <td className="px-4 py-2">{agent.mobileNumber}</td>
                <td className="px-4 py-2">{agent.email}</td>
                <td className="px-4 py-2">{agent.aadharNumber}</td>
                <td className="px-4 py-2">{agent.clientAddress}</td>
                <td className="px-4 py-2">{agent.fieldAddress}</td>
                <td className="px-4 py-2">{agent.companyBidAmount}</td>
                <td className="px-4 py-2">{agent.clientBidAmount}</td>
                <td
                  className={classNames(
                    'px-4 py-2 font-semibold',
                    agent.status === 'Success' && 'text-green-600',
                    agent.status === 'Pending' && 'text-yellow-600',
                    agent.status === 'Cancel' && 'text-red-600'
                  )}
                >
                  {agent.status}
                </td>
                <td className="px-4 py-2 text-right">
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
              <td colSpan="11" className="px-4 py-2 text-center">
                No agents found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
