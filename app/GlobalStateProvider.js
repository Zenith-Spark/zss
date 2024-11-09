'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    userId: '',
    fullName: '',
    email: '',
    password: '',
    dateJoined: '',
    gender: '',
    IP: '',
    lastLoginIP: '',
    referalCode: '',
    referredBy: '',
    userWallet: {},
    walletAddresses: {},
    totalBalance: 0,
    referralLink: '',
    notification: [],
    adminNotification: [],
    plans: [],
    investments: [],

  });

  // Function to handle errors
  const handleError = (message, err = null) => {
    setError(message);
    if (err) console.error(message, err);
  };

  // Function to fetch user profile data
  const fetchData = async (authToken) => {
    try {
      const response = await axios.get('https://zss.pythonanywhere.com/api/v1/profile/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const userData = response.data.data;

      setFormData(prevState => ({
        ...prevState,
        userId: userData.id || '',
        fullName: userData.full_name || '',
        email: userData.email_address || '',
        dateJoined: userData.date_joined || '',
        gender: userData.gender || '',
        IP: userData.ip_address || '',
        lastLoginIP: userData.last_login_ip || '',
        referalCode: userData.referral_code || '',
        referredBy: userData.referred_by || '',
      }));
    } catch (err) {
      handleError('Could not fetch profile data', err);
    }
  };

  // Function to fetch notifications
  const fetchNotifications = async (authToken) => {
    try {
      const response = await axios.get('https://zss.pythonanywhere.com/api/v1/notifications/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setFormData(prevState => ({
        ...prevState,
        notification: response.data, // Assuming response is an array of notifications
      }));
    } catch (err) {
      handleError('Could not fetch notifications', err);
    }
  };


  const fetchAdminNotifications = async () => {
    const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
    if (!token) {
      toast.error('No authentication token found', { position: "top-right", autoClose: 3000 });
      return;
  }
  try {
      const response = await axios.get('https://zss.pythonanywhere.com/api/v1/notifications/', {
          headers: { Authorization: `Bearer ${token}` },
      });
     
      setFormData(prevState => ({
        ...prevState,
        adminNotification: response.data, // Assuming response is an array of notifications
      }));
  } catch (err) {
    handleError('Could not fetch notifications', err);
     
  } 
  };

  // Function to fetch total balance and network balances
  const fetchTotalBalance = async (authToken) => {
    try {
      const response = await axios.get('https://zss.pythonanywhere.com/api/v1/network-balances/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      const { total_balance, network_balances } = response.data;
  
      // Fetch network details to update userWallet and walletAddresses
      const networkResponse = await axios.get('https://zss.pythonanywhere.com/api/v1/networks/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      const networks = networkResponse.data;
  
      // Populate userWallet and walletAddresses from the network data
      const userWallet = {};
      const walletAddresses = {};
  
      networks.forEach(network => {
        // Ensure the name is lowercase and spaces are replaced with hyphens
        const formattedName = network.name.toLowerCase().replace(/\s+/g, '-');
  
        // Log the formatted name and network balance before assigning
        const networkBalance = network_balances[network.name]; // Access balance by network name
  
        // Assign the network balance to userWallet
        userWallet[formattedName] = networkBalance ? networkBalance.balance : 0; // Assign the balance
  
        // Log the wallet address before assigning to walletAddresses
        const walletAddress = network.wallet_address;
  
        // Assign the wallet address to walletAddresses using the formatted name
        walletAddresses[formattedName] = walletAddress;
      });
  
  
      // Now update formData with userWallet and walletAddresses
      setFormData(prevState => ({
        ...prevState,
        totalBalance: total_balance || 0,
        userWallet,
        walletAddresses,
      }));  
    } catch (err) {
      handleError('Could not fetch total balance or networks', err);
    }
  };
  
  

  // Function to fetch plans
  const fetchPlans = async (authToken) => {
    try {
      const response = await axios.get('https://zss.pythonanywhere.com/api/v1/get-plans/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        setFormData(prevState => ({
          ...prevState,
          plans: response.data, // Store plans in the state
        }));
      }
    } catch (err) {
      handleError('Could not fetch plans', err);
    }
  };

  // Function to fetch investments
  const fetchInvestments = async (authToken) => {
    try {
      const response = await axios.get('https://zss.pythonanywhere.com/api/v1/investments/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (response.status === 200) {
        setFormData(prevState => ({
          ...prevState,
          investments: response.data, // Store investments in the state
        }));
      }
    } catch (err) {
      handleError('Could not fetch investments', err);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (!authToken) {
      handleError('No authentication token found');
      return;
    }

    fetchData(authToken);
    fetchNotifications(authToken);
    fetchTotalBalance(authToken);
    fetchPlans(authToken); // Fetch plans as well
    fetchInvestments(authToken); // Fetch investments
  }, []);

 
  return (
   <>
   <ToastContainer/>
    <GlobalStateContext.Provider value={{ formData, setFormData, error, fetchData, fetchNotifications, fetchTotalBalance, fetchPlans, fetchInvestments }}>
      {children}
    </GlobalStateContext.Provider>
   </>
  );
};

// Custom hook to use the GlobalStateContext
export const useGlobalState = () => useContext(GlobalStateContext);
