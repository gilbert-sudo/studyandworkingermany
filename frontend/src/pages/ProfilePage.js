import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, Hash, Phone, Edit2, Save } from 'lucide-react';

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-neutral-950 relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-white tracking-tight mb-2">
            User <span className="font-semibold">Profile</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
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
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#00A693] dark:bg-[#2dd4bf] rounded-full border-2 border-white dark:border-neutral-900 shadow-md flex items-center justify-center text-white dark:text-neutral-900 hover:scale-110 transition-all">
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
                    <div className="p-4 bg-transparent rounded-none border-b border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white font-medium group-hover:border-[#00A693] dark:group-hover:border-[#2dd4bf] transition-colors">
                      {user?.name || 'Loading...'}
                    </div>
                  </div>

                  {/* Field */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                      <Mail className="w-3.5 h-3.5" /> Email Address
                    </label>
                    <div className="p-4 bg-transparent rounded-none border-b border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white font-medium group-hover:border-[#00A693] dark:group-hover:border-[#2dd4bf] transition-colors break-all">
                      {user?.email || 'Loading...'}
                    </div>
                  </div>

                  {/* Field */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                      <Hash className="w-3.5 h-3.5" /> Client ID
                    </label>
                    <div className="p-4 bg-transparent rounded-none border-b border-gray-200 dark:border-neutral-800 text-gray-500 dark:text-gray-400 font-mono text-sm group-hover:border-[#00A693] dark:group-hover:border-[#2dd4bf] transition-colors">
                      {user?.clientId || 'Loading...'}
                    </div>
                  </div>

                  {/* Field */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                      <Phone className="w-3.5 h-3.5" /> Phone Number
                    </label>
                    <div className="p-4 bg-transparent rounded-none border-b border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white font-medium group-hover:border-[#00A693] dark:group-hover:border-[#2dd4bf] transition-colors">
                      +1 234 567 8900
                    </div>
                  </div>

                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Floating Submit Bar */}
        <div className="fixed bottom-[5.5rem] sm:bottom-8 left-0 right-0 z-50 flex justify-center w-full px-2 sm:px-0 pointer-events-none">
          <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-2xl p-2 sm:p-3 rounded-full border border-gray-200/50 dark:border-neutral-800/50 shadow-2xl shadow-gray-900/10 dark:shadow-black/40 flex items-center gap-3 sm:gap-6 pr-2 sm:pr-3 w-full sm:w-auto max-w-full sm:max-w-2xl justify-between sm:justify-start pointer-events-auto">
            <div className="pl-4 sm:pl-6 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">Ready to save?</p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate hidden sm:block">All changes will be securely saved.</p>
            </div>
            <button 
              type="button" 
              disabled={isSubmitting}
              className="group relative flex justify-center items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-[#00A693] dark:bg-[#2dd4bf] text-white dark:text-neutral-900 rounded-full font-semibold text-sm sm:text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden shrink-0 whitespace-nowrap"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 dark:via-black/20 to-transparent z-0"></div>
              
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 dark:border-gray-900/30 border-t-white dark:border-t-gray-900 rounded-full animate-spin relative z-10"></span>
                  <span className="relative z-10">Processing...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Save Changes</span>
                  <div className="bg-white/10 dark:bg-black/5 p-1 sm:p-1.5 rounded-full group-hover:rotate-12 transition-transform duration-300 relative z-10">
                    <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
        {/* Mobile spacer to ensure form content isn't hidden behind the fixed bar */}
        <div className="h-32 sm:h-20"></div>

      </div>
    </div>
  );
}

export default ProfilePage;
