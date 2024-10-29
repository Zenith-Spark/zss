'use client'
import { adminDBSidebar } from '@assets/app/components/resuables/index'
import React, { useState } from 'react'
import { PiGreaterThan } from 'react-icons/pi'

const Page = () => {
  const [referrals, setReferrals] = useState([])
  return (
    <div className='pt-16 w-full h-auto '>
      <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-6 pt-4">
        <span>{adminDBSidebar[3].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{adminDBSidebar[3].name}</span>
      </p>

        <h2 className="text-2xl font-bold text-center mb-4">All Referrals</h2>
        <section className="shadow-md p-6 rounded-lg ">
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
  )
}

export default Page