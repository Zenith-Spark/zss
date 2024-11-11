'use client';
import React, { useState, useEffect } from 'react';
import { PiGreaterThan } from 'react-icons/pi';
import { adminDBSidebar } from '@assets/app/components/resuables/index';
import Dropdown from '@assets/app/components/resuables/dropdown/Dropdown';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import react-toastify
import { useGlobalState } from '@assets/app/GlobalStateProvider';


const Investment = () => {
  const {formatBalance} = useGlobalState()
  const [filter, setFilter] = useState('all');
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [editMode, setEditMode] = useState(null); // Track which investment is in edit mode
  const [editedData, setEditedData] = useState({
    investment_time: '',
    return_time: '',
    status: '', // For editing status directly
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const fetchInvestments = async () => {
    const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true); // Start loading state
      const response = await axios.get('https://zss.pythonanywhere.com/api/v1/admin/get-investments/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setInvestments(response.data);
        toast.success('Investments fetched successfully.', { position: "top-right", autoClose: 3000 });
      } else {
        setError('Unexpected response structure.');
        toast.error('Unexpected response structure.', { position: "top-right", autoClose: 3000 });
      }
      setLoading(false); // End loading state
    } catch (err) {
      setError('Failed to fetch investments. Please check your Internet connection or login status.');
      toast.error('Failed to fetch investments. Please check your Internet connection or login status.', { position: "top-right", autoClose: 3000 });
      setLoading(false); // End loading state
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const filteredInvestments = filter === 'all'
    ? investments
    : investments.filter(investment => investment.status === filter);

  const dropdownItems = [
    { label: 'All', onClick: () => handleFilterChange('all') },
    { label: 'Active', onClick: () => handleFilterChange('active') },
    { label: 'Pending', onClick: () => handleFilterChange('pending') },
    { label: 'Failed', onClick: () => handleFilterChange('failed') },
  ];

  const handleEditClick = (investment) => {
    setEditMode(investment.id);
    setEditedData({
      investment_time: new Date(investment.investment_time).toISOString().slice(0, 16),
      return_time: new Date(investment.return_time).toISOString().slice(0, 16),
      status: investment.status,
    });
  };

  const handleEditChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (investmentId) => {
    const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
    if (!token) {
      setError('No token found. Please log in.');
      toast.error('No token found. Please log in.', { position: "top-right", autoClose: 3000 });
      return;
    }

    try {
      setUpdatingStatus(true);
      await axios.put(
        `https://zss.pythonanywhere.com/api/v1/admin/investment/${investmentId}/edit/`,
        {
          investment_time: new Date(editedData.investment_time).toISOString(),
          return_time: new Date(editedData.return_time).toISOString(),
          status: editedData.status, // Update status as well
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInvestments(prevInvestments =>
        prevInvestments.map(investment =>
          investment.id === investmentId
            ? { ...investment, ...editedData }
            : investment
        )
      );

      setEditMode(null); // Exit edit mode after saving
      toast.success('Investment updated successfully.', { position: "top-right", autoClose: 3000 });
    } catch (err) {
      setError('Failed to save changes. Please check your Internet connection or login status.');
      toast.error('Failed to save changes. Please check your Internet connection or login status.', { position: "top-right", autoClose: 3000 });
    } finally {
      setUpdatingStatus(false);
    }
  };

  // New function to handle refund when an investment is marked as "failed"
  const handleRefund = async (investmentId, transactionId) => {
    const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
    if (!token) {
      setError('No token found. Please log in.');
      toast.error('No token found. Please log in.', { position: "top-right", autoClose: 3000 });
      return;
    }
  
    // Log the transactionId for debugging
  
    // Check if transactionId is valid before proceeding
    if (!investmentId) {
      console.error(`Transaction ID is missing for ivm_id: ${investmentId}`);
      toast.error('Transaction ID is missing.', { position: "top-right", autoClose: 3000 });
      return;
    }
  
    try {
      setLoading(true); // Show loading state during the refund request
  
      const response = await axios.post(
        'https://zss.pythonanywhere.com/api/v1/admin/refund-failed-investments/',
        { investment_id: investmentId }, // Ensure correct field
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        toast.success('Refund processed successfully.', { position: "top-right", autoClose: 3000 });
        setInvestments(prevInvestments =>
          prevInvestments.filter(investment => investment.id !== investmentId) // Remove refunded investment
        );
      } else {
        toast.error('Refund failed. Please try again later.', { position: "top-right", autoClose: 3000 });
      }
    } catch (err) {
      console.error('Refund request error for ivm_id:', investmentId, 'Error:', err.response?.data || err.message);
      toast.error('Refund request failed. Please check your connection.', { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false); // End loading state
    }
  };
  
  

  return (
    <div className="p-4">
      <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-2 pt-4">
        <span>{adminDBSidebar[3].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{adminDBSidebar[3].name}</span>
      </p>
      <h2 className="text-xl font-bold mb-4 text-center">Investment History</h2>

      <div className="w-full flex justify-end pr-15">
        <Dropdown buttonText={filter.charAt(0).toUpperCase() + filter.slice(1)} items={dropdownItems} />
      </div>

      {loading && <p className="text-center">Loading investments...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-x-auto justify-center items-center mt-6">
        <table className="min-w-full w-[80rem]">
          <thead>
            <tr className="text-start">
              <th className="py-2 text-start">User Id</th>
              <th className="py-2 text-start">Ivm Id</th>
              <th className="py-2 text-start">Full Name</th>
              <th className="py-2 text-start">Plan</th>
              <th className="py-2 text-start">Network</th>
              <th className="py-2 text-start">Amount</th>
              <th className="py-2 text-start">Duration</th>
              <th className="py-2 text-start">Expected Profit</th>
              <th className="py-2 text-start">Investment Time</th>
              <th className="py-2 text-start">Return Time</th>
              <th className="py-2 text-start">Status</th>
              <th className="py-2 text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvestments.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-start py-4">
                  No investments here
                </td>
              </tr>
            ) : (
              filteredInvestments.map((investment) => (
                <tr key={investment.id}>
                  <td className="py-2 text-start">{investment.user}</td>
                  <td className="py-2 text-start">{investment.id}</td>
                  <td className="py-2">{investment.user_full_name}</td>
                  <td className="py-2">{investment.plan_name}</td>
                  <td className="py-2">{investment.network_symbol}</td>
                  <td className="py-2">${formatBalance(investment.amount)}</td>
                  <td className="py-2">{investment.duration_days} days</td>
                  <td className="py-2">${formatBalance(investment.expected_profit)}</td>
                  

                  <td className="py-2">
                    {editMode === investment.id ? (
                      <input
                        type="datetime-local"
                        value={editedData.investment_time}
                        onChange={(e) => handleEditChange('investment_time', e.target.value)}
                        className="border p-1 rounded bg-transparent"
                      />
                    ) : (
                      new Date(investment.investment_time).toLocaleString()
                    )}
                  </td>

                  <td className="py-2">
                    {editMode === investment.id ? (
                      <input
                        type="datetime-local"
                        value={editedData.return_time}
                        onChange={(e) => handleEditChange('return_time', e.target.value)}
                        className="border p-1 rounded bg-transparent"
                      />
                    ) : (
                      new Date(investment.return_time).toLocaleString()
                    )}
                  </td>

                  <td className="py-2">
                    {editMode === investment.id ? (
                      <select
                        value={editedData.status}
                        onChange={(e) => handleEditChange('status', e.target.value)}
                        className="border p-1 rounded bg-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                    ) : (
                      <span className={`${
                        investment.status === 'active' 
                          ? 'text-green-500'
                          : investment.status === 'pending'
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }`}>
                        {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                      </span>
                    )}
                  </td>

                  <td className="py-2 text-start flex gap-2">
                    {editMode === investment.id ? (
                      <>
                        <button onClick={() => handleSave(investment.id)} className="bg-blue-500 text-white px-3 py-1 rounded">
                          Save
                        </button>
                        <button onClick={() => setEditMode(null)} className="bg-gray-500 text-white px-3 py-1 rounded">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(investment)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                          Edit
                        </button>
                        {investment.status === 'failed' && (
                          <button
                            onClick={() => handleRefund(investment.id, investment.transaction_id)} 
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Refund
                          </button>
                        )}
                      </>
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

export default Investment;
