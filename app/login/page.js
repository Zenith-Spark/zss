'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import formBg from '../../public/img/formbg.webp';
import { Input } from '../components/resuables/Input/Input';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../components/resuables/Loader/Loader';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://zss.pythonanywhere.com/api/v1/login/', {
        email_address: email,
        password: password,
      });

      if (response.status === 200 || response.status === 201) {
        const token = response.data.access;

        // Save token in local or session storage based on "Remember Me" selection
        rememberMe ? localStorage.setItem('authToken', token) : sessionStorage.setItem('authToken', token);

        toast.success('Welcome!', { position: "top-right", autoClose: 5000 });
        setEmail('');
        setPassword('');

        setTimeout(() => {
          setLoading(false);
          router.push('/usr');
        }, 500);
      } else {
        toast.error('Login failed. Please try again.', { position: "top-right", autoClose: 5000 });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response
        ? err.response.status === 401
          ? 'Incorrect password. Please try again.'
          : `An error occurred. ${err.response.data.email_address || err.response.data.password || 'Please check your Internet and try again.'}`
        : 'An error occurred. Please check your Internet and try again.';
      toast.error(errorMsg, { position: "top-right", autoClose: 5000 });
    }
  };

  const handleForgottenPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://zss.pythonanywhere.com/api/v1/forgot-password/', {
        email_address: email,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('A new password has been sent to your email. Please log in with the new password.', {
          position: "top-right",
          autoClose: 5000,
        });
        setEmail('');
        setPassword('');
      } else {
        toast.error('Password reset failed. Please try again.', {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (err) {
      const errorMsg = err.response
        ? err.response.status === 404
          ? 'Email not found. Please check and try again.'
          : `An error occurred. ${err.response.data.detail || 'Please try again later.'}`
        : 'Network error. Please check your connection and try again.';
      toast.error(errorMsg, { position: "top-right", autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="w-full h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${formBg.src})` }}>
          <div className="bg-black bg-opacity-50 h-full w-full flex items-center justify-center">
            <section className="w-[80%] mx-auto md:w-[40%] lg:w-[30%] rounded-3xl backdrop-blur-sm h-auto border flex flex-col items-center justify-center p-6">
              <h1 className="text-white text-3xl font-bold mb-6">Login</h1>
              <form className="w-full flex flex-col gap-y-5" onSubmit={handleSubmit}>
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
              </form>
              <div className="flex flex-col items-center mt-4">
                <button
                  onClick={handleForgottenPassword}
                  className="text-yellow-500 hover:underline mt-2"
                  disabled={loading}
                >
                  Forgot Password?
                </button>
                <p className="text-gray-300 mt-2">
                  Don&apos;t have an account? <Link href="/signup" className="text-yellow-500 hover:underline">Sign Up</Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
