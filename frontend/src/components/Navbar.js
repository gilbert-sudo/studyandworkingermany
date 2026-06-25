import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { toggleDarkMode, setCurrentLang, openAuthModal } from '../redux/slices/uiSlice';
import { logout } from '../redux/slices/authSlice';

const DesktopNavLink = ({ href, children, isRouterLink, onClick, isActive, setActiveHash }) => {
  const activeClass = isActive 
    ? 'text-brand-red' 
    : 'text-gray-600 dark:text-gray-300 hover:text-brand-red dark:hover:text-brand-red';
  
  const indicatorClass = isActive 
    ? 'w-full shadow-[0_0_8px_rgba(230,57,70,0.8)]' 
    : 'w-0 group-hover:w-full';

  const content = (
    <>
      {children}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-red transition-all duration-300 ${indicatorClass}`}></span>
    </>
  );

  const baseClass = `text-sm font-medium transition-all duration-300 relative group ${activeClass}`;

  if (isRouterLink) {
    return <Link to={href} onClick={onClick} className={baseClass}>{content}</Link>;
  }
  return <a href={href} onClick={(e) => { if (setActiveHash) setActiveHash(href); }} className={baseClass}>{content}</a>;
};

const MobileNavLink = ({ href, icon, label, isRouterLink, onClick, isActive, setActiveHash }) => {
  const activeIconClass = isActive 
    ? '-translate-y-1 text-brand-red drop-shadow-[0_0_8px_rgba(230,57,70,0.6)]' 
    : 'group-hover:-translate-y-1 group-active:scale-110';
    
  const activeDotClass = isActive 
    ? 'opacity-100 shadow-[0_0_6px_rgba(230,57,70,0.8)]' 
    : 'opacity-0 group-active:opacity-100 group-hover:opacity-100';

  const activeTextClass = isActive 
    ? 'text-brand-red' 
    : 'group-hover:text-brand-red';

  const content = (
    <>
      <div className="relative flex flex-col items-center">
        <div className={`mb-1 transition-all duration-300 ${activeIconClass}`}>
          {icon}
        </div>
        <span className={`absolute -bottom-1 w-1 h-1 bg-brand-red rounded-full transition-all duration-300 ${activeDotClass}`}></span>
      </div>
      <span className={`text-[10px] font-medium mt-0.5 transition-colors duration-300 ${activeTextClass}`}>{label}</span>
    </>
  );

  const baseClass = `group flex flex-col items-center justify-center w-full h-14 rounded-full transition-all duration-300 ${isActive ? 'text-brand-red' : 'text-gray-500 dark:text-gray-400 hover:text-brand-red dark:hover:text-brand-red active:scale-90 active:bg-brand-red/10'}`;

  if (isRouterLink) {
    return <Link to={href} onClick={onClick} className={baseClass}>{content}</Link>;
  }
  return <a href={href} onClick={(e) => { if (setActiveHash) setActiveHash(href); }} className={baseClass}>{content}</a>;
};

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isVocationalTest = location.pathname === '/onboarding';
  const isUserSpace = location.pathname.startsWith('/user');
  const { currentLang, isDarkMode } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [activeHash, setActiveHash] = useState(location.hash || '#services');
  const userMenuRef = useRef(null);
  const langMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isUserSpace) return;
    
    const handleScroll = () => {
      const sections = ['services', 'philosophy', 'about', 'process'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -window.innerHeight / 2 && rect.top < window.innerHeight / 2) {
             current = `#${section}`;
             break;
          } else if (rect.top < 0 && rect.bottom > 0) {
             current = `#${section}`;
          }
        }
      }
      
      if (current && current !== activeHash) {
        setActiveHash(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isUserSpace, activeHash]);

  const isLinkActive = (path) => {
    if (path.startsWith('#')) return activeHash === path;
    if (path === '/') return false;
    return location.pathname === path;
  };

  const handleHomeClick = (e) => {
    if (isUserSpace) {
      e.preventDefault();
      setShowLeaveModal(true);
    }
  };

  const confirmLeave = () => {
    setShowLeaveModal(false);
    navigate('/');
  };

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
            <Link to={isVocationalTest ? "#" : "/"} onClick={isVocationalTest ? (e) => e.preventDefault() : handleHomeClick} className={`flex items-center gap-2 md:gap-3 animate-slide-right animate-delay-100 ${isVocationalTest ? 'opacity-80 cursor-default' : ''}`}>
              <div className="relative">
                <img src="images/logo.png" alt="Logo" className="h-8 md:h-10 w-auto object-contain" />
              </div>
              <span className="font-semibold tracking-tight flex flex-col sm:block justify-center mt-1 sm:mt-0">
                <span className="text-[11px] sm:text-xl leading-[1.1] sm:leading-normal"><span className="text-brand-red">Study</span>And<span className="text-brand-gold">Work</span></span>
                <span className="text-[11px] sm:text-xl leading-[1.1] sm:leading-normal">InGermany</span>
              </span>
            </Link>

            {/**/}
            <div className="hidden md:flex md:items-center md:gap-10 animate-slide-up animate-delay-200">
              {isVocationalTest ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Test in Progress</span>
                </div>
              ) : !isUserSpace ? (
                <>
                  <DesktopNavLink href="#services" isActive={isLinkActive('#services')} setActiveHash={setActiveHash}>Services</DesktopNavLink>
                  <DesktopNavLink href="#philosophy" isActive={isLinkActive('#philosophy')} setActiveHash={setActiveHash}>Philosophy</DesktopNavLink>
                  <DesktopNavLink href="#about" isActive={isLinkActive('#about')} setActiveHash={setActiveHash}>About Us</DesktopNavLink>
                  <DesktopNavLink href="#process" isActive={isLinkActive('#process')} setActiveHash={setActiveHash}>Process</DesktopNavLink>
                </>
              ) : (
                <>
                  <DesktopNavLink href="/" isRouterLink={true} onClick={handleHomeClick} isActive={isLinkActive('/')}>Home</DesktopNavLink>
                  <DesktopNavLink href="/user/application" isRouterLink={true} isActive={isLinkActive('/user/application')}>Application</DesktopNavLink>
                  <DesktopNavLink href="/user/notifications" isRouterLink={true} isActive={isLinkActive('/user/notifications')}>Notifications</DesktopNavLink>
                  <DesktopNavLink href="/user/profile" isRouterLink={true} isActive={isLinkActive('/user/profile')}>My Profile</DesktopNavLink>
                </>
              )}
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
              <div className="relative" ref={langMenuRef}>
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

              {user ? (
                <div className="relative animate-fade-in" ref={userMenuRef}>
                  <div
                    className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 py-1 pl-1 pr-2 md:py-1.5 md:pl-1.5 md:pr-3 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer transition-all hover:shadow-md"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-brand-red to-brand-gold text-white flex items-center justify-center font-bold text-xs md:text-sm shadow-inner">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden md:flex flex-col text-left ml-1">
                      <span className="text-xs md:text-sm font-bold text-gray-900 dark:text-white leading-tight" title={user.name}>
                        {user.name.length > 15 ? `${user.name.substring(0, 15)}...` : user.name}
                      </span>
                      <span className="text-[9px] font-mono text-gray-500 dark:text-gray-400 leading-tight">ID: {user.clientId}</span>
                    </div>
                    <svg className={`w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 ml-0.5 md:ml-1 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>

                  <div className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300 transform origin-top-right z-50 ${isUserMenuOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 md:hidden">
                      <p className="text-sm font-bold text-gray-900 dark:text-white" title={user.name}>
                        {user.name.length > 15 ? `${user.name.substring(0, 15)}...` : user.name}
                      </p>
                      <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1">ID: {user.clientId}</p>
                    </div>
                    <div className="p-2 flex flex-col gap-1">
                      <Link to={user.hasCompletedVocationalTest ? "/user/application" : "/onboarding"} state={{ from: location.pathname }} onClick={() => setIsUserMenuOpen(false)} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        {user.hasCompletedVocationalTest ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L2.5 8.5l6 4.5-3.5 3.5-2.5-.5-1.5 1.5 3 3 3 3 1.5-1.5-.5-2.5 3.5-3.5 4.5 6 1.7-1.2c.4-.2.7-.6.6-1.1z"></path></svg>
                        )}
                        {user.hasCompletedVocationalTest ? 'My Space' : 'Start my journey'}
                      </Link>
                      <button onClick={() => { dispatch(logout()); setIsUserMenuOpen(false); if (location.pathname !== '/') navigate('/'); }} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button onClick={() => dispatch(openAuthModal())} className="inline-flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg bg-brand-red text-white hover:bg-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" className="lucide lucide-arrow-right w-3 h-3 md:w-4 md:h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/**/}
      <nav className={`md:hidden fixed bottom-4 left-4 right-4 z-50 glass-effect bg-white/80 dark:bg-gray-900/80 border border-white/50 dark:border-gray-700/50 flex justify-around items-center h-16 px-2 rounded-full shadow-2xl backdrop-blur-xl ${isVocationalTest ? 'hidden' : ''}`}>
        {!isUserSpace ? (
          <>
            <MobileNavLink href="#services" label="Services" isActive={isLinkActive('#services')} setActiveHash={setActiveHash} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>} />
            <MobileNavLink href="#philosophy" label="Philosophy" isActive={isLinkActive('#philosophy')} setActiveHash={setActiveHash} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>} />
            <MobileNavLink href="#about" label="About Us" isActive={isLinkActive('#about')} setActiveHash={setActiveHash} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>} />
            <MobileNavLink href="#process" label="Process" isActive={isLinkActive('#process')} setActiveHash={setActiveHash} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L2.5 8.5l6 4.5-3.5 3.5-2.5-.5-1.5 1.5 3 3 3 3 1.5-1.5-.5-2.5 3.5-3.5 4.5 6 1.7-1.2c.4-.2.7-.6.6-1.1z"></path></svg>} />
          </>
        ) : (
          <>
            <MobileNavLink href="/" isRouterLink={true} onClick={handleHomeClick} label="Home" isActive={isLinkActive('/')} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>} />
            <MobileNavLink href="/user/application" isRouterLink={true} label="Application" isActive={isLinkActive('/user/application')} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>} />
            <MobileNavLink href="/user/notifications" isRouterLink={true} label="Notifications" isActive={isLinkActive('/user/notifications')} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>} />
            <MobileNavLink href="/user/profile" isRouterLink={true} label="My Profile" isActive={isLinkActive('/user/profile')} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>} />
          </>
        )}
      </nav>

      {/* Leave My Space Confirmation Drawer (Mobile) / Modal (Desktop) */}
      <div className={`fixed inset-0 z-[100] flex items-end md:items-center justify-center transition-all duration-300 ${showLeaveModal ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm dark:bg-black/60" onClick={() => setShowLeaveModal(false)}></div>
        <div className={`relative bg-white dark:bg-gray-800 rounded-t-3xl md:rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-2xl w-full max-w-sm md:mx-4 overflow-hidden transition-transform duration-500 ease-out ${showLeaveModal ? 'translate-y-0 md:scale-100' : 'translate-y-full md:translate-y-8 md:scale-95'}`}>
          <div className="hidden md:block h-2 bg-gradient-to-r from-brand-red to-brand-gold w-full"></div>
          
          {/* Drag handle indicator for mobile */}
          <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mt-4 mb-2 md:hidden"></div>

          <div className="p-6 md:p-8 pt-2 md:pt-8 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-inner border border-red-100 dark:border-red-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red md:w-8 md:h-8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">Leaving My Space?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 md:mb-8 px-2">
              You are about to return to the public landing page.
            </p>
            <div className="flex flex-col gap-3 pb-4 md:pb-0">
              <button onClick={confirmLeave} className="w-full py-3.5 md:py-3 px-4 bg-brand-red hover:bg-red-700 text-white font-semibold rounded-2xl md:rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 text-[15px]">
                Yes, Leave My Space
              </button>
              <button onClick={() => setShowLeaveModal(false)} className="w-full py-3.5 md:py-3 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-2xl md:rounded-xl transition-all duration-300 border border-transparent md:border-gray-200 md:dark:border-gray-700 text-[15px]">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
