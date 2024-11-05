'use client'

import { DBButtonOne } from '@assets/app/components/resuables/Buttons/Buttons'
import { usrDBSidebar } from '@assets/app/components/resuables/index'
import { useGlobalState } from '@assets/app/GlobalStateProvider'
import { Copy } from 'lucide-react'
import React, { useState } from 'react'
import { PiGreaterThan } from 'react-icons/pi'

const ReferralPage = () => {
  const [referrals, setReferrals] = useState([]); // Example empty referral list
  const [reffCode, setReffCode] = useState('')

  // Retrieve formData from global state
  const { formData } = useGlobalState();
  console.log('Form Data:', formData); // Log formData to check values

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
        <h1 className="text-2xl font-bold mb-2 text-center">Refer Us & Earn</h1>

      {/* Referral Link Section */}
      <section className="shadow-md p-6 rounded-lg mb-8 w-full flex flex-col md:flex-row">
        <div className='w-full md:w-1/2'>
          <h2 className="text-lg font-semibold mb-1">Copy Link</h2>
          <div className="flex items-center space-x-2">
            <span className="px-4 py-2 rounded-md">
              {formData.referalCode ? formData.referalCode : 'You will get a referral link on creation of account'}
            </span>
            {
              formData.referalCode && (
               <DBButtonOne Clicked={() => copyToClipboard(formData.referalCode)} iconValue={(<Copy/>)}/>
              )
            }
          </div>
        </div>
        <form className='w-full md:w-1/2'>
        <h2 className="text-lg font-semibold mb-1">Get Bonus</h2>
             
        <div className="mb-4">
          <label htmlFor="bonus" className="block text-sm font-medium mb-1">Enter referral code to claim bones</label>
          <input
            type="text"
            id="bonus"
            value={reffCode}
            onChange={(e) => setReffCode(e.target.value)}
            placeholder='Refferal Code...'
            required
            className="mt-1 block w-full p-3 border-b bg-transparent outline-none"
          />
        </div>
        </form>
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
