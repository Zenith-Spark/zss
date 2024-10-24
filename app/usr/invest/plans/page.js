'use client';
import React, { useState } from 'react';
import { useGlobalState } from '@assets/app/GlobalStateProvider';
import { Plans } from '@assets/app/components/resuables/index';

const PlansPage = () => {
  const { formData } = useGlobalState();
  const [selectedPlan, setSelectedPlan] = useState(Plans[0]); // Default to the first plan
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(Object.keys(formData.userWallet)[0]); // Set default selected coin

  const handlePlanChange = (e) => {
    const plan = Plans.find(p => p.title === e.target.value);
    setSelectedPlan(plan);
  };

  const handleCoinChange = (e) => {
    setSelectedCoin(e.target.value);
  };

  const handleInvestmentChange = (e) => {
    setInvestmentAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const coinValue = formData.userWallet[selectedCoin];
    const equivalentValue = investmentAmount / coinValue;

    // Check if the investment is valid
    if (equivalentValue > 0) {
      alert(`You are investing $${investmentAmount} in ${selectedCoin} with the ${selectedPlan.title}.`);
    } else {
      alert('Insufficient value of the selected coin for this investment.');
    }
  };

  return (
    <div className="flex flex-col md:flex-wrap gap-x-5 lg:gap-x-7 gap-y-4 p-5">
      {/* Dropdown for selecting plans */}
      <div className="mb-4">
        <label htmlFor="planSelect" className="block text-gray-700 mb-2">Select Plan:</label>
        <select
          id="planSelect"
          onChange={handlePlanChange}
          className="border rounded-lg p-2 w-full"
        >
          {Plans.map((plan) => (
            <option key={plan.title} value={plan.title}>
              {plan.title}
            </option>
          ))}
        </select>
      </div>

      {/* Display selected plan */}
      <div className="mx-2 bg-white shadow-lg rounded-lg p-6 flex-shrink-0 w-64">
        <ul className="flex flex-col justify-evenly items-center text-center gap-4">
          <li className="text-yellow-600 font-bold text-xl md:text-2xl">{selectedPlan.title}</li>
          <li className="text-gray-800 text-4xl md:text-5xl font-extrabold mb-4">{selectedPlan.heading}</li>
          <li className="text-gray-600 text-lg">
            <span className="font-semibold">Interval: </span> {selectedPlan.interval}
          </li>
          <li className="text-gray-600 text-lg">
            <span className="font-semibold">Min: </span> {selectedPlan.min}
          </li>
          <li className="text-gray-600 text-lg">
            <span className="font-semibold">Max: </span> {selectedPlan.max}
          </li>
          <li className="text-yellow-600 text-xl font-bold">{selectedPlan.cr}</li>
        </ul>

        {/* Investment Form */}
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="coinSelect" className="block text-gray-700 mb-2">Select Coin:</label>
            <select
              id="coinSelect"
              value={selectedCoin}
              onChange={handleCoinChange}
              className="border rounded-lg p-2 w-full"
            >
              {Object.keys(formData.userWallet).map((coin) => (
                <option key={coin} value={coin}>
                  {coin.charAt(0).toUpperCase() + coin.slice(1)} {/* Capitalize first letter */}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
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
    </div>
  );
};

export default PlansPage;
