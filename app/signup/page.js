'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import formBg from '../../public/img/formbg.webp';
import { Input } from '../components/resuables/Input/Input';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../components/resuables/Loader/Loader';

const SignUpPage = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear any existing auth tokens on page load
  useEffect(() => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://zss.pythonanywhere.com/api/v1/register/', {
        email_address: email,
        password: password,
        full_name: fullName,
      });

      if (response.status === 201 || response.status === 200) {
        sessionStorage.setItem('authToken', response.data.token);
        toast.success('Welcome aboard! Now login.', { position: "top-right", autoClose: 5000 });
        
        setFullName('');
        setEmail('');
        setPassword('');

        setTimeout(() => {
          setLoading(false);
          router.push('/login');
        }, 500);
      }
    } catch (err) {
      setLoading(false);

      const errorMsg = err.response?.data
        ? err.response.data.full_name || err.response.data.email_address || err.response.data.password || 'Please check your Internet and try again.'
        : 'An error occurred. Please check your Internet and try again.';
      toast.error(`An error occurred. ${errorMsg}`, { position: "top-right", autoClose: 5000 });
      
      setFullName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="w-full h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${formBg.src})` }}>
          <div className="bg-black bg-opacity-50 h-full w-full flex items-center justify-center">
            <section className="w-[80%] md:w-[40%] lg:w-[30%] rounded-3xl backdrop-blur-sm h-auto border flex flex-col items-center justify-center p-6">
              <h1 className="text-white text-3xl font-bold mb-6">Sign Up</h1>
              <form className="w-full flex flex-col gap-y-5" onSubmit={handleSubmit}>
                <Input
                  Labelvalue="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  width={true}
                />
                <Input
                  Labelvalue="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  width={true}
                  Email={true}
                />
                <Input
                  Labelvalue="Password"
                  Password={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  width={true}
                />
                <button
                  type="submit"
                  className="mt-6 px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-500 transition duration-300 text-center flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? <Loader fill="#ffffff" /> : 'Sign Up'}
                </button>
              </form>
              <p className="text-gray-300 mt-2">
                Already have an account? <Link href="/login" className="text-yellow-500 hover:underline">Login</Link>
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUpPage;
