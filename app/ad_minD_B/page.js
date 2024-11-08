'use client';
import React, { useState, useEffect } from 'react';
import { PiGreaterThan } from 'react-icons/pi';
import { adminDBSidebar } from '@assets/app/components/resuables/index';
import { Edit, Eye, EyeClosed } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { LoaderStyle5Component } from '../components/resuables/Loader/Loader';

const Admin = () => {
  const [filter, setFilter] = useState('all');
  const [users, setUsers] = useState([]); // State to hold user data
  const [totalNetworkBalance, setTotalNetworkBalance] = useState(0); // State to hold total network balance
  const [totalUsers, setTotalUsers] = useState(0); // State to hold total users
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(''); // State to handle errors
  const [passwordVisibility, setPasswordVisibility] = useState({}); // State to manage password visibility

  // Function to handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Fetch user data based on admin token
  const fetchUsers = async () => {
    const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');

    // Check if token is present
    if (!token) {
      toast.error('No token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('https://zss.pythonanywhere.com/api/v1/admin/users-count/', {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });

      console.log(response.data); // Log the API response

      // Set total number of users
      setTotalUsers(response.data.data.total_users);
      
      // Fetch detailed user information as before
      const usersResponse = await axios.get('https://zss.pythonanywhere.com/api/v1/admin/users-detail/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTotalNetworkBalance(usersResponse.data.total_network_balance);
      if (Array.isArray(usersResponse.data.users)) {
        setUsers(usersResponse.data.users);
        const visibilityState = {};
        usersResponse.data.users.forEach(user => {
          visibilityState[user.id] = false;
        });
        setPasswordVisibility(visibilityState);
      } else {
        toast.error('Unexpected response structure.');
      }

      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch users. Please check your Internet connection or login status.');
      setLoading(false);
    }
  };

  // Effect to fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on the selected filter
  const filteredUsers = filter === 'all'
    ? users
    : users.filter(user => user.is_active === (filter === 'verified'));

  // Function to toggle password visibility
  const togglePasswordVisibility = (userId) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  return (
    <>
      <ToastContainer/>
      <div className="p-4">
        <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-2 pt-4">
          <span>{adminDBSidebar[0].icons}</span>
          <span><PiGreaterThan /></span>
          <span>{adminDBSidebar[0].name}</span>
        </p>
        <h2 className="text-xl font-bold mb-4 text-center">Users</h2>
        
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold">Total Users: {totalUsers}</h3>
        </div>

        {/* Total Network Balance */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold">Total Network Balance: ${totalNetworkBalance.toFixed(2)}</h3>
        </div>

        {/* Loading and error handling */}
        {loading && <p className="text-center">
          <LoaderStyle5Component/>
        </p>}

        {/* Table with scrollable x-direction on mobile */}
        <div className="overflow-x-auto justify-center items-center mt-6">
          <table className="min-w-full w-[60rem]">
            <thead>
              <tr className="text-start">
                <th className="py-2 text-start">User Id</th>
                <th className="py-2 text-start">Full Name</th>
                <th className="py-2 text-start">Email Address</th>
                <th className="py-2 text-start">Password</th>
                <th className="py-2 text-start">Total Balance</th>
                <th className="py-2 text-start">IP Address</th>
                <th className="py-2 text-start">Gender</th>
                <th className="py-2 text-start">Date Joined</th>
                <th className="py-2 text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-start py-4">
                    No Users yet
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className='text-end'>
                    <td className="py-2 text-start">{user.id || 'N/A'}</td>
                    <td className="py-2 text-start">{user.full_name || 'N/A'}</td>
                    <td className="py-2 text-start">{user.email_address || 'N/A'}</td>
                    <td className="py-2 text-start flex flex-row gap-x-1 items-center">
                      {passwordVisibility[user.id] ? user.password ? user.password : 'Null' : '********'}
                      <button onClick={() => togglePasswordVisibility(user.id)} >
                        {passwordVisibility[user.id] ? <Eye size={15}/> : <EyeClosed size={15}/> }
                      </button>
                    </td>
                    <td className="py-2 text-start">${user.total_balance.toFixed(2) || 'N/A'}</td>
                    <td className="py-2 text-start">{user.ip_address || 'N/A'}</td>
                    <td className="py-2 text-start">{user.gender || 'N/A'}</td>
                    <td className="py-2 text-start">{user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}</td>
                    <td className="py-2 text-start">
                      <Edit />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Styles for better spacing and text overflow handling */}
        <style jsx>{`
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            padding: 12px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          @media (max-width: 600px) {
            th, td {
              font-size: 12px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Admin;
