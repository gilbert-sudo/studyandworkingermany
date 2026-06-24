import React from 'react';
import { CheckCheck, Lock } from 'lucide-react';

function NotificationsPage() {
  const notifications = [
    { 
      id: 1, 
      type: 'system',
      message: 'Your application profile has been securely submitted and locked for review.', 
      sender: 'System Admin',
      date: 'Today at 08:32 AM', 
      read: false 
    },
    { 
      id: 2, 
      type: 'meeting',
      message: 'Your language assessment interview has been scheduled successfully.', 
      sender: 'Sarah Müller',
      date: 'Yesterday at 04:30 PM', 
      read: true 
    },
    { 
      id: 3, 
      type: 'update',
      message: 'Great news! Your B2 German certificate has been officially recognized. 🎉', 
      sender: 'Dr. Klaus Schmidt',
      date: 'Oct 12 at 01:36 PM', 
      read: true 
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-neutral-950 relative overflow-hidden">
      <div className="relative z-10 max-w-[600px] mx-auto px-4 sm:px-6">
        
        {/* Page Header (Kept compact like ApplicationPage) */}
        <div className="mb-8 text-center">
          <h1 className="text-[1.5rem] sm:text-[1.875rem] font-light text-gray-900 dark:text-white tracking-tight mb-2">
            Recent <span className="font-semibold">Notifications</span>
          </h1>
          <p className="text-[0.875rem] sm:text-[1rem] text-gray-500 dark:text-gray-400 max-w-[600px] mx-auto leading-relaxed">
            Stay updated with your application process and important milestones.
          </p>
        </div>

        {/* Notifications Card matching the image perfectly */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-sm overflow-hidden border border-gray-200 dark:border-neutral-800">
          
          {/* Card Header */}
          <div className="flex justify-between items-center px-5 sm:px-8 pt-6 sm:pt-8 pb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              Notifications
            </h2>
            <button className="flex items-center gap-1 sm:gap-2 text-[#00A693] dark:text-[#2dd4bf] font-medium hover:bg-[#00A693]/10 dark:hover:bg-[#2dd4bf]/10 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-[0.85rem] sm:text-[1rem]">
              <CheckCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              Mark as read
            </button>
          </div>

          <div className="flex flex-col">
            {notifications.map((notif, index) => (
              <React.Fragment key={notif.id}>
                <div className="group flex items-start px-5 sm:px-8 py-5 sm:py-6 transition-all duration-200 cursor-pointer hover:bg-[#F4F6F6] dark:hover:bg-neutral-800/80">
                  
                  {/* Teal Dot */}
                  <div className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#00A693] dark:bg-[#2dd4bf] mt-[0.35rem] sm:mt-[0.4rem] mr-4 sm:mr-6 shrink-0 shadow-[0_0_8px_rgba(0,166,147,0.4)] dark:shadow-[0_0_8px_rgba(45,212,191,0.4)] transition-opacity duration-200 ${notif.read ? 'opacity-0' : 'opacity-100'}`} />
                  
                  <div className="grow pr-3 sm:pr-4">
                    <h3 className="font-medium text-[0.95rem] sm:text-[1.05rem] text-gray-900 dark:text-gray-100 group-hover:text-[#00A693] dark:group-hover:text-[#2dd4bf] transition-colors duration-200 mb-1 leading-snug">
                      {notif.message}
                    </h3>
                    <p className="text-gray-500 dark:text-neutral-400 text-[0.85rem] sm:text-[0.9rem]">
                      {notif.sender ? `${notif.sender} • ${notif.date}` : notif.date}
                    </p>
                  </div>
                  
                  <div className="shrink-0 ml-auto flex items-center">
                    {notif.type === 'system' && (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#00A693] dark:bg-[#00A693] flex items-center justify-center">
                        <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    )}
                    {notif.type === 'meeting' && (
                      <img src="https://i.pravatar.cc/150?img=47" alt="Avatar" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-100 dark:border-neutral-800" />
                    )}
                    {notif.type === 'update' && (
                      <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-100 dark:border-neutral-800" />
                    )}
                  </div>
                </div>
                {index < notifications.length - 1 && (
                  <div className="mx-5 sm:mx-8 border-b border-gray-200 dark:border-neutral-800" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Card Footer */}
          <div className="px-5 sm:px-8 pt-4 pb-6 sm:pb-8">
            <span className="text-[#00A693] dark:text-[#2dd4bf] font-medium text-[0.95rem] sm:text-[1.05rem] cursor-pointer hover:underline inline-block">
              View all notifications
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default NotificationsPage;
