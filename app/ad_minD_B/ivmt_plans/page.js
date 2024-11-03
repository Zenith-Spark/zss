'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PiGreaterThan } from 'react-icons/pi';
import { adminDBSidebar } from '@assets/app/components/resuables/index';

const Plans = () => {
  const [plans, setPlans] = useState([]); // State to hold existing plans
  const [formType, setFormType] = useState('create'); // Track whether we are creating or editing
  const [selectedPlan, setSelectedPlan] = useState(null); // State for the plan being edited
  const [newPlan, setNewPlan] = useState({ // State to hold new plan input
    name: '',
    profit_percentage: '',
    duration_days: '',
    minimum_amount: '',
    maximum_amount: '',
    is_active: true,
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
        const response = await axios.get('https://zss.pythonanywhere.com/api/v1/get-plans/', {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
  
    if (!token) {
      setError('No authentication token found');
      return;
    }
  
    try {
      console.log('Submitting plan:', newPlan); // Debugging: Log the new plan data
  
      if (formType === 'create') {
        const response = await axios.post('https://zss.pythonanywhere.com/api/v1/admin/create-plans/', newPlan, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNewPlan({
          name: '',
          profit_percentage: '',
          duration_days: '',
          minimum_amount: '',
          maximum_amount: '',
          is_active: true,
        });
        setPlans((prev) => [...prev, response.data]); // Update plans with new plan
      } else if (formType === 'edit' && selectedPlan) {
        console.log('Editing plan with ID:', selectedPlan.id); // Log the ID being used
        const response = await axios.put(`https://zss.pythonanywhere.com/api/v1/admin/update-investments/${selectedPlan.id}/`, newPlan, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlans((prev) => prev.map(plan => (plan.id === selectedPlan.id ? response.data : plan)));
        setFormType('create');
        setSelectedPlan(null);
        setNewPlan({ name: '', profit_percentage: '', duration_days: '', minimum_amount: '', maximum_amount: '', is_active: true });
      }
    } catch (error) {
      console.error('Error saving plan:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        setError('Failed to save plan: ' + (error.response.data.error || error.message));
      } else {
        setError('Failed to save plan: ' + error.message);
      }
    }
  };
  
  
  // Function to prepare for editing a plan
  const handleEdit = (plan) => {
    setFormType('edit');
    setSelectedPlan(plan);
    setNewPlan(plan); // Pre-fill form with plan details
  };

  return (
    <div className='py-16 w-full h-auto'>
      <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-6 pt-4">
        <span>{adminDBSidebar[3].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{adminDBSidebar[3].name}</span>
      </p>

      <h2 className="text-2xl font-bold text-center mb-4">Manage Plans</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

      <section className="shadow-md p-6 mb-6 max-w-md mx-auto rounded-lg"> {/* Adjusted width */}
  <h3 className="text-xl font-semibold mb-4">{formType === 'create' ? 'Create New Plan' : 'Edit Plan'}</h3>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="mb-4">
      <label className="block" htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={newPlan.name}
        onChange={handleChange}
        required
        className="border-b bg-transparent focus:border-blue-600 p-3 w-full max-w-xs focus:outline-none  transition duration-200 ease-in-out" // Added max width and transition
      />
    </div>
    <div className="mb-4">
      <label className="block" htmlFor="profit_percentage">Profit Percentage</label>
      <input
        type="text"
        name="profit_percentage"
        id="profit_percentage"
        value={newPlan.profit_percentage}
        onChange={handleChange}
        required
        className="border-b bg-transparent focus:border-blue-600 p-3 w-full max-w-xs focus:outline-none transition duration-200 ease-in-out"
      />
    </div>
    <div className="mb-4">
      <label className="block" htmlFor="duration_days">Duration (Days)</label>
      <input
        type="number"
        name="duration_days"
        id="duration_days"
        value={newPlan.duration_days}
        onChange={handleChange}
        required
        className="border-b bg-transparent focus:border-blue-600 p-3 w-full max-w-xs focus:outline-none transition duration-200 ease-in-out"
      />
    </div>
    <div className="mb-4">
      <label className="block" htmlFor="minimum_amount">Minimum Amount</label>
      <input
        type="text"
        name="minimum_amount"
        id="minimum_amount"
        value={newPlan.minimum_amount}
        onChange={handleChange}
        required
        className="border-b bg-transparent focus:border-blue-600 p-3 w-full max-w-xs focus:outline-none transition duration-200 ease-in-out"
      />
    </div>
    <div className="mb-4">
      <label className="block" htmlFor="maximum_amount">Maximum Amount</label>
      <input
        type="text"
        name="maximum_amount"
        id="maximum_amount"
        value={newPlan.maximum_amount}
        onChange={handleChange}
        required
        className="border-b bg-transparent focus:border-blue-600 p-3 w-full max-w-xs focus:outline-none transition duration-200 ease-in-out"
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
    <button type="submit" className="bg-blue-500 rounded-lg text-white px-6 py-3 hover:bg-blue-600 transition duration-200">{formType === 'create' ? 'Create Plan' : 'Update Plan'}</button>
  </form>
</section>


        <h3 className="text-xl font-semibold mb-4 w-full">Existing Plans</h3>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.length === 0 ? (
          <p className="">No plans available.</p>
        ) : (
          plans.map((plan) => (
            <div key={plan.id} className=" shadow-md p-6 rounded-lg">
              <h4 className="text-lg font-bold">{plan.name}</h4>
              <p><strong>Profit %:</strong> {plan.profit_percentage}</p>
              <p><strong>Duration:</strong> {plan.duration_days} days</p>
              <p><strong>Min Amount:</strong> {plan.minimum_amount}</p>
              <p><strong>Max Amount:</strong> {plan.maximum_amount}</p>
              <p><strong>Status:</strong> {plan.is_active ? 'Active' : 'Inactive'}</p>
              <button
                onClick={() => handleEdit(plan)}
                className="mt-4 bg-blue-500 px-4 py-2 hover:bg-blue-600 transition duration-200 rounded-lg text-white"
              >
                Edit
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Plans;
