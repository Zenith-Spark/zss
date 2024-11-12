'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { PiGreaterThan } from 'react-icons/pi';
import { adminDBSidebar } from '@assets/app/components/resuables/index';
import { Edit, Eye, EyeClosed } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LoaderStyle5Component } from '../components/resuables/Loader/Loader';
import { useGlobalState } from '../GlobalStateProvider';


const Admin = () => {
  const {fetchAdminData, formatBalance} = useGlobalState()
  const [filter, setFilter] = useState('all');
  const [users, setUsers] = useState([]); // State to hold user data
  const [totalNetworkBalance, setTotalNetworkBalance] = useState(0); // State to hold total network balance
  const [totalUsers, setTotalUsers] = useState(0); // State to hold total users
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(''); // State to handle errors
  const [passwordVisibility, setPasswordVisibility] = useState({}); // State to manage password visibility
  const [totalSystemBalance, setTotalSystemBalance] = useState(0.0);
  const [userBalances, setUserBalances] = useState([]);
  const [actionUserId, setActionUserId] = useState(null); // User selected for action
  const [actionType, setActionType] = useState(''); // Action type (activate, suspend, delete)

  // Function to handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Fetch user data based on admin token
  const fetchUsers = useCallback(
    async () => {
      const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
  
      // Check if token is present
      if (!token) {
        toast.error('No token found. Please log in.',  {
          position: "top-right",
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get('https://zss.pythonanywhere.com/api/v1/admin/users-count/', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        });
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
          toast.error('Unexpected response structure.',  {
            position: "top-right",
            autoClose: 3000,
          });
        }
  
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch users. Please check your Internet connection or login status.',  {
          position: "top-right",
          autoClose: 3000,
        });
        setLoading(false);
      }
    }, []
  )

  const fetchBalances = useCallback(
    async () => {
      const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
  
      // Check if token is present
      if (!token) {
        toast.error('No token found. Please log in.',  {
          position: "top-right",
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch('https://zss.pythonanywhere.com/api/v1/admin/all-users-balance/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
  
        if (data.status === 'success') {
          setTotalSystemBalance(data.data.total_system_balance); // Set the total system balance
          setUserBalances(data.data.user_balances); // Set the user balances
        } else {
          console.error('Error fetching balances:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, []
  )
  // Effect to fetch users on component mount
  useEffect(() => {
    fetchUsers();
    fetchAdminData()
    fetchBalances()
  }, [fetchUsers, fetchAdminData, fetchBalances]);

 
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

  // Function to get the individual user balance
  const getUserBalance = (userId) => {
    const userBalance = userBalances.find(balance => balance.user_id === userId);
    return userBalance ? formatBalance(userBalance.balance) : 'N/A';
  };

  // Function to handle action on a user (activate, suspend, delete)
  const handleUserAction = async (userId, actionType) => {
    setActionUserId(userId);
    setActionType(actionType);

    const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');

    if (!token) {
      toast.error('No token found. Please log in.',  {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const endpoint = `https://zss.pythonanywhere.com/api/v1/admin/users/${userId}/${actionType}/`;
      const response = await axios.post(endpoint, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success(`User ${actionType}d successfully.`,  {
          position: "top-right",
          autoClose: 3000,
        });
        // Update UI by removing the user or changing status
        setUsers(users.filter(user => user.id !== userId)); // Remove user from the list after action
      } else {
        toast.error('Action failed. Please try again.',  {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while processing the action.',  {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="p-4">
        <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-2 pt-4">
          <span>{adminDBSidebar[0].icons}</span>
          <span><PiGreaterThan /></span>
          <span>{adminDBSidebar[0].name}</span>
        </p>
        <div className="w-full h-auto my-2 flex flex-col items-center justify-center gap-5">
          {/* Total Users Card */}
          <div className="text-start mb-4 flex flex-col justify-center items-start p-6 shadow-lg rounded-xl w-full">
            <p className="text-5xl font-bold text-blue-600">{totalUsers}</p>
            <h3 className="text-lg font-semibold">Total Users</h3>
          </div>
          
          {/* Total Network Balance Card */}
          <div className="text-start mb-4 flex flex-col justify-center items-start p-6 shadow-lg rounded-xl w-full">
          <p className="text-5xl font-bold text-green-600">
              ${formatBalance(totalSystemBalance)}
            </p>
            <h3 className="text-lg font-semibold">Total Network Balance</h3>
          </div>
        </div>
        <h2 className="text-xl font-bold my-4 text-center">Users details</h2>

        {/* Loading and error handling */}
        {loading && <div className="text-center">
          <LoaderStyle5Component />
        </div>}

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
                      <button onClick={() => togglePasswordVisibility(user.id)}>
                        {passwordVisibility[user.id] ? <Eye size={15} /> : <EyeClosed size={15} />}
                      </button>
                    </td>
                    <td className="py-2 text-start">${formatBalance(getUserBalance(user.id)) || 'N/A'}</td>
                    <td className="py-2 text-start">{user.ip_address || 'N/A'}</td>
                    <td className="py-2 text-start">{user.gender || 'N/A'}</td>
                    <td className="py-2 text-start">{user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}</td>
                    <td className="py-2 text-start">
                    <select
                      onChange={(e) => handleUserAction(user.id, e.target.value)}
                      className="text-sm bg-transparent px-3 py-1"
                      defaultValue=""
                    >
                      <option value="" disabled>Action</option>
                      <option value="activate" className="text-blue-600">Activate</option>
                      <option value="suspend" className="text-yellow-600">Suspend</option>
                      <option value="delete" className="text-red-600">Delete</option>
                    </select>
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
