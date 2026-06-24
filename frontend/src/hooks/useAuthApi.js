import { useDispatch } from 'react-redux';
import { authStart, authSuccess, authFailure, updateUser } from '../redux/slices/authSlice';

export const useAuthApi = () => {
  const dispatch = useDispatch();
  const API_URL = `${process.env.REACT_APP_API_URL || ''}/api/auth`;

  const loginUser = async (credentials) => {
    dispatch(authStart());
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      dispatch(authSuccess(data));
      return { success: true, data };
    } catch (error) {
      dispatch(authFailure(error.message || 'Login failed'));
      return { success: false, error: error.message };
    }
  };

  const signupUser = async (userData) => {
    dispatch(authStart());
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      dispatch(authSuccess(data));
      return { success: true, data };
    } catch (error) {
      dispatch(authFailure(error.message || 'Signup failed'));
      return { success: false, error: error.message };
    }
  };

  return { loginUser, signupUser };
};
