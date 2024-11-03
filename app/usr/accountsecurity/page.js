'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DBButtonOne } from '@assets/app/components/resuables/Buttons/Buttons';
import { usrDBSidebar } from '@assets/app/components/resuables/index';
import { PiGreaterThan } from 'react-icons/pi';

const SecuritySettings = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [kycFile, setKycFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Get the token from localStorage or sessionStorage
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  // Password change submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post(
        'https://zss.pythonanywhere.com/api/v1/change-password/',
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Password updated successfully!');
        setTimeout(() => {
          setOldPassword('');
          setNewPassword('');
        }, 500);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError('An error occurred. ' + (err.response.data.detail || 'Please try again.'));
      } else {
        setError('An error occurred. Please check your connection and try again.');
      }
    }
  };

  // KYC file upload handler
  const handleKycUpload = async () => {
    if (!kycFile) {
      setError('Please select a document to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('kyc_document', kycFile);

    try {
      const response = await axios.post(
        'https://zss.pythonanywhere.com/api/v1/upload-kyc/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      console.log('change password'+response.data);
      
      if (response.status === 200) {
        setSuccessMessage('KYC document uploaded successfully!');
        setKycFile(null); // Reset file input after successful upload
      }
    } catch (err) {
      setError('An error occurred during document upload. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-12 px-6 sm:px-8 lg:px-12">
      <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-6 pt-4 -translate-y-10">
        <span>{usrDBSidebar[7].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{usrDBSidebar[7].name}</span>
      </p>

      <h1 className="text-4xl text-center font-bold mb-8">Account Security</h1>
      
      {/* Password Update Form */}
      <form onSubmit={handleSubmit} className="border shadow-lg rounded-lg p-6 mb-12 w-full md:w-1/2 mx-auto">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>

        <div className="mb-4">
          <label htmlFor="old_password" className="block text-sm font-medium mb-1">Old Password</label>
          <input
            type="password"
            id="old_password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="mt-1 block w-full p-3 border-b bg-transparent outline-none"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 block w-full p-3 border-b bg-transparent outline-none"
          />
        </div>
        
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        {successMessage && <p className="text-sm text-green-600 mb-4">{successMessage}</p>}

        <DBButtonOne buttonValue="Update Password" />
      </form>
      
      {/* KYC Upload Section */}
      <section className="border shadow-lg rounded-lg p-6 w-full md:w-1/2 mx-auto">
        <h2 className="text-lg font-semibold mb-4">Upload KYC Document</h2>
        
        <div className="mb-6">
          <label htmlFor="kycFile" className="block text-sm font-medium mb-1">Choose Document</label>
          <input
            type="file"
            id="kycFile"
            onChange={(e) => setKycFile(e.target.files[0])}
            className="mt-1 block w-full p-3 border-b bg-transparent outline-none"
          />
        </div>

        <DBButtonOne buttonValue="Upload Document" Clicked={handleKycUpload} />
      </section>
    </div>
  );
};

export default SecuritySettings;
