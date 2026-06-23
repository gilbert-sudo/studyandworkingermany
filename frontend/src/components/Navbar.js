import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode, setCurrentLang, openAuthModal } from '../redux/slices/uiSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { currentLang, isDarkMode } = useSelector((state) => state.ui);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <>
      {/**/}
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b animate-fade-in bg-white/90 dark:bg-gray-950/90 border-gray-100 dark:border-gray-800" style={{ opacity: 1, transform: 'translateY(0px)' }}>
        <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-20">
            <a href="#" className="flex items-center gap-2 md:gap-3 animate-slide-right animate-delay-100">
              <div className="relative">
                <img src="images/logo.png" alt="Logo" className="h-8 md:h-10 w-auto object-contain" />
              </div>
              <span className="font-semibold tracking-tight flex flex-col sm:block justify-center mt-1 sm:mt-0">
                <span className="text-[11px] sm:text-xl leading-[1.1] sm:leading-normal"><span className="text-brand-red">Study</span>And<span className="text-brand-gold">Work</span></span>
                <span className="text-[11px] sm:text-xl leading-[1.1] sm:leading-normal">InGermany</span>
              </span>
            </a>

            {/**/}
            <div className="hidden md:flex md:items-center md:gap-10 animate-slide-up animate-delay-200">
              <a href="#services" className="text-sm font-medium transition-all duration-300 relative group text-gray-600 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#philosophy" className="text-sm font-medium transition-all duration-300 relative group text-gray-600 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red">
                Philosophy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className="text-sm font-medium transition-all duration-300 relative group text-gray-600 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#process" className="text-sm font-medium transition-all duration-300 relative group text-gray-600 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red">
                Process
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 md:gap-6 animate-slide-right animate-delay-300">

              {/**/}
              <button id="theme-toggle" onClick={() => dispatch(toggleDarkMode())} className="flex items-center gap-2 focus:outline-none group" aria-label="Toggle Dark Mode">
                <div className="relative inline-flex items-center w-[3.25rem] h-7 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300 shadow-inner border border-gray-300 dark:border-gray-700">
                  {/**/}
                  <div className="absolute left-1 top-1 w-5 h-5 bg-white dark:bg-gray-600 rounded-full shadow-sm transition-transform duration-300 transform translate-x-0 dark:translate-x-6 z-0 ring-1 ring-gray-200 dark:ring-gray-700"></div>

                  {/**/}
                  <div className="w-full flex justify-between px-1.5 z-10 relative pointer-events-none">
                    <svg className="w-4 h-4 text-yellow-500 transition-opacity duration-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    <svg className="w-4 h-4 text-gray-400 dark:text-yellow-300 transition-opacity duration-300" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                  </div>
                </div>
                <span id="theme-toggle-text" className="hidden sm:block text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-brand-red transition-colors">Dark Mode</span>
              </button>

              {/**/}
              <div className="relative">
                <button id="lang-menu-button" type="button" onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-1 sm:gap-2 p-1.5 sm:px-3 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                  <span className="block font-bold sm:font-medium">{currentLang}</span>
                </button>

                {/**/}
                <div id="lang-dropdown" className={`absolute right-0 mt-3 p-2 min-w-max rounded-full glass-effect shadow-xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 focus:outline-none transition-all duration-300 z-50 ${isLangMenuOpen ? 'opacity-100 transform translate-y-0 pointer-events-auto' : 'opacity-0 transform translate-y-4 pointer-events-none'}`}>
                  <div className="flex items-center gap-1.5" role="menu" aria-orientation="horizontal" aria-labelledby="lang-menu-button">
                    <a href="#" onClick={(e) => { e.preventDefault(); dispatch(setCurrentLang('FR')); setIsLangMenuOpen(false); }} className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all hover:-translate-y-1 ${currentLang === 'FR' ? 'relative before:absolute before:inset-0 before:rounded-full before:ring-1 before:ring-gray-200 dark:before:ring-gray-700 bg-white/50 dark:bg-gray-800/50' : ''}`} role="menuitem">
                      <img src="https://flagcdn.com/w40/fr.png" alt="Français" className={`w-6 h-6 rounded-full object-cover shadow-sm ring-2 transition-all ${currentLang === 'FR' ? 'ring-brand-red' : 'ring-transparent hover:ring-brand-red'}`} />
                      <span>FR</span>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); dispatch(setCurrentLang('EN')); setIsLangMenuOpen(false); }} className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all hover:-translate-y-1 ${currentLang === 'EN' ? 'relative before:absolute before:inset-0 before:rounded-full before:ring-1 before:ring-gray-200 dark:before:ring-gray-700 bg-white/50 dark:bg-gray-800/50' : ''}`} role="menuitem">
                      <img src="https://flagcdn.com/w40/gb.png" alt="English" className={`w-6 h-6 rounded-full object-cover shadow-sm ring-2 transition-all ${currentLang === 'EN' ? 'ring-brand-gold' : 'ring-transparent hover:ring-brand-gold'}`} />
                      <span>EN</span>
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); dispatch(setCurrentLang('DE')); setIsLangMenuOpen(false); }} className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all hover:-translate-y-1 ${currentLang === 'DE' ? 'relative before:absolute before:inset-0 before:rounded-full before:ring-1 before:ring-gray-200 dark:before:ring-gray-700 bg-white/50 dark:bg-gray-800/50' : ''}`} role="menuitem">
                      <img src="https://flagcdn.com/w40/de.png" alt="Deutsch" className={`w-6 h-6 rounded-full object-cover shadow-sm ring-2 transition-all ${currentLang === 'DE' ? 'ring-brand-gold' : 'ring-transparent hover:ring-brand-gold'}`} />
                      <span>DE</span>
                    </a>
                  </div>
                </div>
              </div>

              <button onClick={() => dispatch(openAuthModal())} className="inline-flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg bg-brand-red text-white hover:bg-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" className="lucide lucide-arrow-right w-3 h-3 md:w-4 md:h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                Apply Now
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/**/}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50 glass-effect bg-white/80 dark:bg-gray-900/80 border border-white/50 dark:border-gray-700/50 flex justify-around items-center h-16 px-2 rounded-full shadow-2xl backdrop-blur-xl">
        <a href="#services" className="group flex flex-col items-center justify-center w-full h-14 rounded-full text-gray-500 dark:text-gray-400 hover:text-brand-red dark:hover:text-brand-red active:scale-90 active:bg-brand-red/10 transition-all duration-300">
          <div className="relative flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 group-hover:-translate-y-1 group-active:scale-110 transition-all duration-300"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            <span className="absolute -bottom-1 opacity-0 group-active:opacity-100 group-hover:opacity-100 w-1 h-1 bg-brand-red rounded-full transition-all duration-300"></span>
          </div>
          <span className="text-[10px] font-medium mt-0.5 group-hover:text-brand-red transition-colors duration-300">Services</span>
        </a>
        <a href="#philosophy" className="group flex flex-col items-center justify-center w-full h-14 rounded-full text-gray-500 dark:text-gray-400 hover:text-brand-red dark:hover:text-brand-red active:scale-90 active:bg-brand-red/10 transition-all duration-300">
          <div className="relative flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 group-hover:-translate-y-1 group-active:scale-110 transition-all duration-300"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
            <span className="absolute -bottom-1 opacity-0 group-active:opacity-100 group-hover:opacity-100 w-1 h-1 bg-brand-red rounded-full transition-all duration-300"></span>
          </div>
          <span className="text-[10px] font-medium mt-0.5 group-hover:text-brand-red transition-colors duration-300">Philosophy</span>
        </a>
        <a href="#about" className="group flex flex-col items-center justify-center w-full h-14 rounded-full text-gray-500 dark:text-gray-400 hover:text-brand-red dark:hover:text-brand-red active:scale-90 active:bg-brand-red/10 transition-all duration-300">
          <div className="relative flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 group-hover:-translate-y-1 group-active:scale-110 transition-all duration-300"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
            <span className="absolute -bottom-1 opacity-0 group-active:opacity-100 group-hover:opacity-100 w-1 h-1 bg-brand-red rounded-full transition-all duration-300"></span>
          </div>
          <span className="text-[10px] font-medium mt-0.5 group-hover:text-brand-red transition-colors duration-300">About Us</span>
        </a>
        <a href="#process" className="group flex flex-col items-center justify-center w-full h-14 rounded-full text-gray-500 dark:text-gray-400 hover:text-brand-red dark:hover:text-brand-red active:scale-90 active:bg-brand-red/10 transition-all duration-300">
          <div className="relative flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 group-hover:-translate-y-1 group-active:scale-110 transition-all duration-300"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L2.5 8.5l6 4.5-3.5 3.5-2.5-.5-1.5 1.5 3 3 3 3 1.5-1.5-.5-2.5 3.5-3.5 4.5 6 1.7-1.2c.4-.2.7-.6.6-1.1z"></path></svg>
            <span className="absolute -bottom-1 opacity-0 group-active:opacity-100 group-hover:opacity-100 w-1 h-1 bg-brand-red rounded-full transition-all duration-300"></span>
          </div>
          <span className="text-[10px] font-medium mt-0.5 group-hover:text-brand-red transition-colors duration-300">Process</span>
        </a>
      </nav>
    </>
  );
};

export default Navbar;
