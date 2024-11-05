'use client';
import { Plans, usrDBSidebar } from '@assets/app/components/resuables/index';
import Link from 'next/link';
import React, { useState } from 'react';
import { useGlobalState } from '@assets/app/GlobalStateProvider';
import Modal from '@assets/app/components/resuables/Modal/Modal';
import { AiOutlineClose } from 'react-icons/ai'; // Import the close icon
import { PiGreaterThan } from 'react-icons/pi';
import axios from 'axios'; // Import axios

const Page = () => {
  const { formData } = useGlobalState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(Object.keys(formData.userWallet)[0]); // Set default selected coin

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setSelectedCoin(Object.keys(formData.userWallet)[0]); // Reset to the first coin
    setInvestmentAmount(''); // Reset investment amount
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCoinChange = (e) => {
    setSelectedCoin(e.target.value);
  };

  const handleInvestmentChange = (e) => {
    setInvestmentAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const coinValue = formData.userWallet[selectedCoin];
    const equivalentValue = investmentAmount / coinValue;
  
    // Check if the investment is valid
    if (investmentAmount > 0 && investmentAmount <= coinValue) {
      // Retrieve token from local or session storage
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      if (!token) {
        alert('No token found. Please log in.');
        return; // Exit if no token is found
      }
  
      try {
        // Prepare the investment data
        const investmentData = {
          investment_plan_name: selectedPlan.title,
          amount_usd: investmentAmount,
          network_name: selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1).toLowerCase(),
        };
  
        console.log('Investment Data:', investmentData); // Log the data being sent
  
        // Make the POST request
        const response = await axios.post('https://zss.pythonanywhere.com/api/v1/investments/', investmentData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        });
  
        console.log('Investment response:', response.data); // Log the response data
  
        // Handle the response as needed
        alert(`You have successfully invested $${investmentAmount} in ${investmentData.network_name} with the ${selectedPlan.title}.`);
        closeModal(); // Close modal after submission
  
      } catch (error) {
        console.error('Investment failed:', error);
        alert('There was an error processing your investment. Please try again.');
      }
    } else {
      alert('Insufficient value of the selected coin for this investment.');
    }
  };
  

  return (
    <>
      <p className="flex flex-row gap-2 items-center text-lg font-thin px-6 mb-14 translate-y-7">
        <span>{usrDBSidebar[3].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{usrDBSidebar[3].name}</span>
      </p>
      <div className="flex justify-center flex-col py-8">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-8">
          {Plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-[18rem] md:w-[20rem] lg:w-[22rem] flex-shrink-0"
            >
              <ul className="flex flex-col justify-evenly items-center text-center gap-4">
                <li className="text-yellow-600 font-bold text-xl md:text-2xl">{plan.title}</li>
                <li className="text-gray-800 text-4xl md:text-5xl font-extrabold mb-4">{plan.heading}</li>
                <li className="text-gray-600 text-lg">
                  <span className="font-semibold">Interval: </span> {plan.interval}
                </li>
                <li className="text-gray-600 text-lg">
                  <span className="font-semibold">Min: </span> {plan.min}
                </li>
                <li className="text-yellow-600 text-xl font-bold">{plan.cr}</li>
                <button onClick={() => openModal(plan)} className="mt-4 bg-blue-500 w-full text-white rounded-lg px-4 py-2">
                  Invest
                </button>
              </ul>
            </div>
          ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="relative">
            <h2 className="text-lg font-bold mb-4">Invest in {selectedPlan ? selectedPlan.title : ''}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="coinSelect" className="block text-gray-700 mb-2">Select Coin:</label>
                <select
                  id="coinSelect"
                  value={selectedCoin}
                  onChange={handleCoinChange}
                  className="border rounded-lg p-2 w-full"
                  required
                >
                  {Object.keys(formData.userWallet).map((coin) => (
                    <option key={coin} value={coin}>
                      {coin.charAt(0).toUpperCase() + coin.slice(1)} {/* Capitalize first letter */}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="investmentAmount" className="block text-gray-700 mb-2">Investment Amount ($):</label>
                <input
                  type="number"
                  id="investmentAmount"
                  value={investmentAmount}
                  onChange={handleInvestmentChange}
                  className="border rounded-lg p-2 w-full"
                  min="0"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2">
                Invest
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Page;
