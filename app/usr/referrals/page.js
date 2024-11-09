'use client'

import { DBButtonOne } from '@assets/app/components/resuables/Buttons/Buttons'
import { usrDBSidebar } from '@assets/app/components/resuables/index'
import { useGlobalState } from '@assets/app/GlobalStateProvider'
import { Copy } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { PiGreaterThan } from 'react-icons/pi'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ReferralPage = () => {
  const [referrals, setReferrals] = useState([]) // Referral list state
  const [reffCode, setReffCode] = useState('') // Referral code input state
  const { formData, setFormData } = useGlobalState()

  // Fetch referral details on page load
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
        if (!token) {
          toast.error('You need to be logged in to view your referral details.',  {
            position: "top-right",
            autoClose: 5000,
          })
          return
        }

        const response = await axios.get(
          'https://zss.pythonanywhere.com/api/v1/get-referral-details/',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 200) {
          setReferrals(response.data) // Set referrals data
        } else {
          toast.error('Failed to load referral details. Please try again later.',  {
            position: "top-right",
            autoClose: 5000,
          })
        }
      } catch (error) {
        console.error('Error fetching referral details:', error)
        toast.error('There was an error fetching referral details. Please try again later.',  {
          position: "top-right",
          autoClose: 5000,
        })
      }
    }

    fetchReferrals() // Trigger fetch on component mount
  }, [])

  // Handle Copy to Clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!',  {
      position: "top-right",
      autoClose: 5000,
    })
  }

  // Handle Referral Code Submission
  const handleReferralSubmit = async (e) => {
    e.preventDefault()
    
    if (!reffCode) {
      toast.error('Please enter a referral code.',  {
        position: "top-right",
        autoClose: 5000,
      })
      return
    }

    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
      if (!token) {
        toast.error('You need to be logged in to apply a referral code.',  {
          position: "top-right",
          autoClose: 5000,
        })
        return
      }

      const response = await axios.post(
        'https://zss.pythonanywhere.com/api/v1/apply-referral/',
        { referral_code: reffCode },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.status === 200) {
        toast.success('Referral code applied successfully!',  {
          position: "top-right",
          autoClose: 5000,
        })
        setFormData((prevState) => ({
          ...prevState,
          referalCode: reffCode,
        }))
      } else {
        toast.error('Failed to apply referral code. Please try again.',  {
          position: "top-right",
          autoClose: 5000,
        })
      }
    } catch (error) {
      console.error('Error applying referral code:', error)
      toast.error('There was an error processing your request. Please try again later.',  {
        position: "top-right",
        autoClose: 5000,
      })
    }
  }

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
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-1">Copy Link</h2>
          <div className="flex items-center space-x-2">
            <span className="px-4 py-2 rounded-md">
              {formData.referalCode ? formData.referalCode : 'You will get a referral link on creation of account'}
            </span>
            {formData.referalCode && (
              <DBButtonOne Clicked={() => copyToClipboard(formData.referalCode)} iconValue={<Copy />} />
            )}
          </div>
        </div>
        
        {/* Apply Referral Code */}
        <form onSubmit={handleReferralSubmit} className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-1">Get Bonus</h2>

          <div className="mb-4">
            <label htmlFor="bonus" className="block text-sm font-medium mb-1">Enter referral code to claim bonus</label>
            <input
              type="text"
              id="bonus"
              value={reffCode}
              onChange={(e) => setReffCode(e.target.value)}
              placeholder="Referral Code..."
              required
              className="mt-1 block w-full p-3 border-b bg-transparent outline-none"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white rounded-lg w-full py-2">Apply Referral</button>
        </form>
      </section>

      {/* Referrals Table */}
      <section className="shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">My Referrals</h2>

        {referrals.length === 0 ? (
          <p className="text-gray-500">No referrals yet</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Full Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">IP Address</th>
                <th className="px-4 py-2 border">Date Joined</th>
                <th className="px-4 py-2 border">Active</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((referral, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{referral.full_name}</td>
                  <td className="px-4 py-2 border">{referral.email}</td>
                  <td className="px-4 py-2 border">{referral.ip_address}</td>
                  <td className="px-4 py-2 border">{new Date(referral.date_joined).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">{referral.is_active ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}

export default ReferralPage
