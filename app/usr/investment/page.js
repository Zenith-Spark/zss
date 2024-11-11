'use client';
import React, { useEffect, useState } from 'react';
import { PiGreaterThan } from 'react-icons/pi';
import { usrDBSidebar } from '@assets/app/components/resuables/index';
import Dropdown from '@assets/app/components/resuables/dropdown/Dropdown';
import { useGlobalState } from '@assets/app/GlobalStateProvider';

const Investment = () => {
  const [filter, setFilter] = useState('all');
  const { formData, fetchInvestments, formatBalance } = useGlobalState();
  const investmentData = formData.investments || [];

  // Handle filter change
  const handleFilterChange = (newFilter) => setFilter(newFilter);

  // Filter investments based on selected filter
  const filteredInvestments = filter === 'all'
    ? investmentData
    : investmentData.filter(investment => investment.status === filter);

  // Dropdown options
  const dropdownItems = [
    { label: 'All', onClick: () => handleFilterChange('all') },
    { label: 'active', onClick: () => handleFilterChange('active') },
    { label: 'Pending', onClick: () => handleFilterChange('pending') },
    { label: 'Failed', onClick: () => handleFilterChange('failed') },
  ];

  useEffect(() => {
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (!authToken) {
      handleError('No authentication token found');
      return;
    }
    fetchInvestments(authToken)
  }, []);

  return (
    <div className="p-4">
      <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-2 pt-4">
        <span>{usrDBSidebar[4].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{usrDBSidebar[4].name}</span>
      </p>
      <h2 className="text-xl font-bold mb-4 text-center">Active Investments</h2>

      {/* Dropdown for filtering */}
      <div className="w-full flex justify-end pr-15">
        <Dropdown buttonText={filter.charAt(0).toUpperCase() + filter.slice(1)} items={dropdownItems} />
      </div>

      {/* Table with scrollable x-direction on mobile */}
      <div className="overflow-x-auto justify-center items-center mt-6">
        <table className="min-w-full w-[70rem]">
          <thead>
            <tr className="text-start">
              <th className="py-2 text-start">Plan</th>
              <th className="py-2 text-start">Network</th>
              <th className="py-2 text-end">Amount</th>
              <th className="py-2 text-end">Expected Profit</th>
              <th className="py-2 text-end">Inv. Time</th>
              <th className="py-2 text-end">Return Time</th>
              <th className="py-2 text-end">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvestments.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">No investments here</td>
              </tr>
            ) : (
              filteredInvestments.map((investment, index) => (
                <tr key={index} className="text-end">
                  <td className="py-2 text-start">{investment.plan_name}</td>
                  <td className="py-2 text-start">{investment.network_symbol}</td>
                  <td className="py-2">${formatBalance(investment.amount)}</td>
                  <td className="py-2">${formatBalance(investment.expected_profit)}</td>
                  <td className="py-2">{new Date(investment.investment_time).toLocaleString()}</td>
                  <td className="py-2">{new Date(investment.return_time).toLocaleString()}</td>
                  <td className={`py-2 ${
                    investment.status === 'active'
                      ? 'text-green-500'
                      : investment.status === 'pending'
                      ? 'text-yellow-500'
                      : 'text-red-500'
                  }`}>
                    {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
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
