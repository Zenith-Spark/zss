'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PiGreaterThan } from 'react-icons/pi';
import { adminDBSidebar } from '@assets/app/components/resuables/index';
import Dropdown from '@assets/app/components/resuables/dropdown/Dropdown';

const Txn = () => {
  const [filter, setFilter] = useState('all');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
      try {
        const response = await axios.get('https://zss.pythonanywhere.com/api/v1/admin/history/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleDateChange = async (transactionId, newDate) => {
    const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
    try {
      const response = await axios.put(`https://zss.pythonanywhere.com/api/v1/admin/deposit/${transactionId}/edit/`, {
        created_at: newDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally update the local state or fetch transactions again
      const updatedTransactions = transactions.map(transaction => 
        transaction.transaction_id === transactionId 
          ? { ...transaction, created_at: newDate } 
          : transaction
      );
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error updating transaction date:', error);
    }
  };

  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions.filter(transaction => transaction.status === filter);

  const dropdownItems = [
    { label: 'All', onClick: () => handleFilterChange('all') },
    { label: 'Successful', onClick: () => handleFilterChange('successful') },
    { label: 'Pending', onClick: () => handleFilterChange('pending') },
    { label: 'Failed', onClick: () => handleFilterChange('failed') },
  ];

  return (
    <div className="p-4">
      <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-2 pt-4">
        <span>{adminDBSidebar[1].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{adminDBSidebar[1].name}</span>
      </p>
      <h2 className="text-xl font-bold mb-4 text-center">Transactions History</h2>

      {/* Dropdown for filtering */}
      <div className="w-full flex justify-end pr-15">
        <Dropdown buttonText={filter.charAt(0).toUpperCase() + filter.slice(1)} items={dropdownItems} />
      </div>

      {/* Table with scrollable x-direction on mobile */}
      <div className="overflow-x-auto justify-center items-center mt-6">
        <table className="table-fixed w-[60rem]">
          <thead>
            <tr className="text-start">
              <th className="py-2 text-start">User Id</th>
              <th className="py-2 text-start">User Name</th>
              <th className="py-2 text-end">Transaction Id</th>
              <th className="py-2 text-end">Amount</th>
              <th className="py-2 text-end">Network</th>
              <th className="py-2 text-end">Method</th>
              <th className="py-2 text-end">Date</th>
              <th className="py-2 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-start py-4">
                  No transactions done
                </td>
              </tr>
            ) : (
              filteredTransactions.map((transaction, index) => (
                <tr key={index} className="text-end">
                  <td className="py-2 text-start">{transaction.user_id}</td>
                  <td className="py-2 text-start">{transaction.full_name}</td>
                  <td className="py-2 text-end">{transaction.transaction_id}</td>
                  <td className="py-2 text-end">${Number(transaction.amount).toFixed(2)}</td>
                  <td className="py-2 text-end">{transaction.network}</td>
                  <td className="py-2 text-end">{transaction.method}</td>
                  <td className="py-2 text-end">
                    <input 
                      type="datetime-local" 
                      defaultValue={new Date(transaction.created_at).toISOString().substring(0, 16)} 
                      onChange={(e) => handleDateChange(transaction.transaction_id, e.target.value)}
                    />
                  </td>
                  <td className="py-2">
                    <select aria-label="Transaction Status">
                      <option className="text-green-600">Verify</option>
                      <option className="text-red-600">Decline</option>
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

export default Txn;
