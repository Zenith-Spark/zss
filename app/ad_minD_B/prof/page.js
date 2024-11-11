'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { usrDBSidebar } from '@assets/app/components/resuables/index';
import { PiGreaterThan } from 'react-icons/pi';
import { Edit } from 'lucide-react';
import { useGlobalState } from '@assets/app/GlobalStateProvider';

const PersonalInfoPage = () => {
  const { formData, setFormData } = useGlobalState();
  const [gender, setGender] = useState(formData.adminGender || 'FEMALE'); // Default to "FEMALE"
  const [selectGender, setSelectGender] = useState(false);

  const toggleSelectedGender = () => {
    setSelectGender(!selectGender);
  };

  // Update gender in the backend
  const updateGender = async (newGender) => {
    try {
      const response = await axios.put(
        'https://zss.pythonanywhere.com/api/v1/profile/',
        { gender: newGender },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken')}`,
          },
        }
      );

      if (response.data.data === 'ok') {
        setFormData((prevData) => ({
          ...prevData,
          adminGender: newGender,
        }));
      }
    } catch (error) {
      console.error('Error updating gender:', error);
    }
  };

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setGender(selectedGender);
    updateGender(selectedGender); // Update gender in the backend
  };

  return (
    <div className="container mx-auto py-12 px-6 sm:px-8 lg:px-12 min-h-screen">
      <p className="flex flex-row gap-2 items-center text-lg pb-4 -translate-y-8 font-thin px-6 pt-4">
        <span>{usrDBSidebar[6].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{usrDBSidebar[6].name}</span>
      </p>

      <section className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold mb-2">Personal Information</h1>
      </section>

      <section className="shadow-lg p-8 rounded-lg mb-8">
        <div className="flex flex-col gap-4">
          <p className="w-full">
            <strong>Full Name:</strong> {formData.adminFullName || 'Full name'}
          </p>
          <p className="w-full">
            <strong>Email:</strong> {formData.adminEmail || 'No email found'}
          </p>
          <p className="w-full">
            <strong>Current IP:</strong> {formData.adminIP || 'User IP'}
          </p>
          <p className="w-full">
            <strong>Last Login IP:</strong> {formData.adminLastLogin ||  'User lastLoginIP'}
          </p>
          <div>
            <p className="w-full flex flex-row justify-between">
              <span>
                <strong>Gender:</strong> {formData.adminGender || 'Gender'}
              </span>
              <Edit onClick={toggleSelectedGender} />
            </p>
            {selectGender && (
              <div className="flex flex-col gap-4">
                <label htmlFor="gender" className="block text-sm  font-medium mb-2">Select Gender:</label>
                <select id="gender" value={gender} onChange={handleGenderChange} className="p-2 border rounded bg-transparent">
                  <option value="FEMALE">Female</option>
                  <option value="MALE">Male</option>
                </select>
              </div>
            )}
          </div>
          <p className="w-full">
            <strong>Date Joined:</strong> {formData.adminDateJoined
                  ? new Date(formData.adminDateJoined).toLocaleString()
                  : 'Date not available'}
          </p>
          <p className="w-full">
            <strong>Referred By:</strong> {formData.adminLastReferredBy ||  'You were not referred'}
          </p>
        </div>
      </section>
    </div>
  );
};

export default PersonalInfoPage;
