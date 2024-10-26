'use client'
import { DBButtonOne } from '@assets/app/components/resuables/Buttons/Buttons';
// /components/SecuritySettings.js
import { usrDBSidebar } from '@assets/app/components/resuables/index';
import Modal from '@assets/app/components/resuables/Modal/Modal';
import React, { useState } from 'react';
import { PiGreaterThan } from 'react-icons/pi';

const SecuritySettings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [kycFile, setKycFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError('');
    setSuccessMessage("Password updated successfully!");
    // Additional submit logic here
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
      <form onSubmit={handleSubmit} className="border shadow-lg rounded-lg p-6 mb-12  w-full md:w-1/2 mx-auto">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>

        <div className="mb-4">
          <label htmlFor="old_password" className="block text-sm font-medium 0 mb-1">Old Password</label>
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
          <label htmlFor="newPassword" className="block text-sm font-medium 0 mb-1">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 block w-full p-3 border-b bg-transparent outline-none"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium 0 mb-1">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full p-3 border-b bg-transparent outline-none"
          />
        </div>
        
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        {successMessage && <p className="text-sm text-green-600 mb-4">{successMessage}</p>}

        <DBButtonOne buttonValue="Done" />
      </form>
      
      {/* KYC Upload Section */}
      <section className="border shadow-lg rounded-lg p-6   w-full md:w-1/2 mx-auto">
        <h2 className="text-lg font-semibold mb-4">Upload KYC Document</h2>
        
        <div className="mb-6">
          <label htmlFor="kycFile" className="block text-sm font-medium 0 mb-1">Choose Document</label>
          <input
            type="file"
            id="kycFile"
            onChange={(e) => setKycFile(e.target.files[0])}
            required
            className="mt-1 block w-full p-3 border-b bg-transparent outline-none"
          />
        </div>
      </section>
    </div>
  );
};

export default SecuritySettings;
