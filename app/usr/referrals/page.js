'use client'

import { usrDBSidebar } from '@assets/app/components/resuables/index'
import { useGlobalState } from '@assets/app/GlobalStateProvider'
import React, { useState } from 'react'
import { PiGreaterThan } from 'react-icons/pi'
const ReferralPage = () => {
  const [referrals, setReferrals] = useState([]); // Example empty referral list

  // Retrieve formData.referralLink from global state
  const { formData } = useGlobalState();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="p-4">
      <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-6 pt-4">
        <span>{usrDBSidebar[5].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{usrDBSidebar[5].name}</span>
      </p>

      {/* Referral Program Info */}
      <section className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Refer Us & Earn</h1>
        <p className="">Invite friends and earn 5% from their initial deposit.</p>
      </section>

      {/* Referral Link Section */}
      <section className="shadow-md p-6 rounded-lg mb-8">
        <div>
          <h2 className="text-lg font-semibold mb-1">Copy Link</h2>
          <div className="flex items-center space-x-2">
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
        </div>
      </section>

      {/* Referrals Table */}
      <section className="shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">My Referrals</h2>

        {referrals.length === 0 ? (
          <p className="text-gray-500">No records</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Referee</th>
                <th className="px-4 py-2 border">Bonus</th>
                <th className="px-4 py-2 border">Joined</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((referral, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{referral.referee}</td>
                  <td className="px-4 py-2 border">{referral.bonus}</td>
                  <td className="px-4 py-2 border">{referral.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default ReferralPage;
