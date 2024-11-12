'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    plans: [],
    investments: [],


  // Admin-specific fields
  adminFullName: '',
  adminEmail: '',
  adminPassword: '',
  adminDateJoined: '',
  adminGender: '',
  adminIP: '',
  adminLastLogin: '',
  adminReferralCode: '',
  adminReferredBy: '',
  adminNotification: [],
  });

  const handleError = (message, err = null) => {
    setError(message);
    if (err) console.error(message, err);
  };

  const fetchData = useCallback (
    async (authToken) => {
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
    }, []
  );
  // Function to fetch admin profile data
  const fetchAdminData = useCallback(
    async () => {
      const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
      if (!token) {
        handleError('No admin authentication token found');
        return;
      }
      try {
        const response = await axios.get('https://zss.pythonanywhere.com/api/v1/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const adminData = response.data.data;
  
        setFormData(prevState => ({
          ...prevState,
          adminFullName: adminData.full_name || '',
          adminEmail: adminData.email_address || '',
          adminDateJoined: adminData.date_joined || '',
          adminGender: adminData.gender || '',
          adminIP: adminData.ip_address || '',
          adminLastLogin: adminData.last_login_ip || '',
          adminReferralCode: adminData.referral_code || '',
          adminReferredBy: adminData.referred_by || '',
        }));
      } catch (err) {
        handleError('Could not fetch admin profile data', err);
      }
    }, []
  );


  const fetchNotifications = useCallback(
    async (authToken) => {
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
    }, []
  );


  const fetchAdminNotifications = useCallback(
    async () => {
      const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
      if (!token) {
        handleError('No admin authentication token found');
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
        handleError('Could not fetch admin notifications', err);
      }
    }, []
  );

  const fetchTotalBalance = useCallback(
    async (authToken) => {
      try {
        const response = await axios.get('https://zss.pythonanywhere.com/api/v1/network-balances/', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
    
        const { total_balance, network_balances } = response.data;
    
        const networkResponse = await axios.get('https://zss.pythonanywhere.com/api/v1/networks/', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
    
        const networks = networkResponse.data;
    
        const userWallet = {};
        const walletAddresses = {};
    
        networks.forEach(network => {
          const formattedName = network.name.toLowerCase().replace(/\s+/g, '-');
    
          const networkBalance = network_balances[network.name]; // Access balance by network name
    
          userWallet[formattedName] = networkBalance ? networkBalance.balance : 0; // Assign the balance
    
          const walletAddress = network.wallet_address;
    
          walletAddresses[formattedName] = walletAddress;
        });
    
    
        setFormData(prevState => ({
          ...prevState,
          totalBalance: total_balance || 0,
          userWallet,
          walletAddresses,
        }));  
      } catch (err) {
        handleError('Could not fetch total balance or networks', err);
      }
    }, []
  );
  
  

  // Function to fetch plans
  const fetchPlans = useCallback(
    async (authToken) => {
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
    }, []
  );

  // Function to fetch investments
  const fetchInvestments = useCallback(
    async (authToken) => {
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
    }, []
  )
 // utils/format.js
 const formatBalance = (balance) => {
  if (balance !== null && !isNaN(Number(balance))) {
    return Number(balance).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return "0.00";
};

  return (
   <>
   <ToastContainer/>
    <GlobalStateContext.Provider value={{ formData, setFormData, error, fetchData, fetchNotifications, fetchTotalBalance, fetchPlans, fetchInvestments, fetchAdminNotifications, fetchAdminData, formatBalance }}>
      {children}
    </GlobalStateContext.Provider>
   </>
  );
};

// Custom hook to use the GlobalStateContext
export const useGlobalState = () => useContext(GlobalStateContext);
