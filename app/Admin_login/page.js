'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import formBg from '../../public/img/formbg.webp';
import { Input } from '../components/resuables/Input/Input';
import { useGlobalState } from '../GlobalStateProvider';
import { Loader } from '../components/resuables/Loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLoginPage = () => {
  const { formData, setFormData } = useGlobalState();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('https://zss.pythonanywhere.com/api/v1/login/', {
        email_address: email,
        password: password,
      });

      if (response.status === 200 || response.status === 201) {
        const token = response.data.access;

        // Save the token based on "Remember Me" selection
        if (rememberMe) {
          localStorage.setItem('AdminAuthToken', token);
        } else {
          sessionStorage.setItem('AdminAuthToken', token);
        }

        toast.success('Welcome Back', { position: "top-right", autoClose: 5000 });

        // Redirect after a short delay to ensure state update completes
        setTimeout(() => router.push('/ad_minD_B'), 500);

      } else {
        toast.error('Login failed. Please try again.', { position: "top-right", autoClose: 5000 });
      }

    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(
          'An error occurred. ' + (err.response.data.email_address || err.response.data.password || 'Please check your Internet and try again.'),
          { position: "top-right", autoClose: 5000 }
        );
      } else {
        toast.error('An error occurred. Please check your Internet and try again.', { position: "top-right", autoClose: 5000 });
      }
    } finally {
      setLoading(false); // Stop loading
      setEmail('');
      setPassword(''); // Reset form fields
    }
  };

  const handleSubmitForgottenPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('https://zss.pythonanywhere.com/api/v1/forgot-password/', {
        email_address: email,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('A new password has been sent to your email. Please log in with the new password.', {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.error('Password reset failed. Please try again.', {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          toast.error('Email not found. Please check and try again.', {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          toast.error(`An error occurred. ${err.response.data.detail || 'Please try again later.'}`, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } else {
        toast.error('Network error. Please check your connection and try again.', {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } finally {
      setLoading(false); // Stop loading
      setEmail(''); // Reset form field
    }
  };

  return (
    <>
      <main className='w-full h-screen flex items-center justify-center relative'>
        <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: `url(${formBg.src})` }}>
          <div className='bg-black bg-opacity-50 h-full w-full flex items-center justify-center'>
            <section className='w-[80%] mx-auto md:w-[40%] lg:w-[30%] rounded-3xl backdrop-blur-sm h-auto border flex flex-col items-center justify-center p-6'>
              <h1 className='text-white text-3xl font-bold mb-6'>Admin Login</h1>
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
                  className="mt-4 px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-500 transition duration-300 text-center flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? <Loader fill="#ffffff" /> : 'Login'}
                </button>
                <button
                  onClick={handleSubmitForgottenPassword}
                  className="text-yellow-500 hover:underline mt-2"
                  disabled={loading}
                >
                  Forgot Password?
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminLoginPage;
