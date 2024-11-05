'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { usrDBSidebar } from '@assets/app/components/resuables/index';
import { useGlobalState } from '@assets/app/GlobalStateProvider';
import { PiGreaterThan } from 'react-icons/pi';
import { Edit } from 'lucide-react';

const PersonalInfoPage = () => {
  const { formData, setFormData } = useGlobalState();
  const [gender, setGender] = useState(formData.gender || 'FEMALE'); // Default to "FEMALE"
  const [selectGender, setSelectGender]= useState(false)
  const ToggleSelectedGender = ()=>{
    setSelectGender(!selectGender)
  }

  // Update gender in the backend
  const updateGender = async (newGender) => {
    try {
      const response = await axios.put(
        'https://zss.pythonanywhere.com/api/v1/profile/',
        { gender: newGender },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken') || sessionStorage.getItem('authToken')}`,
          },
        }
      );

      if (response.data.data === 'ok') {
        setFormData((prevData) => ({
          ...prevData,
          gender: newGender, // Update gender in the form data
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
            <strong>Full Name:</strong> {formData.fullName || 'Full name'}
          </p>
          <p className="w-full">
            <strong>Email:</strong> {formData.email || 'No email found'}
          </p>
          <p className="w-full">
            <strong>Current IP:</strong> {formData.IP || 'User IP'}
          </p>
          <p className="w-full">
            <strong>Last Login IP:</strong> {formData.lastLoginIP || 'User lastLoginIP'}
          </p>
          <div>
          <p className="w-full flex flex-row justify-between">
            <span>
            <strong>Gender:</strong> {formData.gender || 'Gender'}
            </span>
            <Edit onClick={ToggleSelectedGender}/>
          </p>
          {
            selectGender && (
              <div className="flex flex-col gap-4">
              <label htmlFor="gender" className="block text-sm font-medium mb-2">Select Gender:</label>
              <select id="gender" value={gender} onChange={handleGenderChange} className="p-2 border rounded">
                <option value="FEMALE">Female</option>
                <option value="MALE">Male</option>
              </select>
            </div>
            )
          }
          </div>
          <p className="w-full">
            <strong>Date Joined:</strong> {formData.dateJoined || 'dateJoined'}
          </p>
          <p className="w-full">
            <strong>Referred By:</strong> {formData.referredBy || 'You were not referred'}
          </p>
        </div>
      </section>

      <section className="shadow-lg p-8 rounded-lg mb-8">
       
      </section>
    </div>
  );
};

export default PersonalInfoPage;
