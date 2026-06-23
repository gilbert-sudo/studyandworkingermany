import React from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, Hash, Phone, Edit2 } from 'lucide-react';

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);

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
            Account
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 dark:text-white tracking-tight mb-4">
            User <span className="font-semibold">Profile</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Manage your personal information and application preferences.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-[2rem] border border-gray-200 dark:border-neutral-800 shadow-sm overflow-hidden">
          
          <div className="p-6 sm:p-10">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
              
              {/* Avatar Section */}
              <div className="flex-shrink-0 relative group">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white flex items-center justify-center font-semibold text-5xl sm:text-6xl border border-gray-200 dark:border-neutral-700 transition-all duration-300">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-gray-900 dark:bg-white rounded-full border-2 border-white dark:border-neutral-900 shadow-md flex items-center justify-center text-white dark:text-gray-900 hover:scale-110 transition-all">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              
              {/* Info Section */}
              <div className="flex-grow w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  
                  {/* Field */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                      <User className="w-3.5 h-3.5" /> Full Name
                    </label>
                    <div className="p-4 bg-transparent rounded-none border-b border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white font-medium group-hover:border-gray-900 dark:group-hover:border-white transition-colors">
                      {user?.name || 'Loading...'}
                    </div>
                  </div>

                  {/* Field */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                      <Mail className="w-3.5 h-3.5" /> Email Address
                    </label>
                    <div className="p-4 bg-transparent rounded-none border-b border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white font-medium group-hover:border-gray-900 dark:group-hover:border-white transition-colors break-all">
                      {user?.email || 'Loading...'}
                    </div>
                  </div>

                  {/* Field */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                      <Hash className="w-3.5 h-3.5" /> Client ID
                    </label>
                    <div className="p-4 bg-transparent rounded-none border-b border-gray-200 dark:border-neutral-800 text-gray-500 dark:text-gray-400 font-mono text-sm group-hover:border-gray-900 dark:group-hover:border-white transition-colors">
                      {user?.clientId || 'Loading...'}
                    </div>
                  </div>

                  {/* Field */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                      <Phone className="w-3.5 h-3.5" /> Phone Number
                    </label>
                    <div className="p-4 bg-transparent rounded-none border-b border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white font-medium group-hover:border-gray-900 dark:group-hover:border-white transition-colors">
                      +1 234 567 8900
                    </div>
                  </div>

                </div>
                
                <div className="pt-10 mt-8 flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-black dark:hover:bg-gray-100 transition-all shadow-sm active:scale-95 text-sm sm:text-base">
                    Save Changes
                  </button>
                  <button className="px-8 py-3.5 bg-transparent text-gray-700 dark:text-gray-300 font-semibold rounded-xl border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all active:scale-95 text-sm sm:text-base">
                    Cancel
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
