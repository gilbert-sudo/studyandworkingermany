import React from 'react';

function NotificationsPage() {
  const notifications = [
    { id: 1, title: 'Document Translation Completed', message: 'Your CV and Motivation Letter have been successfully translated to German.', date: '2 hours ago', read: false },
    { id: 2, title: 'Language Course Update', message: 'A new B1 intensive course is starting next month. Secure your spot now.', date: '1 day ago', read: true },
    { id: 3, title: 'Profile Reviewed', message: 'Our counselor has reviewed your profile. Please check the next steps in your dashboard.', date: '3 days ago', read: true },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Stay updated with your process</p>
            </div>
            <button className="text-sm text-brand-red hover:text-red-700 font-medium">Mark all as read</button>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {notifications.map((notif) => (
              <div key={notif.id} className={`p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${!notif.read ? 'bg-red-50/50 dark:bg-red-900/10' : ''}`}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-2.5 h-2.5 rounded-full ${!notif.read ? 'bg-brand-red' : 'bg-transparent'}`}></div>
                  </div>
                  <div>
                    <h3 className={`text-base font-semibold ${!notif.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{notif.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{notif.message}</p>
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 block">{notif.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
