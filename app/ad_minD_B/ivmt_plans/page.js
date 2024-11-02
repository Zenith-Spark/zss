'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PiGreaterThan } from 'react-icons/pi';
import { adminDBSidebar } from '@assets/app/components/resuables/index';

const Plans = () => {
  const [plans, setPlans] = useState([]); // State to hold existing plans
  const [newPlan, setNewPlan] = useState({ // State to hold new plan input
    name: '',
    profit_percentage: '',
    duration_days: '',
    minimum_amount: '',
    maximum_amount: '',
    is_active: true
  });
  const [error, setError] = useState(null); // State for error messages

  // Fetch existing plans when the component mounts
  useEffect(() => {
    const fetchPlans = async () => {
      const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      try {
        const response = await axios.get('https://zss.pythonanywhere.com/api/v1/admin/get-plans/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlans(response.data); // Assuming response.data contains an array of plans
      } catch (error) {
        console.error('Error fetching plans:', error);
        setError('Failed to fetch plans: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchPlans();
  }, []);

  // Function to handle input changes for the new plan form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPlan((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Function to handle form submission for creating a new plan
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');

    if (!token) {
      setError('No authentication token found');
      return;
    }

    try {
      const response = await axios.post('https://zss.pythonanywhere.com/api/v1/admin/create-plans/', newPlan, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally, you can reset the form and refetch plans
      setNewPlan({
        name: '',
        profit_percentage: '',
        duration_days: '',
        minimum_amount: '',
        maximum_amount: '',
        is_active: true
      });
      setPlans((prev) => [...prev, response.data]); // Add the new plan to the list
    } catch (error) {
      console.error('Error creating plan:', error);
      setError('Failed to create plan: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className='pt-16 w-full h-auto'>
      <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-6 pt-4">
        <span>{adminDBSidebar[3].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{adminDBSidebar[3].name}</span>
      </p>

      <h2 className="text-2xl font-bold text-center mb-4">Manage Plans</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

      <section className="shadow-md p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Create New Plan</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={newPlan.name}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="profit_percentage">Profit Percentage</label>
            <input
              type="text"
              name="profit_percentage"
              id="profit_percentage"
              value={newPlan.profit_percentage}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="duration_days">Duration (Days)</label>
            <input
              type="number"
              name="duration_days"
              id="duration_days"
              value={newPlan.duration_days}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="minimum_amount">Minimum Amount</label>
            <input
              type="text"
              name="minimum_amount"
              id="minimum_amount"
              value={newPlan.minimum_amount}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="maximum_amount">Maximum Amount</label>
            <input
              type="text"
              name="maximum_amount"
              id="maximum_amount"
              value={newPlan.maximum_amount}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="is_active"
                checked={newPlan.is_active}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Is Active</span>
            </label>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Plan</button>
        </form>
      </section>

      <section className="shadow-md p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Existing Plans</h3>
        {plans.length === 0 ? (
          <p className="text-gray-500">No plans available.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Profit %</th>
                <th className="px-4 py-2 border">Duration (Days)</th>
                <th className="px-4 py-2 border">Min Amount</th>
                <th className="px-4 py-2 border">Max Amount</th>
                <th className="px-4 py-2 border">Active</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id}>
                  <td className="px-4 py-2 border">{plan.name}</td>
                  <td className="px-4 py-2 border">{plan.profit_percentage}</td>
                  <td className="px-4 py-2 border">{plan.duration_days}</td>
                  <td className="px-4 py-2 border">{plan.minimum_amount}</td>
                  <td className="px-4 py-2 border">{plan.maximum_amount}</td>
                  <td className="px-4 py-2 border">{plan.is_active ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default Plans;
