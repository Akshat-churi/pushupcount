import { useState, useCallback, useRef } from 'react';
import { calculateAngle } from '../utils/angleCalculator';

export const useExerciseTracker = (type) => {
  const [reps, setReps] = useState(0);
  const [status, setStatus] = useState('UP'); // 'UP' or 'DOWN'
  // Use a ref to store the latest status to avoid stale closures in callbacks
  const statusRef = useRef('UP');

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
    statusRef.current = newStatus;
  };

  const processLandmarks = useCallback((landmarks) => {
    if (!landmarks || landmarks.length === 0) return;

    if (type === 'pushups') {
      // Use left side (11: shoulder, 13: elbow, 15: wrist) or right side (12, 14, 16)
      // Usually checking visibility is good, let's use left side as primary
      const shoulder = landmarks[11];
      const elbow = landmarks[13];
      const wrist = landmarks[15];

      if (shoulder && elbow && wrist && shoulder.visibility > 0.5 && elbow.visibility > 0.5 && wrist.visibility > 0.5) {
        const angle = calculateAngle(shoulder, elbow, wrist);

        if (angle > 160) {
          if (statusRef.current === 'DOWN') {
            setReps((prev) => prev + 1);
          }
          updateStatus('UP');
        } else if (angle < 90) {
          updateStatus('DOWN');
        }
      }
    } else if (type === 'squats') {
      // Use left side (23: hip, 25: knee, 27: ankle)
      const hip = landmarks[23];
      const knee = landmarks[25];
      const ankle = landmarks[27];

      if (hip && knee && ankle && hip.visibility > 0.5 && knee.visibility > 0.5 && ankle.visibility > 0.5) {
        const angle = calculateAngle(hip, knee, ankle);

        if (angle > 160) {
          if (statusRef.current === 'DOWN') {
            setReps((prev) => prev + 1);
          }
          updateStatus('UP');
        } else if (angle < 90) {
          updateStatus('DOWN');
        }
      }
    }
  }, [type]);

  const resetReps = useCallback(() => {
    setReps(0);
    updateStatus('UP');
  }, []);

  return { reps, status, processLandmarks, resetReps };
};
