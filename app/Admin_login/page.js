'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import formBg from '../../public/img/formbg.webp';
import { Input } from '../components/resuables/Input/Input';
import Link from 'next/link';
import { useGlobalState } from '../GlobalStateProvider';

const AdminLoginPage = () => {
  const { formData, setFormData } = useGlobalState();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://zss.pythonanywhere.com/api/v1/login/', {
        "email_address": email,
        "password": password,
      });

      if (response.status === 200 || response.status === 201) {
        const token = response.data.access; // Adjust based on actual response structure

        // Save the token based on "Remember Me" selection
        if (rememberMe) {
          localStorage.setItem('AdminAuthToken', token);
        } else {
          sessionStorage.setItem('AdminAuthToken', token);
        }

        // Optionally store user data in global state
        setFormData((prevState) => ({
          ...prevState,
          userId: response.data.user.id, // Assuming the response has user ID
          fullName: response.data.user.full_name, // Assuming the response has user full name
          email: email,
          token: token, // Store token in global state for easy access
        }));

        setSuccess('Welcome Back');

        // Redirect after a short delay to ensure state update completes
        setTimeout(() => router.push('/ad_minD_B'), 500);

        console.log('Token:', token);
      } else {
        setError('Login failed. Please try again.');
      }

    } catch (err) {
      if (err.response && err.response.data) {
        setError('An error occurred. ' + (err.response.data.email_address || err.response.data.password || 'Please check your Internet and try again.'));
      } else {
        setError('An error occurred. Please check your Internet and try again.');
      }
    }
  };

  return (
    <main className='w-full h-screen flex items-center justify-center relative'>
      <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: `url(${formBg.src})` }}>
        <div className='bg-black bg-opacity-50 h-full w-full flex items-center justify-center'>
          <section className='w-[80%] mx-auto md:w-[40%] lg:w-[30%] rounded-3xl backdrop-blur-sm h-auto border flex flex-col items-center justify-center p-6'>
            <h1 className='text-white text-3xl font-bold mb-6'>Login</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form className='w-full flex flex-col gap-y-5' onSubmit={handleSubmit}>
              <Input
                Labelvalue="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                width={true}
              />
              <Input
                Labelvalue="Password"
                Password={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                width={true}
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="accent-yellow-600"
                />
                <label htmlFor="rememberMe" className="ml-2 text-gray-300">Remember Me</label>
              </div>
              <button
                type="submit"
                className="mt-4 px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-500 transition duration-300 text-center"
              >
                Login
              </button>
            </form>
            <div className="flex flex-col items-center mt-4">
              <a href="/forgot-password" className="text-yellow-500 hover:underline">Forgot Password?</a>
              <p className="text-gray-300 mt-2">Don’t have an account? <Link href="/signup" className="text-yellow-500 hover:underline">Sign Up</Link></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AdminLoginPage;
