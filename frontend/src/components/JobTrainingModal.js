import React, { useState, useEffect } from 'react';
import { X, Search, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';
import { useSelector } from 'react-redux';

const CATEGORY_IMAGES = {
  "Handwerk (Crafts & Trades)": "/images/job_training/crafts_trades.png",
  "Metall & Werkzeugmaschinenbau (Metalworking & Machine Construction)": "/images/job_training/metalworking.png",
  "Elektrotechnik (Electrical Engineering)": "/images/job_training/electrical.png",
  "Baugewerbe (Civil Engineering & Construction)": "/images/job_training/civil_engineering.png",
  "Einzelhandel (Retail)": "/images/job_training/retail.png",
  "Hotellerie / Gastronomie (Hospitality & Catering)": "/images/job_training/hospitality.png",
  "Pflegeberufe / Medizinischer Bereich (Healthcare & Nursing)": "/images/job_training/healthcare.png",
  "Berufskraftfahrer/in (Professional Driver)": "/images/job_training/professional_driver.png",
  "Kaufmännische Berufe (Commercial & Business Professions)": "/images/job_training/commercial_business.png",
  "Lagerlogistik (Warehouse Logistics)": "/images/job_training/warehouse_logistics.png"
};

const JobTrainingModal = ({ isOpen, onClose, initialSelectedJobs, onSave }) => {
  const { categories: AUSBILDUNG_CATEGORIES } = useSelector((state) => state.vocational);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobs, setSelectedJobs] = useState([]);

  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      setSelectedJobs([...initialSelectedJobs]);
      setSearchTerm('');
      document.body.style.overflow = 'hidden';
      window.history.pushState({ jobModalOpen: true }, '');
      window.addEventListener('popstate', handlePopState);
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => { 
      document.body.style.overflow = 'auto'; 
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, initialSelectedJobs, onClose]);

  const handleManualClose = () => {
    if (window.history.state?.jobModalOpen) {
      window.history.back();
    }
    onClose();
  };

  if (!isOpen) return null;

  const handleToggleJob = (job) => {
    setSelectedJobs(prev => {
      if (prev.includes(job)) {
        return prev.filter(j => j !== job);
      }
      if (prev.length >= 6) {
        return prev;
      }
      return [...prev, job];
    });
  };

  const handleSave = () => {
    onSave(selectedJobs);
    handleManualClose();
  };

  const filteredCategories = AUSBILDUNG_CATEGORIES.map(cat => ({
    ...cat,
    jobs: cat.jobs.filter(job => job.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(cat => cat.jobs.length > 0 || cat.category.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-neutral-950 animate-in fade-in duration-300">
      {/* Header */}
      <div className="sticky top-0 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 py-3 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-neutral-800">
        <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#00A693] dark:text-[#2dd4bf]" />
              Select Job Trainings
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Choose all the professions you are interested in.
            </p>
          </div>
          <button
            onClick={handleManualClose}
            className="sm:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <input
              type="text"
              placeholder="Search professions or sectors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 sm:py-2.5 text-sm bg-gray-100 dark:bg-neutral-900 border-none rounded-full focus:ring-2 focus:ring-[#00A693] dark:focus:ring-[#2dd4bf] outline-none text-gray-900 dark:text-white transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <button
            onClick={handleManualClose}
            className="hidden sm:flex p-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-gray-50 dark:bg-neutral-950/50">
        <div className="max-w-7xl mx-auto">
          {filteredCategories.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5">
              {filteredCategories.map((cat, idx) => (
                <div key={idx} className="break-inside-avoid mb-4 sm:mb-5 bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                  <div className="relative h-24 sm:h-28 overflow-hidden">
                    <img
                      src={CATEGORY_IMAGES[cat.category] || "https://image.pollinations.ai/prompt/professional%20workplace,realistic?width=800&height=600&nologo=true"}
                      alt={cat.category}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <h3 className="absolute bottom-2 left-3 right-3 text-white font-semibold text-base leading-tight text-shadow-sm">
                      {cat.category}
                    </h3>
                  </div>
                  <div className="p-2.5 sm:p-3 flex-1 flex flex-col gap-1.5 bg-white dark:bg-neutral-900">
                    {cat.jobs.map(job => {
                      const isSelected = selectedJobs.includes(job);
                      const isDisabled = !isSelected && selectedJobs.length >= 6;
                      return (
                        <button
                          key={job}
                          onClick={() => !isDisabled && handleToggleJob(job)}
                          disabled={isDisabled}
                          className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-xl transition-all duration-200 ${isSelected
                              ? 'bg-[#00A693]/10 dark:bg-[#2dd4bf]/10 border border-[#00A693]/20 dark:border-[#2dd4bf]/20'
                              : isDisabled
                              ? 'bg-gray-50/50 dark:bg-neutral-950/20 border border-transparent opacity-50 cursor-not-allowed'
                              : 'bg-gray-50 dark:bg-neutral-950/50 border border-transparent hover:bg-gray-100 dark:hover:bg-neutral-800'
                            }`}
                        >
                          <span className={`text-xs sm:text-sm ${isSelected ? 'text-[#00A693] dark:text-[#2dd4bf] font-medium' : isDisabled ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'}`}>
                            {job}
                          </span>
                          <div className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected
                              ? 'bg-[#00A693] border-[#00A693] dark:bg-[#2dd4bf] dark:border-[#2dd4bf]'
                              : 'border-gray-300 dark:border-neutral-600'
                            }`}>
                            {isSelected && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
              <p className="text-gray-500 dark:text-gray-400">We couldn't find any job trainings matching "{searchTerm}".</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 z-20 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-t border-gray-200 dark:border-neutral-800 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#00A693]/10 flex items-center justify-center text-[#00A693] font-bold border-2 border-white dark:border-neutral-950 shadow-sm text-sm">
              {selectedJobs.length}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white leading-tight">
              {selectedJobs.length === 0 ? 'No jobs selected' : `${selectedJobs.length} training${selectedJobs.length !== 1 ? 's' : ''} selected`}
            </p>
            <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 leading-tight">
              {selectedJobs.length >= 6 ? 'Maximum of 6 jobs selected.' : `You can select up to 6 jobs. (${6 - selectedJobs.length} remaining)`}
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#00A693] hover:bg-[#008c7d] dark:bg-[#2dd4bf] dark:hover:bg-[#25b5a2] text-white dark:text-neutral-950 font-medium text-sm rounded-full shadow-md shadow-[#00A693]/20 dark:shadow-[#2dd4bf]/20 transition-all flex items-center justify-center gap-1.5"
        >
          Save Selections
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default JobTrainingModal;
