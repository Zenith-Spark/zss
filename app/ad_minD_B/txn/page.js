'use client';
import React, { useState, useEffect } from 'react';
import { PiGreaterThan } from 'react-icons/pi';
import { adminDBSidebar } from '@assets/app/components/resuables/index';
import Dropdown from '@assets/app/components/resuables/dropdown/Dropdown';
import axios from 'axios';
import { toast } from 'react-toastify';

const TransactionHistory = () => {
  const [filter, setFilter] = useState('all');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [editMode, setEditMode] = useState(null); // Track which transaction is in edit mode
  const [editedData, setEditedData] = useState({
    created_at: '',
    amount: '',
    network: '',
    status: '',
  });

  const handleFilterChange = (newFilter) => setFilter(newFilter);

  const fetchTransactions = async () => {
    const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      toast.error('No token found. Please log in.',  {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.get('https://zss.pythonanywhere.com/api/v1/admin/history/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && Array.isArray(response.data.transactions)) {
        setTransactions(response.data.transactions);
      } else {
        setError('Unexpected response structure.');
        toast.error('Unexpected response structure.',  {
          position: "top-right",
          autoClose: 3000,
        });
      }

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch transactions. Please check your Internet connection or login status.');
      setLoading(false);
      toast.error('Failed to fetch transactions. Please check your Internet connection or login status.',  {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions.filter(transaction => transaction.status === filter);

  const dropdownItems = [
    { label: 'All', onClick: () => handleFilterChange('all') },
    { label: 'Completed', onClick: () => handleFilterChange('completed') },
    { label: 'Pending', onClick: () => handleFilterChange('pending') },
    { label: 'Failed', onClick: () => handleFilterChange('failed') },
  ];

  const handleEditClick = (transaction) => {
    setEditMode(transaction.transaction_id);
    setEditedData({
      created_at: new Date(transaction.created_at).toISOString().slice(0, 16),
      amount: transaction.amount,
      network: transaction.network,
      status: transaction.status,
    });
  };

  const handleEditChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (transactionId) => {
    const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
    if (!token) {
      setError('No token found. Please log in.');
      toast.error('No token found. Please log in.',  {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setUpdatingStatus(true);

      const transaction = transactions.find(t => t.transaction_id === transactionId);
      const urlType = transaction.method === 'deposit' ? 'deposit' : 'withdrawal';
      const url = `https://zss.pythonanywhere.com/api/v1/admin/${urlType}/${transactionId}/edit/`;

      let requestData = {};

      if (editedData.status && editedData.status !== transaction.status) {
        // If editing the status
        requestData = { status: editedData.status.toLowerCase() };  // Only send status
      } else if (editedData.created_at && editedData.created_at !== transaction.created_at) {
        // If editing the date
        const formatDate = (date) => {
          const d = new Date(date);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          const hours = String(d.getHours()).padStart(2, '0');
          const minutes = String(d.getMinutes()).padStart(2, '0');
          const seconds = String(d.getSeconds()).padStart(2, '0');
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        // Prepare date-related fields
        requestData = {
          created_at: formatDate(editedData.created_at),
          updated_at: formatDate(new Date()),  // You can change this as needed
        };
      }

      // console.log('Request Data:', requestData);  // Log request data

      const response = await axios.put(
        url,
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log('Response:', response);  // Log the API response

      // Update the state after successful API call
      setTransactions(prevTransactions =>
        prevTransactions.map(transaction =>
          transaction.transaction_id === transactionId
            ? { ...transaction, ...editedData, created_at: new Date(editedData.created_at).toISOString() }
            : transaction
        )
      );

      setEditMode(null); // Exit edit mode after saving
      toast.success('Transaction updated successfully!',  {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err);  // Log detailed error if available
      setError('Failed to save changes. Please check your Internet connection or login status.');
      toast.error('Failed to save changes. Please check your Internet connection or login status.',  {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div className="p-4">
      <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-2 pt-4">
        <span>{adminDBSidebar[2].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{adminDBSidebar[2].name}</span>
      </p>
      <h2 className="text-xl font-bold mb-4 text-center">Transaction History</h2>

      <div className="w-full flex justify-end pr-15">
        <Dropdown buttonText={filter.charAt(0).toUpperCase() + filter.slice(1)} items={dropdownItems} />
      </div>

      {loading && <p className="text-center">Loading transactions...</p>}
      <div className="overflow-x-auto justify-center items-center mt-6">
        <table className="min-w-full w-[100rem]">
          <thead>
            <tr className="text-start">
              <th className="py-2 text-start">Transaction Id</th>
              <th className="py-2 text-start">User Id</th>
              <th className="py-2 text-start">Full Name</th>
              <th className="py-2 text-start">Email</th>
              <th className="py-2 text-start">Amount</th>
              <th className="py-2 text-start">Network</th>
              <th className="py-2 text-start">Method</th>
              <th className="py-2 text-start">Transaction Time</th>
              <th className="py-2 text-start">Status</th>
              <th className="py-2 text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-start py-4">
                  No transactions here
                </td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.transaction_id}>
                  <td className="py-2 text-start">{transaction.transaction_id}</td>
                  <td className="py-2 text-start">{transaction.user_id}</td>
                  <td className="py-2">{transaction.full_name}</td>
                  <td className="py-2">{transaction.email_address}</td>
                  <td className="py-2">${parseFloat(transaction.amount).toFixed(2)}</td>
                  <td className="py-2">{transaction.network}</td>
                  <td className="py-2">{transaction.method}</td>
                  <td className="py-2">
                    {editMode === transaction.transaction_id ? (
                      <input
                        type="datetime-local"
                        value={editedData.created_at}
                        onChange={(e) => handleEditChange('created_at', e.target.value)}
                        className="border p-1 rounded"
                      />
                    ) : (
                      new Date(transaction.created_at).toLocaleString()
                    )}
                  </td>
                  <td className="py-2">
                    {editMode === transaction.transaction_id ? (
                      <select
                        value={editedData.status}
                        onChange={(e) => handleEditChange('status', e.target.value)}
                        className="border p-1 rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                      </select>
                    ) : (
                      <span className={`${
                        transaction.status === 'completed' 
                          ? 'text-green-500'
                          : transaction.status === 'pending'
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    )}
                  </td>
                  <td className="py-2">
                    {editMode === transaction.transaction_id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(transaction.transaction_id)}
                          className="bg-green-500 text-white p-1 rounded"
                          disabled={updatingStatus}
                        >
                          {updatingStatus ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={() => setEditMode(null)}
                          className="bg-red-500 text-white p-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditClick(transaction)}
                        className="bg-blue-500 text-white p-1 rounded"
                      >
                        Edit
                      </button>
                    )}
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

export default TransactionHistory;
