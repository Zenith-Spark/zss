'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
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
    totalBalance: 0,
    referralLink: '',
    notification: [], // Notifications array
    adminNotificaton: []
  });
  const [error, setError] = useState(null);
  console.log(formData.totalBalance)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken =
          localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

        if (!authToken) {
          setError('No authentication token found');
          return;
        }

        const response = await axios.get('https://zss.pythonanywhere.com/api/v1/profile/', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const apiData = response.data;
        const userData = apiData.data;

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
        console.error('Error fetching profile data', err);
        setError('Could not fetch data');
      }
    };

    fetchData();
  }, []); // Only run once when the component mounts

  // Function to fetch notifications
  const fetchNotifications = async () => {
    try {
      const authToken =
        localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

      if (!authToken) {
        setError('No authentication token found');
        return;
      }

      const response = await axios.get('https://zss.pythonanywhere.com/api/v1/notifications/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      const notificationsData = response.data; // Assume this is the array of notifications
      console.log('notification'+notificationsData);
      setFormData(prevState => ({
        ...prevState,
        notification: notificationsData, // Update notifications in formData
      }));
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Could not fetch notifications');
    }
  };

  // Fetch notifications when the component mounts
  useEffect(() => {
    fetchNotifications();
  }, []); // Run once on mount

  // Track changes in formData for debugging
  useEffect(() => {
    console.log('Updated formData:', formData);
  }, [formData]);


  return (
    <GlobalStateContext.Provider value={{ formData, setFormData, error }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the GlobalStateContext
export const useGlobalState = () => useContext(GlobalStateContext);
