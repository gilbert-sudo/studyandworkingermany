import { useEffect } from 'react';

const useWakeUpBackend = () => {
  useEffect(() => {
    // Ping backend to wake it up if it's sleeping (e.g. on free hosting)
    const wakeUpBackend = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || '';
        const response = await fetch(`${API_URL}/api/status`);
        if (response.ok) {
          console.log('✅ Backend is awake and responded successfully!');
        }
      } catch (error) {
        console.log('Backend wake up ping failed:', error);
      }
    };
    
    wakeUpBackend();
  }, []);
};

export default useWakeUpBackend;
