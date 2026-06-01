const STORAGE_KEY = 'fittrack_history';
const POINTS_KEY = 'fittrack_points';

/**
 * Saves a workout session to localStorage.
 */
export const saveWorkoutSession = (session) => {
  const history = getWorkoutHistory();
  const newSession = {
    ...session,
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
  
  history.unshift(newSession);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

/**
 * Retrieves the workout history from localStorage.
 */
export const getWorkoutHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to parse workout history', error);
    return [];
  }
};

/**
 * Retrieves total points.
 */
export const getUserPoints = () => {
  const points = localStorage.getItem(POINTS_KEY);
  return points ? parseInt(points, 10) : 0;
};

/**
 * Adds points and triggers a sync event.
 */
export const addUserPoints = (amount) => {
  const currentPoints = getUserPoints();
  const newPoints = currentPoints + amount;
  localStorage.setItem(POINTS_KEY, newPoints.toString());
  
  // Dispatch custom event for cross-component sync
  window.dispatchEvent(new CustomEvent('fittrack_points_updated', { detail: newPoints }));
};

/**
 * Clears all workout history and optionally points.
 */
export const clearWorkoutHistory = (includePoints = false) => {
  localStorage.removeItem(STORAGE_KEY);
  if (includePoints) {
    localStorage.removeItem(POINTS_KEY);
    window.dispatchEvent(new CustomEvent('fittrack_points_updated', { detail: 0 }));
  }
};
