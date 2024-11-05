'use client';
import React, { useState } from 'react';
import { adminDBSidebar } from '@assets/app/components/resuables/index';
import { useGlobalState } from '@assets/app/GlobalStateProvider';
import { PiGreaterThan } from 'react-icons/pi';

const PersonalInfoPage = () => {
  const {formData} = useGlobalState()
  return (
    <div className="container mx-auto py-12 px-6 sm:px-8 lg:px-12 min-h-screen">
      
      <p className="flex flex-row gap-2 items-center text-lg pb-4 -translate-y-8 font-thin px-6 pt-4">
        <span>{adminDBSidebar[6].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{adminDBSidebar[6].name}</span>
      </p>


      <section className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold mb-2 ">Personal Information</h1>
      </section>

      <section className="shadow-lg p-8 rounded-lg mb-8">
  <div className="flex flex-col gap-4">
    <p className="w-full">
      <strong>Full Name:</strong> {formData.firstName ? formData.firstName : 'No First Name found'}
    </p>
    <p className="w-full">
      <strong>Email:</strong> {formData.email ? formData.email : 'No email found'}
    </p>
    <p className="w-full">
      <strong>Current IP:</strong> 
    </p>
  </div>
</section>
    </div>
  );
};

export default PersonalInfoPage;
