'use client';
import React, { useState, useEffect } from 'react';
import { PiGreaterThan } from 'react-icons/pi';
import { adminDBSidebar } from '@assets/app/components/resuables/index';
import Dropdown from '@assets/app/components/resuables/dropdown/Dropdown';
import { ButtonTwo, DBButtonOne, DBButtonTwo } from '@assets/app/components/resuables/Buttons/Buttons';
import { Download, Eye, Verified, X } from 'lucide-react';
import axios from 'axios';

// Define the Kyc component
const Kyc = () => {
  const [filter, setFilter] = useState('all');
  const [kycDocuments, setKycDocuments] = useState([]);
  const [error, setError] = useState(null); // State to hold error messages

  // Function to handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Fetch KYC documents when the component mounts
  useEffect(() => {
    const fetchKycDocuments = async () => {
      const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
      console.log('Token:', token); // Log the token for debugging

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
        setKycDocuments(response.data);
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          setError('Failed to fetch KYC documents: ' + (error.response.data.message || error.message));
        } else if (error.request) {
          // Request was made but no response received
          console.error('Error request:', error.request);
          setError('No response received from server');
        } else {
          // Something happened in setting up the request
          console.error('Error message:', error.message);
          setError('Error in setting up request: ' + error.message);
        }
      }
      }
      
    fetchKycDocuments();
  }, []);

  // Filter documents based on the selected filter
  const filteredDocuments = filter === 'all'
    ? kycDocuments
    : kycDocuments.filter(doc => doc.status === filter);

  // Dropdown options
  const dropdownItems = [
    { label: 'All', onClick: () => handleFilterChange('all') },
    { label: 'Successful', onClick: () => handleFilterChange('successful') },
    { label: 'Pending', onClick: () => handleFilterChange('pending') },
    { label: 'Failed', onClick: () => handleFilterChange('failed') },
  ];

  return (
    <div className="p-4">
      {error && <p className="text-red-500">{error}</p>} {/* Display any error messages */}
      <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-2 pt-4">
        <span>{adminDBSidebar[3].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{adminDBSidebar[3].name}</span>
      </p>
      <h2 className="text-xl font-bold mb-4 text-center">Pending KYC</h2>

      {/* Dropdown for filtering */}
      <div className="w-full flex justify-end pr-15">
        <Dropdown buttonText={filter.charAt(0).toUpperCase() + filter.slice(1)} items={dropdownItems} />
      </div>

      {/* Table with scrollable x-direction on mobile */}
      <div className="overflow-x-auto justify-center items-center mt-6">
        <table className="w-[40rem]">
          <thead>
            <tr className="text-start">
              <th className="py-2 text-start">User Id</th>
              <th className="py-2 text-end">User Name</th>
              <th className="py-2 text-end">KYC Doc</th>
              <th className="py-2 text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-start py-4">
                  No KYC Submitted
                </td>
              </tr>
            ) : (
              filteredDocuments.map((doc, index) => (
                <tr key={index} className='text-end'>
                  <td className="py-2 text-start">{doc.userId}</td>
                  <td className="py-2 text-start">{doc.userName}</td>
                  <td className="py-2 flex flex-row items-center gap-2">
                    <DBButtonOne buttonValue={'View'} iconValue={(<Eye />)} />
                    <DBButtonTwo buttonValue={'Download'} iconValue={(<Download />)} />
                  </td>
                  <td className="py-2 flex flex-row items-center gap-2">
                    <DBButtonOne buttonValue={'Approve'} iconValue={(<Verified />)} />
                    <ButtonTwo buttonValue={'Reject'} iconValue={(<X />)} />
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
