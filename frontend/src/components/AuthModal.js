import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeAuthModal, setAuthModalMode } from '../redux/slices/uiSlice';
import { clearError } from '../redux/slices/authSlice';
import { useAuthApi } from '../hooks/useAuthApi';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, signupUser } = useAuthApi();
  const { isAuthModalOpen: isOpen, authModalMode } = useSelector((state) => state.ui);
  const { loading, error } = useSelector((state) => state.auth);
  const isLogin = authModalMode === 'login';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const onClose = () => {
    dispatch(clearError());
    dispatch(closeAuthModal());
  };

  const handleModeSwitch = (mode) => {
    dispatch(clearError());
    dispatch(setAuthModalMode(mode));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const result = await loginUser({ email, password });
      if (result.success) onClose();
    } else {
      const result = await signupUser({ name, email, password });
      if (result.success) {
        onClose();
        navigate('/onboarding', { state: { from: location.pathname } });
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" 
        onClick={onClose}
      ></div>

      <div className={`relative w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transform transition-all duration-300 ease-out ${isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}`}>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-brand-red to-brand-gold opacity-10 pointer-events-none"></div>
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-brand-gold rounded-full mix-blend-multiply filter blur-2xl opacity-50 dark:opacity-20 animate-pulse pointer-events-none"></div>
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-brand-red rounded-full mix-blend-multiply filter blur-2xl opacity-50 dark:opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

        <button type="button" onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>

        <div className="p-8 relative z-10 mt-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isLogin ? 'Sign in to continue your journey' : 'Sign up to start your journey'}
            </p>
          </div>

          <div className="flex p-1 mb-8 bg-gray-100 dark:bg-gray-800 rounded-full relative">
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] bg-white dark:bg-gray-900 rounded-full shadow-sm transition-transform duration-300 ease-out border border-gray-200 dark:border-gray-700 ${isLogin ? 'left-1 translate-x-0' : 'left-1 translate-x-full'}`}
            ></div>
            <button 
              type="button" 
              onClick={() => handleModeSwitch('login')} 
              className={`flex-1 relative z-10 py-2 text-sm font-semibold rounded-full transition-colors ${isLogin ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
            >
              Login
            </button>
            <button 
              type="button" 
              onClick={() => handleModeSwitch('signup')} 
              className={`flex-1 relative z-10 py-2 text-sm font-semibold rounded-full transition-colors ${!isLogin ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-800">
                {error}
              </div>
            )}
            {!isLogin && (
              <div className="transition-all duration-300">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                  <input type="text" required={!isLogin} value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400" placeholder="John Doe" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </div>
                <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none" title="Toggle Password Visibility">
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end mb-2">
                <a href="#" className="text-xs font-medium text-brand-red hover:text-red-700 transition-colors">Forgot password?</a>
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-gradient-to-r from-brand-red to-red-600 text-white rounded-xl font-semibold shadow-lg shadow-brand-red/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={() => handleModeSwitch(isLogin ? 'signup' : 'login')} className="font-semibold text-brand-red hover:text-red-700 transition-colors">
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
