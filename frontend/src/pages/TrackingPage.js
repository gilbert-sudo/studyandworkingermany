import React from 'react';

function TrackingPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 border-b border-gray-100 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Application Tracking</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor the progress of your university and visa applications.</p>
          </div>
          <div className="p-8 md:p-12">
            <div className="space-y-8">
              {/* Timeline Item 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <div className="w-px h-full bg-gray-200 dark:bg-gray-700 my-2"></div>
                </div>
                <div className="pb-8">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Document Verification</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Your documents have been verified by our team.</p>
                  <span className="text-xs text-brand-red font-medium mt-2 block">Completed on Oct 12, 2026</span>
                </div>
              </div>
              {/* Timeline Item 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-gold"></span>
                  </div>
                  <div className="w-px h-full bg-gray-200 dark:bg-gray-700 my-2"></div>
                </div>
                <div className="pb-8">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">University Application</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Application sent to Technical University of Munich.</p>
                  <span className="text-xs text-brand-gold font-medium mt-2 block">In Progress</span>
                </div>
              </div>
              {/* Timeline Item 3 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-500 dark:text-gray-500">Visa Appointment</h3>
                  <p className="text-gray-400 dark:text-gray-600 text-sm mt-1">Waiting for university admission letter to book appointment.</p>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-2 block">Upcoming</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackingPage;
