import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
  }
  return false; // Default to light mode
};

const initialState = {
  isAuthModalOpen: false,
  authModalMode: 'login', // 'login' or 'signup'
  currentLang: 'EN',
  isDarkMode: getInitialTheme(),
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAuthModal: (state, action) => {
      state.isAuthModalOpen = true;
      if (action.payload && (action.payload === 'login' || action.payload === 'signup')) {
        state.authModalMode = action.payload;
      }
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    setAuthModalMode: (state, action) => {
      state.authModalMode = action.payload;
    },
    setCurrentLang: (state, action) => {
      state.currentLang = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    }
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  setAuthModalMode,
  setCurrentLang,
  toggleDarkMode,
  setDarkMode
} = uiSlice.actions;

export default uiSlice.reducer;
