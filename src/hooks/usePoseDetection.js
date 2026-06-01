import { useEffect, useRef, useState } from 'react';

// Using globals loaded from index.html CDN scripts
const Pose = window.Pose;
const POSE_CONNECTIONS = window.POSE_CONNECTIONS;
const Camera = window.Camera;
const drawConnectors = window.drawConnectors;
const drawLandmarks = window.drawLandmarks;

export const usePoseDetection = ({ videoRef, canvasRef, onResults }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const poseRef = useRef(null);
  const cameraRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    let active = true;

    if (!videoRef.current || !canvasRef.current) return;

    poseRef.current = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      }
    });

    poseRef.current.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    poseRef.current.onResults((results) => {
      // Clear error if we get results
      setErrorMsg(null);
      
      if (!active) return;
      if (!canvasRef.current || !videoRef.current) return;

      const canvasCtx = canvasRef.current.getContext('2d');
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Draw video frame to canvas
      canvasCtx.drawImage(
        results.image, 0, 0, canvasRef.current.width, canvasRef.current.height
      );

      if (results.poseLandmarks) {
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                       {color: '#00FF00', lineWidth: 4});
        drawLandmarks(canvasCtx, results.poseLandmarks,
                      {color: '#FF0000', lineWidth: 2});
        
        if (onResults) {
          onResults(results.poseLandmarks);
        }
      }
      canvasCtx.restore();
    });

    // We only start the camera manually when requested, not immediately on mount
    return () => {
      active = false;
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (poseRef.current) {
        poseRef.current.close();
      }
    };
  }, [videoRef, canvasRef, onResults]);

  const startCamera = async () => {
    if (videoRef.current && poseRef.current) {
      try {
        // Pre-initialize the model so it doesn't block on the first frame
        await poseRef.current.initialize();
        
        cameraRef.current = new Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current && videoRef.current.readyState >= 2) { // HAVE_CURRENT_DATA
              try {
                await poseRef.current.send({ image: videoRef.current });
              } catch (error) {
                console.error("Error in pose.send:", error);
                setErrorMsg(`Pose error: ${error.message}`);
              }
            }
          },
          width: 1280,
          height: 720
        });
        await cameraRef.current.start();
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to start camera or initialize pose:", error);
        setErrorMsg(`Init error: ${error.message}`);
      }
    }
  };

  const startVideoFile = async (videoEl) => {
    if (poseRef.current && videoEl) {
      try {
        await poseRef.current.initialize();
        setIsLoaded(true);

        const processFrame = async () => {
          if (!videoEl.paused && !videoEl.ended) {
            try {
              await poseRef.current.send({ image: videoEl });
            } catch (error) {
              console.error("Error in pose.send:", error);
              setErrorMsg(`Pose error: ${error.message}`);
            }
          }
          if (!videoEl.ended) {
            animationFrameId.current = requestAnimationFrame(processFrame);
          }
        };

        // Start processing once the video plays
        videoEl.onplay = () => {
           processFrame();
        };
        videoEl.play();
      } catch (error) {
        console.error("Failed to start video or initialize pose:", error);
        setErrorMsg(`Init error: ${error.message}`);
      }
    }
  };

  const stopCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.stop();
    }
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    setIsLoaded(false);
  };

  return { isLoaded, errorMsg, startCamera, startVideoFile, stopCamera };
};
