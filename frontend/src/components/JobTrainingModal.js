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
    <div className="fixed inset-0 z-50 h-[100dvh] w-full flex flex-col bg-white dark:bg-neutral-950 animate-in fade-in duration-300">
      {/* Header */}
      <div className="shrink-0 w-full sticky top-0 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-neutral-800">

        {/* Left: Title & Mobile Close */}
        <div className="flex-1 flex items-start sm:items-center justify-between min-w-0">
          <div className="min-w-0 pr-2">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 truncate">
              <Briefcase className="w-5 h-5 shrink-0 text-[#00A693] dark:text-[#2dd4bf]" />
              <span className="truncate">Select Job Trainings</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              Choose all the professions you are interested in.
            </p>
          </div>
          <button
            onClick={handleManualClose}
            className="sm:hidden p-2 -mr-2 shrink-0 text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Search Input */}
        <div className="flex-[1.5] flex justify-center w-full">
          <div className="relative w-full max-w-lg sm:max-w-md group">
            <input
              type="text"
              placeholder="Search professions or sectors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 sm:py-3.5 text-base bg-white dark:bg-neutral-900 border-2 border-gray-300 dark:border-neutral-600 rounded-full shadow-md hover:shadow-lg focus:shadow-lg focus:ring-4 focus:ring-[#00A693]/10 dark:focus:ring-[#2dd4bf]/10 focus:border-[#00A693] dark:focus:border-[#2dd4bf] outline-none text-gray-900 dark:text-white transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00A693] dark:group-focus-within:text-[#2dd4bf] transition-colors" />
          </div>
        </div>

        {/* Right: Desktop Close Button */}
        <div className="hidden sm:flex flex-1 justify-end">
          <button
            onClick={handleManualClose}
            className="p-2.5 -mr-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0 w-full p-3 sm:p-5 bg-gray-50 dark:bg-neutral-950/50">
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
                  <div className="p-2 sm:p-3 flex-1 flex flex-col gap-1 sm:gap-1.5 bg-white dark:bg-neutral-900">
                    {cat.jobs.map(job => {
                      const isSelected = selectedJobs.includes(job);
                      const isDisabled = !isSelected && selectedJobs.length >= 6;
                      return (
                        <button
                          key={job}
                          onClick={() => !isDisabled && handleToggleJob(job)}
                          disabled={isDisabled}
                          className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl transition-all duration-200 ${isSelected
                            ? 'bg-[#00A693]/10 dark:bg-[#2dd4bf]/10 border border-[#00A693]/20 dark:border-[#2dd4bf]/20'
                            : isDisabled
                              ? 'bg-gray-50/50 dark:bg-neutral-950/20 border border-transparent opacity-50 cursor-not-allowed'
                              : 'bg-gray-50 dark:bg-neutral-950/50 border border-transparent hover:bg-gray-100 dark:hover:bg-neutral-800'
                            }`}
                        >
                          <span className={`text-sm leading-tight pr-2 sm:text-base ${isSelected ? 'text-[#00A693] dark:text-[#2dd4bf] font-medium' : isDisabled ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'}`}>
                            {job}
                          </span>
                          <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected
                            ? 'bg-[#00A693] border-[#00A693] dark:bg-[#2dd4bf] dark:border-[#2dd4bf]'
                            : 'border-gray-300 dark:border-neutral-600'
                            }`}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
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
      <div className="shrink-0 w-full sticky bottom-0 z-20 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-t border-gray-200 dark:border-neutral-800 px-4 sm:px-6 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex flex-col sm:flex-row items-center justify-between gap-3">
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
