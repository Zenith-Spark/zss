'use client';
import { useGlobalState } from '@assets/app/GlobalStateProvider';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { IoNotifications } from 'react-icons/io5';
import { toast } from 'react-toastify';

const Notification = () => {
  const { formData, fetchAdminNotifications } = useGlobalState();
  const notificationsData = formData.adminNotification || []; // Access notifications from formData
  const [notification, setNotification] = useState(false);
  const notificationRef = useRef(null);

  const toggleNotification = () => {
    const authToken = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');
    if (!authToken) {
      toast.error('No authentication token found');
      return;
    }
    fetchAdminNotifications();
    setNotification(!notification);
  };

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setNotification(false);
    }
  };

  useEffect(() => {
    if (notification) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notification]);

  return (
    <div className='relative' ref={notificationRef}>
      <p
        className='absolute right-5 top-5 flex items-center font-bold gap-2 cursor-pointer'
        onClick={toggleNotification}
      >
        <span className='text-xs'>Notification</span>
        <span className='text-base md:text-lg'><IoNotifications /></span>
        <span className='w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0'></span>
      </p>

      <section
        className={`border rounded-xl w-[80%] md:w-1/2 lg:w-1/4 h-44 flex flex-col gap-y-2 backdrop-blur-3xl px-2 absolute right-0 top-14 ${notification ? 'translate-x-0' : 'translate-x-full'} transition duration-500`}
      >
        <div className='w-full h-full overflow-y-auto rounded-lg shadow-lg flex flex-col items-start p-3 scrollbar-thin'>
          {notificationsData.length > 0 ? (
            notificationsData.map((notif) => (
              <Link 
                href={'/usr/notification'} // Adjust the link as needed
                key={notif.id}
              >
                <span className={`w-full py-2 px-3 mb-2 cursor-pointer hover:border-b transition-colors duration-200 flex items-start justify-between ${notif.is_read ? 'text-gray-500' : 'font-medium'}`}>
                  <p className='text-sm overflow-hidden text-ellipsis whitespace-nowrap max-w-full' title={notif.message}>
                    {notif.message}
                  </p>
                </span>
              </Link>
            ))
          ) : (
            <p className='text-center font-bold'>
              You have no new notifications
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Notification;
