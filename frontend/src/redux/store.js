import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import vocationalReducer from './slices/vocationalSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    vocational: vocationalReducer,
  },
});
