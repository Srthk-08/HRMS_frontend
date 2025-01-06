import React, { useState, useEffect } from 'react';
import { HiOutlineCube, HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function Dashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [newEmployees, setNewEmployees] = useState(1);
  const [earnings, setEarnings] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [profit, setProfit] = useState(0);
  const [overallEmployees, setOverallEmployees] = useState('Loading...');
  const [todayLeave, setTodayLeave] = useState(0);
  const [pendingInvoices, setPendingInvoices] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);
  const [closedTickets, setClosedTickets] = useState(0);
  const [todayAbsent, setTodayAbsent] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [inProgressTasks, setInProgressTasks] = useState(0);
  const [onHoldTasks, setOnHoldTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [reviewTasks, setReviewTasks] = useState(0);

  useEffect(() => {
    setProjectCount(25);
    setClientCount(15);
    setEmployeeCount(50);
  }, []);

  const revenueData = {
    labels: ['2018', '2020', '2022', '2024'],
    datasets: [
      {
        label: 'Total Income',
        data: [0, 0, 0, 0],
        borderColor: 'orange', // Match image color
        borderWidth: 2, // Make line thicker
        pointRadius: 5, // Show points
        pointBackgroundColor: 'orange',
        tension: 0.4, // Add some curve
      },
      {
        label: 'Total Outcome',
        data: [0, 0, 0, 0],
        borderColor: 'pink', // Match image color
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: 'pink',
        tension: 0.4,
      },
    ],
  };
  const salesData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Total Sales',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: 'orange', // Match image color
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: 'orange',
        tension: 0.4,
      },
      {
        label: 'Total Revenue',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: 'lightgreen', // Match image color
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: 'lightgreen',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis gridlines
        },
      },
      y: {
        beginAtZero: true, // Start y-axis at 0
        max: 1, // Set y-axis max to 1
        ticks: {
          stepSize: 0.25, // Set appropriate step size
        },
        grid: {
          color: 'lightgray', // Set gridline color
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker background
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        boxPadding: 8,
        callbacks: {
          title: (context) => {
            return context[0].label; // Show year
          },
          label: (context) => {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          },
          footer: (context) => {
            if (context.length > 1) { // Check if multiple datasets are hovered
              const totalIncome = context.find(item => item.dataset.label === 'Total Income')?.parsed.y || 0;
              const totalOutcome = context.find(item => item.dataset.label === 'Total Outcome')?.parsed.y || 0;
              const totalSales = context.find(item => item.dataset.label === 'Total Sales')?.parsed.y || 0;
              const totalRevenue = context.find(item => item.dataset.label === 'Total Revenue')?.parsed.y || 0;
              if (context[0].chart.config.data.datasets[0].label === 'Total Income')
                return [`Total Income: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalIncome)}`, `Total Outcome: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalOutcome)}`];
              else
                return [`Total Sales: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalSales)}`, `Total Revenue: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalRevenue)}`];
            }
            return null;
          }
        } 
      }
    },
  };

  return (
    <div className="p-6 space-y-6">
      <p className="text-2xl font-semibold mb-6">Admin Dashboard</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 flex items-center rounded-md shadow-md hover:shadow-lg text-center space-x-4 gap-10">
          <HiOutlineCube className="text-slate-900" size={48} />
          <div>
            <p className="text-xl font-semibold">Projects</p>
            <p className="text-3xl font-bold text-slate-400">{projectCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 flex items-center rounded-md shadow-md hover:shadow-lg text-center space-x-4 gap-10">
          <HiOutlineUserGroup className="text-slate-900" size={48} />
          <div>
            <p className="text-xl font-semibold">Clients</p>
            <p className="text-3xl font-bold text-slate-400">{clientCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 flex items-center rounded-md shadow-md hover:shadow-lg text-center space-x-4 gap-10">
          <HiOutlineUsers className="text-slate-900" size={48} />
          <div>
            <p className="text-xl font-semibold">Employees</p>
            <p className="text-3xl font-bold text-slate-400">{employeeCount}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="flex justify-center"> {/* Center the text */}
            <p className="text-xl font-bold">Total Revenue</p> {/* Bold and larger text */}
          </div>
          <Line options={options} data={revenueData} />
        </div>
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="flex justify-center"> {/* Center the text */}
            <h1 className="text-xl font-bold">Sales Overview</h1> {/* Bold and larger text */}
          </div>
          <Line options={options} data={salesData} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        <div className="bg-white p-6 rounded-md shadow-md">
          <p className="font-medium text-gray-700">New Employees</p>
          <div className="flex items-baseline mt-2">
            <p className="text-2xl font-bold">{newEmployees}</p>
            <p className="ml-1 text-green-500 text-sm">+1.00%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
            <div className="bg-blue-500 h-1 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">Overall Employees {overallEmployees}</p>
        </div>

        <div className="bg-white p-6 rounded-md shadow-md">
          <p className="font-medium text-gray-700">Earnings</p>
          <p className="text-2xl font-bold">${earnings}</p>
          <p className="mt-2 text-sm text-gray-500">Previous Month</p>
        </div>

        <div className="bg-white p-6 rounded-md shadow-md">
          <p className="font-medium text-gray-700">Expenses</p>
          <p className="text-2xl font-bold">${expenses}</p>
          <p className="mt-2 text-sm text-gray-500">Previous Month</p>
        </div>

        <div className="bg-white p-6 rounded-md shadow-md">
          <p className="font-medium text-gray-700">Profit</p>
          <p className="text-2xl font-bold">${profit}</p>
          <p className="mt-2 text-sm text-gray-500">Previous Month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-md shadow-md">
          <p className="text-lg font-medium text-gray-700 mb-4">Statistics</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center border-b pb-2">
              <p>Today Leave</p>
              <p>{todayLeave}/1</p>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <p>Pending Invoice</p>
              <p>{pendingInvoices}/0</p>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <p>Completed Projects</p>
              <p>{completedProjects}/0</p>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <p>Open Tickets</p>
              <p>{openTickets}/0</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Closed Tickets</p>
              <p>{closedTickets}/0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-md shadow-md">
          <p className="text-lg font-medium text-gray-700 mb-4">Today Absent</p>
          <p className="text-2xl font-bold text-red-500">{todayAbsent}</p>
        </div>
      </div>
    </div>
  );
}