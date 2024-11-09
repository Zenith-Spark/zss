'use client'
import { useGlobalState } from '@assets/app/GlobalStateProvider';

const NotificationPage = () => {
  const { formData } = useGlobalState();
  const notificationsData = formData.adminNotification || []; // Ensure notificationsData is always an array

  return (
    <div className="p-6 w-full md:w-[70%] mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
      <div className="space-y-4">
        {notificationsData.length > 0 ? (
          notificationsData.map((notification) => (
            <div
              key={notification.id}
              className="p-4 rounded-lg shadow-md border border-gray-200 flex flex-col gap-3"
            >
              <p className="">{notification.message}</p>
              <span className='text-sm ml-2 text-right font-bold'>
                {notification.created_at
                  ? new Date(notification.created_at).toLocaleString()
                  : 'Date not available'}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center font-semibold">You have no new notifications</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
