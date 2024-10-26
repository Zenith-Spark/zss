'use client';
import React, { useState } from 'react';
import { usrDBSidebar } from '@assets/app/components/resuables/index';
import { useGlobalState } from '@assets/app/GlobalStateProvider';
import { PiGreaterThan } from 'react-icons/pi';

const PersonalInfoPage = () => {
  const { formData } = useGlobalState();
  const [IP, setIP] = useState('')

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const getUserIP = () => {
    const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    
    if (!RTCPeerConnection) {
      console.log('WebRTC not supported');
      return;
    }
  
    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel(''); // Create a data channel to gather ICE candidates
  
    pc.createOffer().then((offer) => pc.setLocalDescription(offer)); // Create an offer
  
    pc.onicecandidate = (ice) => {
      if (!ice || !ice.candidate || !ice.candidate.candidate) return;
  
      const parts = ice.candidate.candidate.split(' '); // Split the candidate string
      const ip = parts[4]; // The IP address is usually at index 4
      console.log('User IP Address:', ip);
      setIP(ip)
    };
  };
  
  // Call the function
  getUserIP();
  

  return (
    <div className="container mx-auto py-12 px-6 sm:px-8 lg:px-12 min-h-screen">
      
      <p className="flex flex-row gap-2 items-center text-lg pb-4 -translate-y-8 font-thin px-6 pt-4">
        <span>{usrDBSidebar[6].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{usrDBSidebar[6].name}</span>
      </p>


      <section className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold mb-2 ">Personal Information</h1>
      </section>

      <section className="shadow-lg p-8 rounded-lg mb-8">
  <div className="flex flex-col gap-4">
    <p className="w-full">
      <strong>First Name:</strong> {formData.firstName ? formData.firstName : 'No First Name found'}
    </p>
    <p className="w-full">
      <strong>Middle Name:</strong> {formData.middleName ? formData.middleName : 'No Middle Name found'}
    </p>
    <p className="w-full">
      <strong>Last Name:</strong> {formData.lastName ? formData.lastName : 'No Last Name found'}
    </p>
    <p className="w-full">
      <strong>Email:</strong> {formData.email ? formData.email : 'No email found'}
    </p>
    <p className="w-full">
      <strong>Current IP:</strong> {IP}
    </p>
  </div>
</section>

      <section className=" shadow-lg p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 ">Referral Link</h2>
        <div className="flex items-center space-x-4">
        <span className=" px-4 py-2 rounded-md">{formData.referralLink ? formData.referralLink : 'You will get a referal link on creation of account'}  </span>
            {
              formData.referralLink && (
            <button
              className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600"
              onClick={() => copyToClipboard(formData.referralLink)}
            >
              Copy Link
            </button>
              )
            }
        </div>
      </section>

    </div>
  );
};

export default PersonalInfoPage;
