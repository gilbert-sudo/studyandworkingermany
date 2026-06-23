import React from 'react';
import { FileText, BookOpen, UserCheck, Bell } from 'lucide-react';

function NotificationsPage() {
  const notifications = [
    { 
      id: 1, 
      type: 'document',
      title: 'Document Translation Completed', 
      message: 'Your CV and Motivation Letter have been successfully translated to German.', 
      date: '2 hours ago', 
      read: false 
    },
    { 
      id: 2, 
      type: 'course',
      title: 'Language Course Update', 
      message: 'A new B1 intensive course is starting next month. Secure your spot now.', 
      date: '1 day ago', 
      read: true 
    },
    { 
      id: 3, 
      type: 'profile',
      title: 'Profile Reviewed', 
      message: 'Our counselor has reviewed your profile. Please check the next steps in your dashboard.', 
      date: '3 days ago', 
      read: true 
    },
  ];

  const getIcon = (type, read) => {
    const iconClass = `w-5 h-5 sm:w-6 sm:h-6 ${read ? 'text-gray-400 dark:text-gray-500' : 'text-white dark:text-gray-900'}`;
    switch(type) {
      case 'document': return <FileText className={iconClass} />;
      case 'course': return <BookOpen className={iconClass} />;
      case 'profile': return <UserCheck className={iconClass} />;
      default: return <Bell className={iconClass} />;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-neutral-950 relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 sm:mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-neutral-900/50 text-gray-600 dark:text-gray-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-900 dark:bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-900 dark:bg-white"></span>
            </span>
            Updates
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 dark:text-white tracking-tight mb-4">
            Recent <span className="font-semibold">Notifications</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stay updated with your application process and important milestones.
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <button className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium transition-all bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 px-5 py-2 rounded-xl hover:shadow-sm active:scale-95">
            Mark all as read
          </button>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`group relative p-6 sm:p-8 rounded-3xl transition-all duration-300 border ${
                !notif.read 
                  ? 'bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 shadow-sm sm:-translate-y-1 overflow-hidden'
                  : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-neutral-900/50'
              }`}
            >
              {!notif.read && (
                <div className="absolute top-0 left-0 w-1 h-full bg-gray-900 dark:bg-white"></div>
              )}
              
              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    !notif.read 
                      ? 'bg-gray-900 dark:bg-white shadow-md' 
                      : 'bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-400'
                  }`}>
                    {getIcon(notif.type, notif.read)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2 sm:mb-3">
                    <h3 className={`text-lg sm:text-xl font-semibold truncate whitespace-normal ${
                      !notif.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {notif.title}
                    </h3>
                    <span className={`inline-flex items-center self-start sm:self-auto px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider whitespace-nowrap border ${
                      !notif.read 
                        ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white' 
                        : 'bg-transparent text-gray-400 border-gray-200 dark:border-neutral-800'
                    }`}>
                      {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-gray-900 mr-2 animate-pulse"></span>}
                      {notif.date}
                    </span>
                  </div>
                  <p className={`text-sm sm:text-base leading-relaxed ${
                    !notif.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {notif.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
