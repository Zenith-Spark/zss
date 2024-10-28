'use client'
import React, { useState, useEffect } from 'react';
import { useGlobalState } from '@assets/app/GlobalStateProvider';
const NotificationPage = () => {
    const {formData} = useGlobalState()
  const [notifications, setNotifications] = useState([]);
  const notificationsData = formData.notification

  // Simulating data fetch
  useEffect(() => {
    // Simulate a delay for fetching data
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      setNotifications(notificationsData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 w-full md:w-[70%] mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="text-lg font-medium">{notification.title}</h2>
            <p className="">{notification.message}</p>
            <span className="text-sm ">{notification.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
