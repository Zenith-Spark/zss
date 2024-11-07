'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PiGreaterThan } from 'react-icons/pi';
import { adminDBSidebar } from '@assets/app/components/resuables/index';
import { toast, ToastContainer } from 'react-toastify';
import { LoaderStyle8Component } from '@assets/app/components/resuables/Loader/Loader';


const Plans = () => {
  const [loading, setLoading] = useState(false); // Loading state for form submit
  const [loadingPlan, setLoadingPlan] = useState(false); // Loading state for fetching plans
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

  // Fetch existing plans when the component mounts
  useEffect(() => {
    setLoadingPlan(true);
    const fetchPlans = async () => {
      const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
      if (!token) {
        toast.error('No authentication token found', { position: "top-right", autoClose: 3000 });
        setLoadingPlan(false);
        return;
      }

      try {
        const response = await axios.get('https://zss.pythonanywhere.com/api/v1/get-plans/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlans(response.data);
        toast.success('Plans fetched successfully.', { position: "top-right", autoClose: 3000 });
        setLoadingPlan(false);
      } catch (error) {
        console.error('Error fetching plans:', error);
        toast.error('Failed to fetch plans: ' + (error.response?.data?.message || error.message), { position: "top-right", autoClose: 3000 });
        setLoadingPlan(false);
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
    setLoading(true); // Set loading state to true for button
    const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
  
    if (!token) {
      toast.error('No authentication token found', { position: "top-right", autoClose: 3000 });
      setLoading(false);
      return;
    }
  
    try {
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
        setPlans((prev) => [...prev, response.data]);
        toast.success('New plan created successfully.', { position: "top-right", autoClose: 3000 });
      } else if (formType === 'edit' && selectedPlan) {
        const response = await axios.put(`https://zss.pythonanywhere.com/api/v1/admin/update-plans/${encodeURIComponent(selectedPlan.name)}/`, newPlan, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlans((prev) =>
          prev.map((plan) =>
            plan.name === selectedPlan.name ? response.data : plan
          )
        );
        setFormType('create');
        setSelectedPlan(null);
        setNewPlan({
          name: '',
          profit_percentage: '',
          duration_days: '',
          minimum_amount: '',
          maximum_amount: '',
          is_active: true,
        });
        toast.success('Plan updated successfully.', { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      console.error('Error saving plan:', error);
      toast.error('Failed to save plan: ' + (error.response?.data?.message || error.message), { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false); // Set loading state back to false after request completes
    }
  };

  // Function to prepare for editing a plan
  const handleEdit = (plan) => {
    setFormType('edit');
    setSelectedPlan(plan);
    setNewPlan({ ...plan });
    
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Adds smooth scrolling
    });
  };

  return (
   <>
   <ToastContainer/>
    <div className='py-16 w-full h-auto'>
      <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-6 pt-4">
        <span>{adminDBSidebar[3].icons}</span>
        <span><PiGreaterThan /></span>
        <span>{adminDBSidebar[3].name}</span>
      </p>

      <h2 className="text-2xl font-bold text-center mb-4">Manage Plans</h2>

      <section className="shadow-md p-6 mb-6 max-w-md mx-auto rounded-lg">
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
              pattern="^[A-Za-z ]*$"
              title="Only letters and spaces are allowed."
              className="border-b bg-transparent focus:border-blue-600 p-3 w-full max-w-xs focus:outline-none transition duration-200 ease-in-out"
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
              pattern="^[0-9]*$"
              inputMode="numeric"
              title="Only numeric values from 0-9  are allowed."
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
              pattern="^[0-9]*$"
              inputMode="numeric"
              title="Only numeric values from 0-9 are allowed."
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
              pattern="^[0-9]*$"
              inputMode="numeric"
              title="Only numeric values from 0-9  are allowed."
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
              pattern="^[0-9]*$"
              inputMode="numeric"
              title="Only numeric values from 0-9 are allowed."
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
          <button type="submit" className="bg-blue-500 rounded-lg text-white px-6 py-3 hover:bg-blue-600 transition duration-200" disabled={loading}>
            {loading ? (formType === 'create' ? (
              <LoaderStyle8Component fill={'#ffffff'}/>
            ) : (
              <LoaderStyle8Component fill={'#ffffff'}/>
            )) : (formType === 'create' ? 'Create Plan' : 'Update Plan')}
          </button>
        </form>
      </section>

      <h3 className="text-xl font-semibold mb-4 w-full">Existing Plans</h3>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.length === 0 ? (
          <p>No plans available.</p>
        ) : (
          plans.map((plan) => (
            <div key={plan.id} className="shadow-md p-6 rounded-lg">
              <h4 className="text-lg font-bold">{plan.name}</h4>
              <p><strong>Profit %:</strong> {plan.profit_percentage}</p>
              <p><strong>Duration:</strong> {plan.duration_days} days</p>
              <p><strong>Min Amount:</strong> {plan.minimum_amount}</p>
              <p><strong>Max Amount:</strong> {plan.maximum_amount}</p>
              <p><strong>Status:</strong> {plan.is_active ? 'Active' : 'Inactive'}</p>
              <button onClick={() => handleEdit(plan)} className="text-blue-500 hover:underline mt-4">Edit</button>
            </div>
          ))
        )}
      </section>
    </div>
   </>
  );
};

export default Plans;
