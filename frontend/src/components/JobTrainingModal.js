import React, { useState, useEffect } from 'react';
import { X, Search, CheckCircle2, ChevronRight, Briefcase, ChevronDown } from 'lucide-react';
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
  const [expandedCategory, setExpandedCategory] = useState(null);

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
      <div className="shrink-0 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-800">

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
              className="w-full pl-11 pr-11 py-3 sm:py-3.5 text-base bg-white dark:bg-neutral-900 border-2 border-gray-300 dark:border-neutral-600 rounded-full shadow-md hover:shadow-lg focus:shadow-lg focus:ring-4 focus:ring-[#00A693]/10 dark:focus:ring-[#2dd4bf]/10 focus:border-[#00A693] dark:focus:border-[#2dd4bf] outline-none text-gray-900 dark:text-white transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#00A693] dark:group-focus-within:text-[#2dd4bf] transition-colors pointer-events-none" />
            
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full transition-all focus:outline-none"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Desktop Close Button */}
        <div className="hidden sm:flex flex-1 justify-end">
          <button
            onClick={handleManualClose}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-neutral-600 active:scale-95"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 w-full p-4 sm:p-6 bg-white dark:bg-neutral-950 flex flex-col">
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-neutral-900/50 rounded-[2rem] border border-gray-100 dark:border-neutral-800/80 shadow-inner p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {filteredCategories.length > 0 ? (
              <div className="columns-1 lg:columns-2 xl:columns-3 gap-4 sm:gap-6">
                {filteredCategories.map((cat, idx) => {
                  const isExpanded = expandedCategory === cat.category || searchTerm !== '';
                  const selectedCount = cat.jobs.filter(job => selectedJobs.includes(job)).length;
                  
                  return (
                  <div key={idx} className={`break-inside-avoid mb-4 sm:mb-6 bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden border-2 shadow-sm transition-all duration-300 flex flex-col ${isExpanded ? 'border-[#00A693]/30 dark:border-[#2dd4bf]/30 ring-4 ring-[#00A693]/5 dark:ring-[#2dd4bf]/5' : 'border-gray-100 dark:border-neutral-800 hover:border-gray-200 dark:hover:border-neutral-700'}`}>
                    {/* Image Header / Accordion Trigger */}
                    <button 
                      onClick={() => setExpandedCategory(isExpanded && !searchTerm ? null : cat.category)}
                      className="relative w-full h-32 sm:h-40 overflow-hidden group focus:outline-none text-left flex shrink-0"
                    >
                      <img
                        src={CATEGORY_IMAGES[cat.category] || "https://image.pollinations.ai/prompt/professional%20workplace,realistic?width=800&height=600&nologo=true"}
                        alt={cat.category}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isExpanded ? 'scale-105' : ''}`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${isExpanded ? 'from-black/90 via-black/40 to-black/10' : 'from-black/80 via-black/30 to-black/10 group-hover:from-black/90 group-hover:via-black/40'}`} />
                      
                      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end">
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <h3 className="text-white font-bold text-lg sm:text-xl leading-tight text-shadow-sm">
                              {cat.category}
                            </h3>
                            {selectedCount > 0 && (
                              <p className="text-[#00A693] dark:text-[#2dd4bf] text-sm font-semibold mt-1">
                                {selectedCount} selected
                              </p>
                            )}
                          </div>
                          <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${isExpanded ? 'bg-white/30 text-white' : 'bg-white/20 text-white group-hover:bg-white/30'}`}>
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </div>
                    </button>
                    
                    {/* Accordion Content */}
                    <div className={`transition-all duration-300 ease-in-out origin-top overflow-hidden flex flex-col ${isExpanded ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0'}`}>
                      <div className="p-3 sm:p-4 bg-white dark:bg-neutral-900 border-t border-gray-100 dark:border-neutral-800 flex flex-col gap-1.5 sm:gap-2">
                        {cat.jobs.map(job => {
                          const isSelected = selectedJobs.includes(job);
                          const isDisabled = !isSelected && selectedJobs.length >= 6;
                          return (
                            <button
                              key={job}
                              onClick={() => !isDisabled && handleToggleJob(job)}
                              disabled={isDisabled}
                              className={`w-full flex items-center justify-between text-left px-3 py-2 sm:px-4 sm:py-3 rounded-xl transition-all duration-200 ${isSelected
                                ? 'bg-[#00A693]/10 dark:bg-[#2dd4bf]/10 border border-[#00A693]/20 dark:border-[#2dd4bf]/20 shadow-sm'
                                : isDisabled
                                  ? 'bg-gray-50/50 dark:bg-neutral-950/20 border border-transparent opacity-50 cursor-not-allowed'
                                  : 'bg-gray-50 dark:bg-neutral-950/50 border border-transparent hover:bg-gray-100 dark:hover:bg-neutral-800'
                                }`}
                            >
                              <span className={`text-sm leading-tight pr-2 sm:text-base ${isSelected ? 'text-[#00A693] dark:text-[#2dd4bf] font-semibold' : isDisabled ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300 font-medium'}`}>
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
                  </div>
                )})}
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
      </div>

      {/* Footer */}
      <div className="shrink-0 w-full sticky bottom-0 z-20 bg-white dark:bg-neutral-950 border-t border-gray-200 dark:border-neutral-800 px-4 sm:px-6 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex flex-col sm:flex-row items-center justify-between gap-3">
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
