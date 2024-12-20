'use client';
import { usrDBSidebar } from '@assets/app/components/resuables/index';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useGlobalState } from '@assets/app/GlobalStateProvider';
import Modal from '@assets/app/components/resuables/Modal/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import { PiGreaterThan } from 'react-icons/pi';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoaderStyle8Component } from '@assets/app/components/resuables/Loader/Loader';

const Page = () => {
  const { formData, fetchPlans, formatBalance, fetchInvestments } = useGlobalState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(Object.keys(formData.userWallet)[0]);
  const [isInvesting, setIsInvesting] = useState(false); // New state for loading

  useEffect(() => {
    // Get the auth token from local or session storage
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (authToken) {
      // Call fetchTotalBalance if authToken exists
      fetchPlans(authToken);
    }
  }, [fetchPlans]); // Empty dependency array ensures it only runs on mount


  const Plans = formData.plans;

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setSelectedCoin(Object.keys(formData.userWallet)[0]);
    setInvestmentAmount('');
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

  const coinValue = formData.userWallet[selectedCoin];
  const equivalentValue = investmentAmount / coinValue;

  const handleSubmit = async (e) => {
    fetchInvestments()
    e.preventDefault();

    if (investmentAmount > 0 && investmentAmount <= coinValue) {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('No token found. Please log in.',  {
          position: "top-right",
          autoClose: 5000,
        });
        return;
      }

      try {
        setIsInvesting(true); // Set loading to true before the request

        const investmentData = {
          investment_plan_name: selectedPlan.name,
          amount: investmentAmount,
          network_name: selectedCoin.toLowerCase().replace(/\s+/g, '-'), // Make the coin lowercase and replace spaces with hyphens
        };

        const response = await axios.post(
          'https://zss.pythonanywhere.com/api/v1/investments/',
          investmentData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(`You have successfully invested $${investmentAmount} in ${selectedCoin} with the ${selectedPlan.name}.`,  {
          position: "top-right",
          autoClose: 5000,
        });
        closeModal();
      } catch (error) {
        console.error('Investment failed:', error);
        toast.error('There was an error processing your investment. Please make sure to take note of the minimum and maximum price for each plan.',  {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setIsInvesting(false); // Set loading to false after the request
      }
    } else {
      toast.error(`Insufficient Funds in your ${selectedCoin} wallet. Try again with a different coin or fund your ZSS wallet.`,  {
        position: "top-right",
        autoClose: 5000,
      });
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
                <li className="text-yellow-600 font-bold text-xl md:text-2xl">{plan.name}</li>
                <li className="text-gray-800 text-4xl md:text-5xl font-extrabold mb-4">{plan.profit_percentage}% Interest</li>
                <li className="text-gray-600 text-lg">
                  <span className="font-semibold">Interval: </span>After {plan.duration_days} days
                </li>
                <li className="text-gray-600 text-lg">
                  <span className="font-semibold">Min: </span>$ {formatBalance(plan.minimum_amount)}
                </li>
                <li className="text-gray-600 text-lg">
                  <span className="font-semibold">Max: </span>$ {formatBalance(plan.maximum_amount)}
                </li>
                <li className="text-yellow-600 text-xl font-bold">Capital Return: {plan.is_active ? 'Yes' : 'No'}</li>
                <button onClick={() => openModal(plan)} className="mt-4 bg-blue-500 w-full text-white rounded-lg px-4 py-2">
                  Invest
                </button>
              </ul>
            </div>
          ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="relative text-slate-800">
            <h2 className="text-lg font-bold mb-4">Invest in {selectedPlan ? selectedPlan.name : ''}</h2>
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
                      {coin.charAt(0).toUpperCase() + coin.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="investmentAmount" className="flex text-gray-700 mb-2 w-full items-center flex-row justify-between">
                  <span>Investment Amount ($):</span>
                  <span className='flex flex-col gap-y-1 text-end'>
                    {/* <span className='font-semibold'>
                      Equivalent value in {selectedCoin}
                    </span> */}
                    {/* {
                      isNaN(equivalentValue) || equivalentValue === Infinity ? 'No funds for selected coin' : (
                        <span>
                          {`${equivalentValue} ${selectedCoin}`}
                        </span>
                      )
                    } */}
                  </span>
                </label>
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
              <button 
                type="submit" 
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
                disabled={isInvesting} // Disable the button during investment processing
              >
                {isInvesting ?(
              <LoaderStyle8Component fill={'#ffffff'}/>
            ) : 'Invest'}
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Page;
