import React from 'react';
import { useSelector } from 'react-redux';

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10 border-b border-gray-100 dark:border-gray-700 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">Manage your personal information and preferences.</p>
          </div>
          
          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-brand-red to-brand-gold text-white flex items-center justify-center font-bold text-4xl sm:text-5xl shadow-lg border-4 border-white dark:border-gray-800">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              
              <div className="flex-grow space-y-6 w-full mt-2 md:mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name</label>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium">
                      {user?.name || 'Loading...'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</label>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium">
                      {user?.email || 'Loading...'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Client ID</label>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-mono text-sm">
                      {user?.clientId || 'Loading...'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone Number</label>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium">
                      +1 234 567 8900
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <button className="w-full md:w-auto px-6 py-2.5 bg-brand-red text-white font-medium rounded-xl hover:bg-red-700 transition-colors shadow-md">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
