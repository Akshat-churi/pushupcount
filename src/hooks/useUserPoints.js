import { useState, useEffect } from 'react';
import { getUserPoints } from '../utils/storage';

export const useUserPoints = () => {
  const [points, setPoints] = useState(getUserPoints());

  useEffect(() => {
    const handlePointsUpdate = (event) => {
      setPoints(event.detail);
    };

    // Listen for custom internal events
    window.addEventListener('fittrack_points_updated', handlePointsUpdate);
    
    // Also listen for standard storage events (if changed in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'fittrack_points') {
        setPoints(parseInt(e.newValue, 10) || 0);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('fittrack_points_updated', handlePointsUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return points;
};
