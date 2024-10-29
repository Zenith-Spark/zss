'use client';
import React, { useState } from 'react';
import { PiGreaterThan } from 'react-icons/pi';
import { adminDBSidebar } from '@assets/app/components/resuables/index';
import Dropdown from '@assets/app/components/resuables/dropdown/Dropdown';

// Sample data for investments
const investmentData = [
 
];

const Investment = () => {
  const [filter, setFilter] = useState('all');

  // Function to handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Filter investments based on the selected filter
  const filteredInvestments = filter === 'all'
    ? investmentData
    : investmentData.filter(investment => investment.status === filter);

  // Dropdown options
  const dropdownItems = [
    { label: 'All', onClick: () => handleFilterChange('all') },
    { label: 'Verified', onClick: () => handleFilterChange('verified') },
    { label: 'Pending', onClick: () => handleFilterChange('pending') },
    { label: 'Failed', onClick: () => handleFilterChange('failed') },
  ];

  return (
    <div className="p-4">
      <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-2 pt-4">
        <span>{adminDBSidebar[0].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{adminDBSidebar[0].name}</span>
      </p>
      <h2 className="text-xl font-bold mb-4 text-center">Users</h2>

      {/* Dropdown for filtering */}
      <div className="w-full flex flex-col justify-end pr-15 gap-2">
        <p className='font-bold'>
          KYC Status
        </p>
        <Dropdown buttonText={filter.charAt(0).toUpperCase() + filter.slice(1)} items={dropdownItems} />
        </div>
      {/* Table with scrollable x-direction on mobile */}
      <div className="overflow-x-auto justify-center items-center mt-6">
        <table className="min-w-full w-[60rem]">
          <thead>
            <tr className="text-start">
              <th className="py-2 text-start">User Id</th>
              <th className="py-2 text-start">Full Name</th>
              <th className="py-2 text-end">Email</th>
              <th className="py-2 text-end">Password</th>
              <th className="py-2 text-end">Amount Invested</th>
              <th className="py-2 text-end">KYC Docs</th>
              <th className="py-2 text-end">Verify KYC</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvestments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-start py-4">
                  No Users yet
                </td>
              </tr>
            ) : (
              filteredInvestments.map((investment, index) => (
                <tr key={index} className='text-end'>
                  <td className="py-2 text-start">{investment.plan}</td>
                  <td className="py-2">${investment.amount.toFixed(2)}</td>
                  <td className="py-2">${investment.expectedProfit.toFixed(2)}</td>
                  <td className="py-2">{investment.invTime}</td>
                  <td className="py-2">{investment.returnTime}</td>
                  <td className="py-2">{investment.returnTime}</td>
                  {/* Apply conditional color based on status */}
                  <td className={`py-2`}>
                      <label htmlFor="statusSelect">Status:</label>
                    <select id="statusSelect" aria-label="Transaction Status">
                      <option className='text-green-600'>Verify</option>
                      <option className='text-red-600'>Decline</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Investment;
