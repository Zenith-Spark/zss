'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DBButtonOne } from '@assets/app/components/resuables/Buttons/Buttons';
import { kycUploadRules, usrDBSidebar } from '@assets/app/components/resuables/index';
import { PiGreaterThan } from 'react-icons/pi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoaderStyle8Component } from '@assets/app/components/resuables/Loader/Loader';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

const SecuritySettings = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [kycFile, setKycFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [kycStatus, setKycStatus] = useState('');
  const [loading, setLoading] = useState(false);  // For tracking upload progress
  const [instructions, setInstructions] = useState(false)

  // Get the token from localStorage or sessionStorage
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  // Fetch KYC status when component mounts
  const fetchKycStatus = useCallback(async () => {
    try {
      const response = await axios.get('https://zss.pythonanywhere.com/api/v1/user-kyc-status/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setKycStatus(response.data.kyc_status);
      }
    } catch (err) {
      toast.error('An error occurred while fetching KYC status.', {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }, [token]);
  

  useEffect(() => {
    fetchKycStatus();
  }, [token, fetchKycStatus]);

  // Password change submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        toast.success('Password updated successfully!',  {
          position: "top-right",
          autoClose: 5000,
        });
        setOldPassword('');
        setNewPassword('');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error('An error occurred: ' + (err.response.data.detail || 'Please try again.'),  {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.error('An error occurred. Please check your connection and try again.',  {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

  // KYC file upload handler
  const handleKycUpload = async () => {
    if (!kycFile) {
      toast.error('Please select a document to upload.',  {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    // Check if the file size exceeds 5MB
    if (kycFile.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit. Please choose a smaller file.',  {
        position: "top-right",
        autoClose: 5000,
      });
      setKycFile(null)
      return;
    }

    setFileError(''); // Clear file error if the size is acceptable
    setLoading(true);  // Start loading

    const formData = new FormData();
    formData.append('document', kycFile); // Change key to 'document'

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

      if (response.status === 200) {
        toast.success('KYC document uploaded successfully!',  {
          position: "top-right",
          autoClose: 5000,
        });
        setKycFile(null); // Reset file input after successful upload
        fetchKycStatus();
      }
    } catch (err) {
      toast.error('An error occurred during document upload. Please try again.',  {
        position: "top-right",
        autoClose: 5000,
      });
      console.error('Error during KYC upload:', err); // Log the error for debugging
    } finally {
      setLoading(false);  // Stop loading after the upload
    }
  };

  const ToggleSetInstruction = () => {
    setInstructions(!instructions)
  }

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

        <DBButtonOne buttonValue="Update Password" />
      </form>
      
      {/* KYC Upload Section */}
      <section className="border shadow-lg rounded-lg p-6 w-full md:w-1/2 mx-auto">
        <h2 className="text-lg font-semibold mb-4">Upload KYC Document</h2>
        
        {(kycStatus === 'rejected' || kycStatus === 'not_submitted') && (
          <div className="mb-6">
            <div className='w-full flex flex-col'>
              <span className='text-base flex flex-row gap-1 items-center text-center cursor-pointer' onClick={ToggleSetInstruction}>
                <p className=" hover:text-blue-600">See instructions</p>
                <p>
                  {
                    instructions ? (
                      <MdArrowDropUp className="transition-all transform duration-300 ease-in-out" />
                    )
                    :
                    (
                      <MdArrowDropDown className="transition-all transform duration-300 ease-in-out" />
                    )
                  }
                </p>
              </span>

              {/* Instructions List */}
              <ul className={`transition-all duration-500 ease-in-out overflow-hidden ${instructions ? 'h-auto max-h-[1000px]' : 'h-0 max-h-0'}`}>
                {
                  kycUploadRules.map((rules, index) => (
                    <li key={index} className="flex flex-col w-full py-2">
                      <div className="text-sm font-semibold">{rules.rule}</div>
                      <div className="text-sm">{rules.description}</div>
                    </li>
                  ))
                }
              </ul>
            </div>
            <label htmlFor="kycFile" className="block text-sm font-medium mb-1">Choose Document</label>
            <input
              type="file"
              id="kycFile"
              onChange={(e) => {
                setKycFile(e.target.files[0]);
                setFileError(''); // Clear any previous file error
              }}
              className="mt-1 block w-full p-3 border-b bg-transparent outline-none mb-3"
            />
            {fileError && <p className="text-sm text-red-600 mt-2">{fileError}</p>} {/* Display file size error */}
            <DBButtonOne buttonValue={loading ? 
              (
                <LoaderStyle8Component fill={'#ffffff'} smaillerSize={true}/>
              )
              : 'Upload Document'} Clicked={handleKycUpload} disabled={loading} />
          </div>
        )}

        {/* Display KYC status */}
        {kycStatus && (
          <div className="mt-4">
            {kycStatus === 'pending' && (
              <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg p-4 mb-4">
                <p>Your KYC document status is currently pending.</p>
              </div>
            )}
            {kycStatus === 'approved' && (
              <div className="bg-green-100 text-green-800 border border-green-300 rounded-lg p-4 mb-4">
                <p>Your KYC document status has been approved.</p>
              </div>
            )}
            {kycStatus === 'rejected' && (
              <div className="bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 mb-4">
                <p>Your KYC document status has been rejected. Please follow the instructions and resubmit.</p>
              </div>
            )}
            {kycStatus === 'not_submitted' && (
              <div className="bg-blue-100 text-blue-800 border border-blue-300 rounded-lg p-4 mb-4">
                <p>Please follow the above instructions to submit your KYC document.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default SecuritySettings;
