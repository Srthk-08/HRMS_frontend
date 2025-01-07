import React, { useState } from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

export default function Leads() {
  const [leads, setLeads] = useState([
    {
      leadName: "John Doe",
      email: "john@example.com",
      project: "Project A",
      assignedStaff: "Staff A",
      created: "2025-01-01",
    },
    {
      leadName: "Jane Smith",
      email: "jane@example.com",
      project: "Project B",
      assignedStaff: "Staff B",
      created: "2025-01-02",
    },
    // Add more sample data here...
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter leads based on search query
  const filteredLeads = leads.filter(
    (lead) =>
      lead.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.assignedStaff.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate paginated data
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  // Handle page navigation
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold mb-2">Leads</h1>
          <h1 className="font-semibold mb-4">
            <span>Dashboard</span> / Leads Management
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads..."
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Display table */}
      <table className="min-w-full table-auto border-collapse shadow-lg rounded-md mt-6">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Lead Name</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Email</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Project</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Assigned Staff</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Created</th>
            <th className="px-4 py-3 text-left border-b font-semibold text-md">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLeads.map((lead, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{lead.leadName}</td>
              <td className="px-4 py-2">{lead.email}</td>
              <td className="px-4 py-2">{lead.project}</td>
              <td className="px-4 py-2">{lead.assignedStaff}</td>
              <td className="px-4 py-2">{lead.created}</td>
              <td className="px-4 py-2 flex items-center space-x-4">
                <button
                  // Placeholder for editing lead
                  className="text-slate-500 hover:text-blue-700"
                >
                  <HiOutlinePencilAlt size={20} />
                </button>
                <button
                  // Placeholder for deleting lead
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
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200 ease-in-out disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
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
