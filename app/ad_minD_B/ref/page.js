'use client';
import { adminDBSidebar } from '@assets/app/components/resuables/index';
import React, { useState, useEffect } from 'react';
import { PiGreaterThan } from 'react-icons/pi';
import axios from 'axios';

const Page = () => {
  const [referrals, setReferrals] = useState([]);
  const [error, setError] = useState(null); // State to hold error messages
  const [loading, setLoading] = useState(true); // Loading state for fetching data

  // Fetch referrals when the component mounts
  useEffect(() => {
    const fetchReferrals = async () => {
      const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
      if (!token) {
        setError('No authentication token found');
        setLoading(false); // Set loading to false on error
        return;
      }

      try {
        const response = await axios.get('https://zss.pythonanywhere.com/api/v1/admin/get-referrals/', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        });
        const formattedReferrals = response.data.map(referral => ({
          referee: referral.full_name,
          ipAddress: referral.ip_address, // Use the IP address
          email: referral.email_address, // Use the referee's email
          joined: new Date(referral.date_joined).toLocaleDateString(), // Format date as needed
          referredBy: referral.referred_by.full_name // Get the referred by name
        }));
        setReferrals(formattedReferrals);
      } catch (error) {
        console.error('Error fetching referrals:', error);
        setError('Failed to fetch referrals: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchReferrals();
  }, []);

  return (
    <div className="pt-16 w-full h-auto">
      <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-6 pt-4">
        <span>{adminDBSidebar[6].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{adminDBSidebar[6].name}</span>
      </p>

      <h2 className="text-2xl font-bold text-center mb-4">All Referrals</h2>
      <section className="shadow-md p-6 rounded-lg">
        {error ? (
          <p className="text-red-500 mb-4">{error}</p>
        ) : loading ? (
          <p className="text-gray-500 text-center">Loading referrals...</p>
        ) : referrals.length === 0 ? (
          <p className="text-gray-500 text-center">No records</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-start">Referee</th>
                <th className="px-4 py-2 text-end">IP Address</th>
                <th className="px-4 py-2 text-end">Email</th>
                <th className="px-4 py-2 text-end">Joined</th>
                <th className="px-4 py-2 text-end">Referred By</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((referral, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-start">{referral.referee}</td>
                  <td className="px-4 py-2 text-end">{referral.ipAddress}</td>
                  <td className="px-4 py-2 text-end">{referral.email}</td>
                  <td className="px-4 py-2 text-end">{referral.joined}</td>
                  <td className="px-4 py-2 text-end">{referral.referredBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default Page;
