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

const Page = () => {
  const router = useRouter();
  const [full_name, setFull_name] = useState('');
  const [email_address, setEmail_address] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading
  const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

    useEffect(()=>{
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
    }, [])
    useEffect(()=>{
     console.log(authToken);
     
    }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted
    
    
    try {
      const response = await axios.post('https://zss.pythonanywhere.com/api/v1/register/', {
        "email_address": email_address,
        "password": password,
        "full_name": full_name,
      });
      if (response.status === 201 || response.status === 200) {
        const token = response.data.token;
        sessionStorage.setItem('authToken', token);
        toast.success('Welcome aboard! Now login.', { position: "top-right", autoClose: 3000 });
        
        setTimeout(() => {
          setLoading(false); // Stop loading when navigation starts
          router.push('/login');
        }, 500);
      }
    } catch (err) {
      setLoading(false); // Stop loading on error
      if (err.response && err.response.data) {
        toast.error(
          'An error occurred. ' + (err.response.data.full_name || err.response.data.email_address || err.response.data.password || 'Please check your Internet and try again.'),
          { position: "top-right", autoClose: 3000 }
        );
        console.log(authToken);
        
      } else {
        toast.error('An error occurred. Please check your Internet and try again.', { position: "top-right", autoClose: 3000 });
        console.log(authToken);
      }
    }
  };

  return (
    <>
      <ToastContainer /> {/* Add ToastContainer for toast notifications */}
      <main className='w-full h-screen flex items-center justify-center relative'>
        <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: `url(${formBg.src})` }}>
          <div className='bg-black bg-opacity-50 h-full w-full flex items-center justify-center'>
            <section className='w-[80%] md:w-[40%] lg:w-[30%] rounded-3xl backdrop-blur-sm h-auto border flex flex-col items-center justify-center p-6'>
              <h1 className='text-white text-3xl font-bold mb-6'>Sign Up</h1>
              <form className='w-full flex flex-col gap-y-5' onSubmit={handleSubmit}>
                <Input
                  Labelvalue="Full Name"
                  value={full_name}
                  onChange={(e) => setFull_name(e.target.value)}
                  width={true}
                />
                <Input
                  Labelvalue="Email Address"
                  value={email_address}
                  onChange={(e) => setEmail_address(e.target.value)}
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
                  disabled={loading} // Disable button while loading
                >
                  {loading ? <Loader fill="#ffffff" /> : 'Sign Up'} {/* Show loader or text */}
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

export default Page;
