'use client'

import React, { useState } from 'react';
import formBg from '../../public/img/formbg.webp';
import { Input } from '../components/resuables/Input/Input';
import Link from 'next/link';

const Page = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
  };

  return (
    <main className='w-full h-screen flex items-center justify-center relative'>
      <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: `url(${formBg.src})` }}>
        <div className='bg-black bg-opacity-50 h-full w-full flex items-center justify-center'>
          <section className='w-[80%] mx-auto md:w-[40%] rounded-3xl backdrop-blur-sm h-[50dvh] flex flex-col items-center justify-center  p-6'>
            <h1 className='text-white text-3xl font-bold mb-6'>Sign Up</h1>
            <form className='w-full flex flex-col gap-y-5' onSubmit={handleSubmit}>
              <Input
                Labelvalue="Username"
                value={username}
                onChange={setUsername}
                width={true}
              />
              <Input 
                Labelvalue="Email"
                value={email}
                onChange={setEmail}
                width={true}
              />
              <Input 
                Labelvalue="Password"
                Password={true}
                value={password}
                onChange={setPassword}
                width={true}
              />
              <button 
                type="submit" 
                className="mt-6 px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-500 transition duration-300">
                Sign Up
              </button>
            </form>
            <p className="text-gray-300 mt-2">Already have an account? <Link href="/login" className="text-yellow-500 hover:underline">Login</Link></p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Page;
