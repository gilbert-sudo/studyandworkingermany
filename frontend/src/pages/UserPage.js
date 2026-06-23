import React from 'react';
import '../App.css';

function UserPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 border-b border-gray-100 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">User Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back! Here is an overview of your application process.</p>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile Completion Card */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Profile Completion</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
                  <div className="bg-brand-red h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">45% Complete</p>
              </div>

              {/* Next Steps Card */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 md:col-span-2">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Next Steps</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">Complete initial consultation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">Upload German language certificate (B1/B2)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mt-0.5"></div>
                    <span className="text-gray-500 dark:text-gray-500">Submit translated curriculum vitae</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
