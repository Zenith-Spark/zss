'use client'
// /components/SecuritySettings.js
import { usrDBSidebar } from '@assets/app/components/resuables/index';
import Modal from '@assets/app/components/resuables/Modal/Modal';
import React, { useState } from 'react';
import { PiGreaterThan } from 'react-icons/pi';

const SecuritySettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState(''); // To track the action type (change password or KYC)

  const handleOpenModal = (actionType) => {
    setAction(actionType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAction('');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Implement password change logic here
   alert("Password change submitted");
    handleCloseModal();
  };

  const handleKycSubmit = (e) => {
    e.preventDefault();
    // Implement KYC upload logic here
   alert("KYC file upload submitted");
    handleCloseModal();
  };

  return (
    <div className="container mx-auto py-12 px-6 sm:px-8 lg:px-12">
       <p className="flex flex-row gap-2 items-center text-xs pb-4 font-thin px-6 pt-4">
        <span>{usrDBSidebar[7].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{usrDBSidebar[7].name}</span>
      </p>
      <section className="mb-8">
        <h1 className="text-3xl font-extrabold mb-4">Account Security </h1>
        <button
          onClick={() => handleOpenModal('password')}
          className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600 mr-4"
        >
          Change Password
        </button>
        <button
          onClick={() => handleOpenModal('kyc')}
          className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-600"
        >
          Upload KYC
        </button>
      </section>

      {/* Modal for changing password */}
      <Modal
        isOpen={isModalOpen && action === 'password'}
        onClose={handleCloseModal}
        title="Change Password"
        onSubmit={handlePasswordSubmit}
      >
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
          <input
            type="password"
            id="newPassword"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </Modal>

      {/* Modal for uploading KYC */}
      <Modal
        isOpen={isModalOpen && action === 'kyc'}
        onClose={handleCloseModal}
        title="Upload KYC Document"
        onSubmit={handleKycSubmit}
      >
        <div className="mb-4">
          <label htmlFor="kycFile" className="block text-gray-700">Choose KYC Document</label>
          <input
            type="file"
            id="kycFile"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </Modal>
    </div>
  );
};

export default SecuritySettings;
