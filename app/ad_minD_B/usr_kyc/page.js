'use client';
import React, { useState, useEffect } from 'react';
import { PiGreaterThan } from 'react-icons/pi';
import { adminDBSidebar } from '@assets/app/components/resuables/index';
import Dropdown from '@assets/app/components/resuables/dropdown/Dropdown';
import { ButtonOne, ButtonTwo, DBButtonTwo } from '@assets/app/components/resuables/Buttons/Buttons';
import { Download, Eye } from 'lucide-react';
import axios from 'axios';

// Define the Kyc component
const Kyc = () => {
  const [filter, setFilter] = useState('all');
  const [kycDocuments, setKycDocuments] = useState([]);
  const [error, setError] = useState(''); // State to hold error messages
  const BASE_URL = 'https://zss.pythonanywhere.com'; // Base URL for document access

  // Function to handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Fetch KYC documents when the component mounts
  useEffect(() => {
    const fetchKycDocuments = async () => {
      const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
      console.log('Token:', token); // Log token

      if (!token) {
        setError('No authentication token found');
        return;
      }

      try {
        const response = await axios.get('https://zss.pythonanywhere.com/api/v1/admin/kyc-list/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched documents:', response.data); // Log fetched documents
        setKycDocuments(response.data);
      } catch (error) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          setError('Failed to fetch KYC documents: ' + (error.response.data.message || error.message));
        } else if (error.request) {
          console.error('Error request:', error.request);
          setError('No response received from server');
        } else {
          console.error('Error message:', error.message);
          setError('Error in setting up request: ' + error.message);
        }
      }
    };

    fetchKycDocuments();
  }, []);

  // Filter documents based on the selected filter
  const filteredDocuments = filter === 'all'
    ? kycDocuments
    : kycDocuments.filter(doc => doc.status === filter);

  // Dropdown options for filtering
  const dropdownItems = [
    { label: 'All', onClick: () => handleFilterChange('all') },
    { label: 'Successful', onClick: () => handleFilterChange('approved') },
    { label: 'Pending', onClick: () => handleFilterChange('pending') },
    { label: 'Failed', onClick: () => handleFilterChange('failed') },
  ];

  // Function to update KYC status
  const updateKycStatus = async (id, status) => {
    const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
    if (!token) {
      setError('No authentication token found');
      return;
    }

    try {
      await axios.put(`https://zss.pythonanywhere.com/api/v1/admin/kyc-update/${id}/`, 
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Re-fetch documents to update the state
      const response = await axios.get('https://zss.pythonanywhere.com/api/v1/admin/kyc-list/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setKycDocuments(response.data);
    } catch (error) {
      setError('Failed to update KYC status: ' + (error.response ? error.response.data.message : error.message));
    }
  };


  return (
    <div className="p-4">
      {error && <p className="text-red-500">{error}</p>} {/* Display any error messages */}
      <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-2 pt-4">
        <span>{adminDBSidebar[4].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{adminDBSidebar[4].name}</span>
      </p>
      <h2 className="text-xl font-bold mb-4 text-center">KYC Documents</h2>

      {/* Dropdown for filtering */}
      <div className="w-full flex justify-end pr-15">
        <Dropdown buttonText={filter.charAt(0).toUpperCase() + filter.slice(1)} items={dropdownItems} />
      </div>

      {/* Table with scrollable x-direction on mobile */}
      <div className="overflow-x-auto justify-center items-center mt-6">
      <table className="w-full border-collapse">
  <thead>
    <tr className="text-start border-b">
      <th className="py-2 text-start">User ID</th>
      <th className="py-2 text-start">User Name</th>
      <th className="py-2 text-start">KYC Document</th>
      <th className="py-2 text-start">Action</th>
    </tr>
  </thead>

  {/* Check if there are no filtered documents */}
  <tbody>
    {filteredDocuments.length === 0 ? (
      <tr>
        <td colSpan="4" className="py-2 text-center">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p>No KYC documents found.</p>
          )}
        </td>
      </tr>
    ) : (
      filteredDocuments.map((doc) => (
        <tr key={doc.id} className="text-end border-b">
          <td className="py-2 text-start">{doc.id}</td>
          <td className="py-2 text-start">{doc.user_full_name}</td>
          <td className="py-2 text-start">
            <a href={`${BASE_URL}${doc.document}`} download className="flex gap-1">
              <ButtonOne iconValue={<Eye />} buttonValue={'Open'} />
            </a>
          </td>
          <td className="py-2 text-start flex flex-row gap-2">
            <select
              value={doc.status}
              onChange={(e) => updateKycStatus(doc.id, e.target.value)}
              className="border-b px-2 py-1 bg-transparent"
            >
              <option value="approved" className=' text-black'>Approve</option>
              <option value="rejected" className=' text-black'>Reject</option>
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

export default Kyc;
