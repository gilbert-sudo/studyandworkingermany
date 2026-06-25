import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthModal } from '../redux/slices/uiSlice';

function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Parallax scrolling effect
    const handleScroll = () => {
      const scrolled = window.scrollY;

      if (scrolled > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      const parallaxElements = document.querySelectorAll('.parallax-element');

      parallaxElements.forEach((el) => {
        const speed = el.getAttribute('data-speed');
        if (speed) {
          const yPos = -(scrolled * parseFloat(speed));
          el.style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Interactive vanilla JS scripts omitted for now since we'll refactor to React state next.

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>

      {/**/}
      <section className="relative overflow-hidden pt-20 min-h-screen flex items-center parallax-section">
        {/**/}
        <div className="absolute inset-0 pattern-dots opacity-30 animate-fade-in animate-delay-200 parallax-element" data-speed="0.3"></div>

        {/**/}
        <div className="absolute inset-0 animate-fade-in animate-delay-300">
          <img src="images/hero.png" alt="Students in Germany" className="parallax-bg parallax-element" data-speed="0.5" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent dark:from-gray-950/95 dark:via-gray-950/80"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center parallax-content">
          {/**/}
          <div className="lg:col-span-7 animate-slide-up animate-delay-400 parallax-element -mt-12 lg:-mt-24" data-speed="0.2">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-sm font-medium mb-10 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></div>
              From Madagascar to Germany
            </div>

            <h1 className="sm:text-[4rem] lg:text-[5.25rem] leading-[0.85] text-[3.25rem] tracking-tighter font-thin mb-8">
              <span className="text-gradient inline-block pb-2 md:pb-4 pr-2 text-[1.08em] tracking-[-0.08em]" style={{ fontFamily: '"Segoe UI Light", "Helvetica Neue Light", sans-serif', fontWeight: 100, fontStretch: 'condensed' }}>Your Future</span><br />
              <span className="font-medium text-gray-900 dark:text-white text-[1.05em]">in Germany</span><br />
              <span className="sm:text-[3.25rem] lg:text-[4rem] text-[2.5rem] text-gray-500 dark:text-gray-400">Starts Here</span>
            </h1>

            <div className="max-w-xl">
              <p className="text-[1.15rem] font-light leading-relaxed mb-10 text-gray-600 dark:text-gray-300">
                We guide motivated young professionals from Madagascar through every step of applying for an Ausbildung and building a career in Germany.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                {user ? (
                  <Link to={user.hasCompletedVocationalTest ? "/user/application" : "/onboarding"} state={{ from: '/' }} className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl group bg-brand-red text-white hover:bg-red-700">
                    <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                      {user.hasCompletedVocationalTest ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 group-hover:-translate-y-8 group-hover:opacity-0"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 absolute -translate-x-8 translate-y-8 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 group-hover:-translate-y-8 group-hover:opacity-0"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L2.5 8.5l6 4.5-3.5 3.5-2.5-.5-1.5 1.5 3 3 3 3 1.5-1.5-.5-2.5 3.5-3.5 4.5 6 1.7-1.2c.4-.2.7-.6.6-1.1z"></path></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 absolute -translate-x-8 translate-y-8 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L2.5 8.5l6 4.5-3.5 3.5-2.5-.5-1.5 1.5 3 3 3 3 1.5-1.5-.5-2.5 3.5-3.5 4.5 6 1.7-1.2c.4-.2.7-.6.6-1.1z"></path></svg>
                        </>
                      )}
                    </div>
                    <span>{user.hasCompletedVocationalTest ? 'Go to My Space' : 'Start my journey'}</span>
                  </Link>
                ) : (
                  <>
                    <button onClick={() => dispatch(openAuthModal('signup'))} className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl group bg-brand-red text-white hover:bg-red-700">
                      {/**/}
                      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                        {/**/}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 group-hover:-translate-y-8 group-hover:opacity-0"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L2.5 8.5l6 4.5-3.5 3.5-2.5-.5-1.5 1.5 3 3 3 3 1.5-1.5-.5-2.5 3.5-3.5 4.5 6 1.7-1.2c.4-.2.7-.6.6-1.1z"></path></svg>
                        {/**/}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 absolute -translate-x-8 translate-y-8 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L2.5 8.5l6 4.5-3.5 3.5-2.5-.5-1.5 1.5 3 3 3 3 1.5-1.5-.5-2.5 3.5-3.5 4.5 6 1.7-1.2c.4-.2.7-.6.6-1.1z"></path></svg>
                      </div>

                      <span>Start Your Journey</span>
                    </button>
                    <button onClick={() => dispatch(openAuthModal('login'))} className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="calendar" className="lucide lucide-calendar w-5 h-5"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                      Book Consultation
                    </button>
                  </>
                )}
              </div>

              {/**/}
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 dark:text-white mb-1">500+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Apprentices Placed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 dark:text-white mb-1">Extensive</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Visa Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 dark:text-white mb-1">50+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Partner Companies</div>
                </div>
              </div>
            </div>
          </div>
          {/**/}
          <div className="lg:col-span-5 animate-scale-in animate-delay-500 parallax-element relative h-[450px] sm:h-[550px] w-full mt-10 lg:mt-0" data-speed="-0.1">
            {/**/}
            <div className="absolute top-0 right-0 sm:right-4 w-[75%] sm:w-[65%] h-[280px] sm:h-[350px] rounded-3xl shadow-2xl overflow-hidden group z-10 border-4 border-white dark:border-gray-900 floating cursor-pointer">
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" alt="Nursing Sector" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 p-5 sm:p-7 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                <span className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wide bg-brand-red text-white mb-3 inline-block shadow-lg">Pflegeberufe</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Healthcare & Medical</h3>
              </div>
            </div>

            {/**/}
            <div className="absolute bottom-0 left-0 w-[60%] sm:w-[55%] h-[200px] sm:h-[260px] rounded-3xl shadow-xl overflow-hidden group z-20 border-4 border-white dark:border-gray-900 floating cursor-pointer" style={{ animationDelay: '1.5s' }}>
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80" alt="Hotellerie & Gastronomie Sector" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wide bg-brand-gold text-white mb-2 inline-block shadow-lg">Hotellerie / Gastronomie</span>
                <h4 className="text-lg sm:text-xl font-bold text-white">Hospitality & Culinary</h4>
              </div>
            </div>

            {/**/}
            <div className="absolute top-10 left-2 sm:left-4 w-[45%] sm:w-[40%] h-[140px] sm:h-[180px] rounded-3xl shadow-xl overflow-hidden group z-30 border-4 border-white dark:border-gray-900 floating cursor-pointer" style={{ animationDelay: '0.8s' }}>
              <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80" alt="Business Sector" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 p-3 sm:p-5 w-full transform group-hover:-translate-y-1 transition-transform duration-500">
                <span className="px-2 py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wide bg-blue-500 text-white mb-1 inline-block shadow-lg">Kaufmännische Berufe</span>
                <h4 className="text-sm sm:text-base font-bold text-white">Business & Commerce</h4>
              </div>
            </div>

            {/**/}
            <div className="absolute bottom-6 sm:bottom-12 right-2 sm:right-6 w-[45%] h-[160px] sm:h-[200px] rounded-3xl shadow-xl overflow-hidden group z-40 border-4 border-white dark:border-gray-900 floating cursor-pointer" style={{ animationDelay: '3s' }}>
              <img src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=500&q=80" alt="Crafts Sector" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute bottom-0 left-0 p-4 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                <span className="px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wide bg-gray-600 text-white mb-1 inline-block shadow-lg">Handwerk</span>
                <h4 className="text-sm sm:text-lg font-bold text-white">Crafts & Trades</h4>
              </div>
            </div>

            {/**/}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-slide-up animate-delay-700">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center text-gray-900 dark:text-white shadow-2xl border-4 border-white dark:border-gray-700 hover:scale-110 transition-transform cursor-pointer">
                <span className="font-bold text-2xl sm:text-3xl text-brand-red">+6</span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">Sectors</span>
              </div>
            </div>

            {/**/}
            <div className="absolute top-1/2 -left-6 w-20 h-20 bg-brand-gold/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute top-10 right-0 w-32 h-32 bg-brand-red/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/**/}
      <section id="services" className="parallax-section bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/**/}
          <div className="text-center mb-20 animate-slide-up animate-delay-200 parallax-element" data-speed="0.1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-red-100 dark:bg-red-900/30 text-brand-red dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="compass" className="lucide lucide-compass w-4 h-4"><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"></path><circle cx="12" cy="12" r="10"></circle></svg>
              Our Agency Services
            </div>
            <h2 className="text-5xl font-light tracking-tight mb-6 text-gray-900 dark:text-white">
              Navigating Your Path <span className="font-semibold">to Germany</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We provide end-to-end support, from choosing the right program to securing your visa and settling into your new life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/**/}
            <div className="relative animate-slide-up animate-delay-300 parallax-element" data-speed="0.15">
              <div className="rounded-3xl p-12 lg:p-16 shadow-xl border bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 relative overflow-hidden">
                {/**/}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-full -translate-y-16 translate-x-16 opacity-60 parallax-element" data-speed="0.05"></div>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="graduation-cap" className="lucide lucide-graduation-cap w-8 h-8 text-brand-red"><path d="M21.42 10.922a2 2 0 0 1-.019 3.836l-8.319 3.039a2 2 0 0 1-1.32-.01l-8.382-3.04a2 2 0 0 1-.02-3.834L11.026 8.35a2 2 0 0 1 1.258-.015l9.136 2.587z"></path><path d="M10 16.5v3.15a2 2 0 0 0 1.25.93l.36.14a2 2 0 0 0 1.48 0l.36-.14a2 2 0 0 0 1.25-.93V16.5"></path><path d="M14 16.5v3.15a2 2 0 0 1-1.25.93l-.36.14a2 2 0 0 1-1.48 0l-.36-.14a2 2 0 0 1-1.25-.93V16.5"></path><path d="M22 12v3"></path></svg>
                    </div>
                    <h3 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">Ausbildung Placement</h3>
                  </div>

                  <p className="text-lg leading-relaxed mb-10 text-gray-600 dark:text-gray-400">
                    We utilize our network of German companies to maximize your chances of finding an excellent Ausbildung match across our 10 professional sectors.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-brand-red to-red-600 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check" className="lucide lucide-check w-4 h-4 text-white"><path d="M20 6 9 17l-5-5"></path></svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Crafts, Healthcare & Tech Placement</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-brand-gold to-yellow-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check" className="lucide lucide-check w-4 h-4 text-white"><path d="M20 6 9 17l-5-5"></path></svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Valuable Employer Connections</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-800 to-black flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check" className="lucide lucide-check w-4 h-4 text-white"><path d="M20 6 9 17l-5-5"></path></svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Application Optimization & Review</span>
                    </div>
                  </div>

                  <button className="inline-flex items-center gap-2 font-medium text-brand-red hover:text-red-700 dark:hover:text-red-400 transition-colors group">
                    Discover Available Programs
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" className="lucide lucide-arrow-right w-4 h-4 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
            </div>

            {/**/}
            <div className="animate-slide-up animate-delay-400 parallax-element" data-speed="-0.1">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="layers" className="lucide lucide-layers w-4 h-4"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path></svg>
                  Comprehensive Support
                </div>
                <h3 className="text-4xl font-light tracking-tight leading-tight mb-6 text-gray-900 dark:text-white">
                  End-to-End <span className="font-semibold">Relocation Assistance</span>
                </h3>
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  From validating your German language certificates to navigating complex bureaucracy, our team supports you in making a smooth transition to your new life in Europe.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="rounded-2xl p-6 border bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 group">
                  <div className="p-3 rounded-xl w-fit mb-4 bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="file-text" className="lucide lucide-file-text w-6 h-6 text-brand-red dark:text-red-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
                  </div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Visa Preparation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Careful document preparation and embassy interview coaching.</p>
                </div>
                <div className="rounded-2xl p-6 border bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 group">
                  <div className="p-3 rounded-xl w-fit mb-4 bg-yellow-100 dark:bg-yellow-900/30 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800/40 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check-square" className="lucide lucide-check-square w-6 h-6 text-brand-gold dark:text-yellow-500"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                  </div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Certificate Verification</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Validation of your Goethe or Telc certificates to meet employer requirements.</p>
                </div>
              </div>

              <a href="#process" className="inline-flex items-center gap-2 font-medium text-lg hover:gap-3 transition-all group text-gray-900 dark:text-white">
                Explore Our Process
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" className="lucide lucide-arrow-right w-5 h-5 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/**/}
      <section id="about" className="bg-gradient-to-br from-gray-900 to-black text-white py-20 lg:py-32 relative overflow-hidden parallax-section">
        {/**/}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 parallax-element" data-speed="0.2" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0px)`, backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/**/}
            <div className="animate-slide-up animate-delay-200 parallax-element" data-speed="0.1">
              <div className="mb-10 lg:mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-8 bg-white/10 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="users" className="lucide lucide-users w-4 h-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
                  Trusted by Future Professionals
                </div>

                <div className="flex items-center gap-6 mb-10">
                  <div className="flex -space-x-4">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Student" className="h-14 w-14 sm:h-16 sm:w-16 border-gray-400/20 border-4 rounded-full shadow-xl" />
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Student" className="h-14 w-14 sm:h-16 sm:w-16 border-gray-400/10 border-4 rounded-full shadow-xl" />
                    <img src="https://randomuser.me/api/portraits/men/56.jpg" alt="Student" className="h-14 w-14 sm:h-16 sm:w-16 border-gray-400/10 border-4 rounded-full shadow-xl" />
                    <div className="h-14 w-14 sm:h-16 sm:w-16 flex bg-brand-red border-gray-400/10 border-4 rounded-full shadow-xl items-center justify-center">
                      <span className="text-xs sm:text-sm font-semibold text-white">+500</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-10">
                  <div>
                    <p className="text-4xl sm:text-5xl font-light mb-1 sm:mb-2 text-white">12+</p>
                    <p className="text-sm sm:text-base md:text-lg font-medium text-gray-300">German Cities</p>
                  </div>
                  <div>
                    <p className="text-4xl sm:text-5xl font-light mb-1 sm:mb-2 text-white">4.9</p>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                      <div className="flex gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="star" className="lucide lucide-star w-3 h-3 sm:w-4 sm:h-4 fill-current text-brand-gold"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="star" className="lucide lucide-star w-3 h-3 sm:w-4 sm:h-4 fill-current text-brand-gold"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="star" className="lucide lucide-star w-3 h-3 sm:w-4 sm:h-4 fill-current text-brand-gold"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="star" className="lucide lucide-star w-3 h-3 sm:w-4 sm:h-4 fill-current text-brand-gold"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="star" className="lucide lucide-star w-3 h-3 sm:w-4 sm:h-4 fill-current text-brand-gold"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                      </div>
                      <span className="text-sm sm:text-base md:text-lg font-medium text-gray-300">Apprentice Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/**/}
            <div className="animate-slide-up animate-delay-300 parallax-element" data-speed="-0.05">
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10">
                <div className="mb-6 sm:mb-8">
                  <div className="flex gap-1 mb-4 sm:mb-6">
                    {/**/}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 sm:w-5 sm:h-5 fill-current text-brand-gold"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 sm:w-5 sm:h-5 fill-current text-brand-gold"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 sm:w-5 sm:h-5 fill-current text-brand-gold"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 sm:w-5 sm:h-5 fill-current text-brand-gold"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 sm:w-5 sm:h-5 fill-current text-brand-gold"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                  </div>
                  <p className="text-base md:text-lg italic text-gray-300">"StudyAndWorkInGermany made my dream come true. Their visa assistance and certificate support gave me the confidence to move from Madagascar to Berlin and start my IT Ausbildung."</p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="Jean-Luc" className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-brand-red" />
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-white">Jean-Luc Rakoto</p>
                    <p className="text-xs sm:text-sm text-gray-300">IT Apprentice, Tech Start-up Berlin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/**/}
      <section id="philosophy" className="py-16 md:py-24 bg-white dark:bg-gray-950 parallax-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up animate-delay-200 parallax-element" data-speed="0.1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 bg-brand-red/10 dark:bg-red-900/30 text-brand-red dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
              Our Philosophy
            </div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4 text-gray-900 dark:text-white">
              More Than an Agency. <span className="font-semibold text-brand-red">Your Bridge</span> to Germany.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We understand the challenges of leaving home to start a new life. Our mission is to support young talents from Madagascar with honesty, care, and unwavering dedication.
            </p>
          </div>

          {/**/}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">

            {/**/}
            <div className="md:col-span-2 group relative rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-700 min-h-[280px] lg:min-h-[320px] flex flex-col justify-end animate-slide-up animate-delay-300">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80" alt="Mentorship and Guidance" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
              </div>

              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 flex items-center gap-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-[10px] font-semibold text-white tracking-wide uppercase">Real Talk</span>
              </div>

              <div className="relative z-10 p-6 lg:p-8 transform transition-transform duration-500 group-hover:-translate-y-1">
                <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center mb-4 shadow-lg text-white transform group-hover:rotate-6 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-handshake"><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3-6 6" /><path d="m14 10-2-2" /><path d="m9.41 10.59-2.58 2.59a2 2 0 1 0 2.82 2.82l2.59-2.59" /><path d="m2 15 6 6" /><path d="M4 13l3 3" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Honest Guidance</h3>
                <p className="text-gray-200 text-sm leading-relaxed max-w-sm">
                  We don't sell false promises. An Ausbildung requires hard work. We prepare you realistically for the German work culture and expectations.
                </p>
              </div>
            </div>

            {/**/}
            <div className="md:col-span-1 group relative bg-gray-50 dark:bg-gray-900 rounded-[2rem] p-6 lg:p-8 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-700 animate-slide-up animate-delay-400 min-h-[280px] lg:min-h-[320px] flex flex-col justify-between">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl group-hover:bg-brand-gold/20 transition-colors duration-700"></div>

              <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700 text-brand-gold group-hover:scale-110 transition-transform duration-500 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-compass"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Step-by-Step Mentorship</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  From your CV to securing your visa and finding your first apartment. We are by your side at every milestone.
                </p>
              </div>
            </div>

            {/**/}
            <div className="md:col-span-1 group relative bg-gray-900 dark:bg-gray-800 rounded-[2rem] p-6 lg:p-8 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 animate-slide-up animate-delay-500 min-h-[280px] lg:min-h-[320px] flex flex-col justify-between">
              <div className="absolute inset-0 opacity-20 pattern-dots group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></svg>
              </div>

              <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/10 group-hover:-translate-y-1 transition-transform duration-500 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></svg>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">Community Integration</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Connect with other Malagasy apprentices. We help you integrate smoothly so you never feel alone.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/**/}
      <section id="process" className="bg-gray-50 dark:bg-gray-900 py-32 parallax-section border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24 animate-slide-up animate-delay-200">
            <h2 className="text-4xl font-light tracking-tight mb-4 text-gray-900 dark:text-white">The Application <span className="font-semibold text-brand-red">Process</span></h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Your journey to Germany in 4 clear steps.</p>
          </div>

          <div className="relative">
            {/**/}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 hidden md:block"></div>

            <div className="grid md:grid-cols-4 gap-12">
              {/**/}
              <div className="relative animate-slide-up animate-delay-300">
                <div className="bg-white dark:bg-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-brand-red mb-6 relative z-10 shadow-lg mx-auto md:mx-0">
                  <span className="text-2xl font-bold text-brand-red">01</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white text-center md:text-left">Consultation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-center md:text-left">Initial meeting to assess your profile, goals, and verify your Goethe/Telc certificate.</p>
              </div>

              {/**/}
              <div className="relative animate-slide-up animate-delay-400">
                <div className="bg-white dark:bg-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-brand-gold mb-6 relative z-10 shadow-lg mx-auto md:mx-0">
                  <span className="text-2xl font-bold text-brand-gold">02</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white text-center md:text-left">Preparation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-center md:text-left">Profile verification and document translation/certification based on your existing language certificates.</p>
              </div>

              {/**/}
              <div className="relative animate-slide-up animate-delay-500">
                <div className="bg-white dark:bg-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-gray-900 dark:border-gray-500 mb-6 relative z-10 shadow-lg mx-auto md:mx-0">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">03</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white text-center md:text-left">Matching</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-center md:text-left">Applying to partner employers and vocational schools for your Ausbildung.</p>
              </div>

              {/**/}
              <div className="relative animate-slide-up animate-delay-600">
                <div className="bg-brand-red w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 mb-6 relative z-10 mx-auto md:mx-0">
                  <span className="text-2xl font-bold text-white">04</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white text-center md:text-left">Relocation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-center md:text-left">Visa application support, booking flights, and help settling into your new German home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/**/}
      <section id="contact" className="bg-white dark:bg-gray-950 py-16 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              {/**/}
              <div className="p-8 lg:p-16 text-white relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">Start Your <span className="font-semibold text-brand-red">Journey</span></h2>
                <p className="text-gray-400 mb-8 md:mb-12">Contact us today to schedule your free initial consultation and discover your opportunities in Germany.</p>

                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-white/10 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-5 h-5 text-brand-red"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Our Office</h4>
                      <p className="text-gray-400 text-sm md:text-base">Berlin, Germany<br />Antananarivo, Madagascar</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-white/10 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone w-5 h-5 text-brand-gold"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Call Us</h4>
                      <p className="text-gray-400 text-sm md:text-base">+49 30 123 456 78</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-white/10 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-5 h-5 text-white"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-gray-400 text-sm md:text-base break-all">info@studyandworkingermany.de</p>
                    </div>
                  </div>
                </div>
              </div>

              {/**/}
              <div className="p-8 lg:p-16 bg-white dark:bg-gray-900 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 relative overflow-hidden flex flex-col justify-center items-center text-center group">

                {/**/}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 dark:bg-brand-red/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gold/10 dark:bg-brand-gold/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 delay-100"></div>

                <div className="relative z-10 w-full max-w-sm mx-auto">
                  {/**/}
                  <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-brand-red to-red-500 rounded-3xl rotate-12 flex items-center justify-center shadow-xl shadow-red-500/30 mb-6 md:mb-8 group-hover:rotate-0 transition-all duration-500 hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white -rotate-12 group-hover:rotate-0 transition-transform duration-500 md:w-[32px] md:h-[32px] w-[24px] h-[24px]"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 tracking-tight">
                    {user ? `Welcome back, ${user.name}!` : 'Your Portal Awaits'}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 md:mb-8 leading-relaxed">
                    {user
                      ? 'Continue your application process, uploading documents securely, and connecting with your mentor.'
                      : 'Create your account today and let us guide you every step of the way – from your first German lesson to your first day at work.'}
                  </p>

                  {user ? (
                    <Link to="/user/application" className="relative inline-flex h-12 md:h-14 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                      <span className="absolute h-0 w-0 rounded-full bg-brand-red transition-all duration-500 ease-out group-hover:h-56 group-hover:w-full z-0"></span>
                      <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                        Go to My Space
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform w-4 h-4 md:w-5 md:h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                      </span>
                    </Link>
                  ) : (
                    <>
                      {/**/}
                      <button type="button" onClick={() => dispatch(openAuthModal('signup'))} className="relative inline-flex h-12 md:h-14 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                        <span className="absolute h-0 w-0 rounded-full bg-brand-red transition-all duration-500 ease-out group-hover:h-56 group-hover:w-full z-0"></span>
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                          Create Free Account
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform w-4 h-4 md:w-5 md:h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </span>
                      </button>

                      <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        <span>Already a member?</span>
                        <button type="button" onClick={() => dispatch(openAuthModal('login'))} className="font-semibold text-brand-red hover:underline focus:outline-none">Sign in</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/**/}
      <footer className="bg-gray-900 dark:bg-black text-white py-20 pb-28 md:pb-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="">
              <div className="flex items-center gap-3 mb-6">
                <img src="images/logo.png" alt="Logo" className="h-8 bg-white p-1 rounded-md" />
                <span className="font-semibold text-xl">StudyAndWorkInGermany</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Your trusted agency partner bridging the gap between Madagascar talent and German opportunities.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-brand-red transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="facebook" className="lucide lucide-facebook w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-brand-red transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="instagram" className="lucide lucide-instagram w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </a>
                <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-brand-red transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="linkedin" className="lucide lucide-linkedin w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-6">Services</h3>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Ausbildung Matching</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sector Placement</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Certificate Validation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Visa Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6">Resources</h3>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Life in Germany</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partner Clinics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6">Company</h3>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">© 2026 Gilbert Mdg. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/**/}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        id="go-to-top"
        className={`fixed right-4 md:right-8 bottom-[5.5rem] md:bottom-8 z-40 p-3 rounded-full bg-brand-red text-white shadow-lg shadow-brand-red/30 hover:bg-red-700 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center ${showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Go to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m18 15-6-6-6 6" /></svg>
      </a>

    </>
  );
}

export default HomePage;
