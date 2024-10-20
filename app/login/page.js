'use client';

import React, { useState } from 'react';
import formBg from '../../public/img/formbg.webp';
import { Input } from '../components/resuables/Input/Input';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <main className='w-full h-screen flex items-center justify-center relative'>
      <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: `url(${formBg.src})` }}>
        <div className='bg-black bg-opacity-50 h-full w-full flex items-center justify-center'>
          <section className='w-[80%] mx-auto md:w-[40%] rounded-3xl backdrop-blur-sm h-auto flex flex-col border items-center justify-center p-6'>
            <h1 className='text-white text-3xl font-bold mb-6'>Login</h1>
            <form className='w-full flex flex-col gap-y-5' onSubmit={handleSubmit}>
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
                className="mt-4 px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-500 transition duration-300"
              >
                Login
              </button>
            </form>
            <div className="flex flex-col items-center mt-4">
              <a href="/forgot-password" className="text-yellow-500 hover:underline">Forgot Password?</a>
              <p className="text-gray-300 mt-2">Dont have an account? <Link href="/signup" className="text-yellow-500 hover:underline">Sign Up</Link></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
