import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/slices/authSlice';

export const useVocationalApi = () => {
  const dispatch = useDispatch();

  const submitVocationalTest = async ({ userId, results }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/users/${userId}/vocational-test`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ results }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit test');
      }

      // Update local storage user object
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      const updatedUser = { ...storedUser, hasCompletedVocationalTest: true, vocationalTestResults: results };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      dispatch(updateUser(data.user));
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { submitVocationalTest };
};
