import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Square, RotateCcw, Activity, Clock, ArrowUpCircle, ArrowDownCircle, Trophy } from 'lucide-react';
import { usePoseDetection } from '../hooks/usePoseDetection';
import { useExerciseTracker } from '../hooks/useExerciseTracker';
import { useTimer } from '../hooks/useTimer';
import { saveWorkoutSession, addUserPoints } from '../utils/storage';
import StatCard from '../components/StatCard';

const Workout = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [workoutState, setWorkoutState] = useState('IDLE'); // IDLE, RUNNING, FINISHED
  const [isVideoMirrored, setIsVideoMirrored] = useState(true);

  const { reps, status, processLandmarks, resetReps } = useExerciseTracker(type);
  const { time, formattedTime, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  const handlePoseResults = (landmarks) => {
    processLandmarks(landmarks);
  };

  const { isLoaded, errorMsg, startCamera, startVideoFile, stopCamera } = usePoseDetection({
    videoRef,
    canvasRef,
    onResults: handlePoseResults,
  });

  const handleStart = async () => {
    setWorkoutState('RUNNING');
    setIsVideoMirrored(true);
    startTimer();
    
    if (videoRef.current) {
      videoRef.current.src = "";
    }
    await startCamera();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsVideoMirrored(false);
    const fileUrl = URL.createObjectURL(file);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.src = fileUrl;
    }

    setWorkoutState('RUNNING');
    startTimer();
    await startVideoFile(videoRef.current);
  };

  const handleVideoEnded = () => {
    if (workoutState === 'RUNNING') {
      handleStop();
    }
  };

  const handleStop = () => {
    setWorkoutState('FINISHED');
    stopTimer();
    stopCamera();
    
    if (time > 0) {
      const pointsEarned = reps * (type === 'pushups' ? 10 : 5);
      addUserPoints(pointsEarned);
      
      saveWorkoutSession({
        exerciseType: type === 'pushups' ? 'Push-ups' : 'Squats',
        reps,
        duration: formattedTime,
        pointsEarned
      });
    }
  };

  const handleReset = () => {
    resetReps();
    resetTimer();
    setWorkoutState('IDLE');
  };

  useEffect(() => {
    return () => {
      stopCamera();
      stopTimer();
    };
  }, []);

  const themeColor = 'brand-orange';
  const colorClass = 'text-brand-orange';
  const bgClass = 'bg-brand-orange';
  const hoverClass = 'hover:bg-[#ff8f4d]';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-transparent p-4 md:p-6 flex flex-col">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-3 gap-6 flex-grow">
        
        {/* Left Column: Camera Feed */}
        <div className="lg:col-span-2 flex flex-col premium-glass-card rounded-2xl overflow-hidden relative">
          
          {workoutState === 'IDLE' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-dark/90 z-20 backdrop-blur-sm">
              <div className="p-4 rounded-xl bg-brand-orange/10 border border-brand-orange/20 mb-4 shadow-[0_0_30px_rgba(255,126,51,0.08)]">
                <Activity className={`w-8 h-8 ${colorClass}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-1.5 tracking-tight text-center">Ready to Begin?</h3>
              <p className="text-slate-400 mb-5 text-sm text-center px-4">Ensure your entire body profile is clearly visible in the frame.</p>
              <button 
                onClick={handleStart}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105 shadow-md ${bgClass} ${hoverClass}`}
              >
                <Play fill="currentColor" className="w-4 h-4" /> START WORKOUT
              </button>
            </div>
          )}

          {workoutState === 'FINISHED' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-dark/95 z-20 p-6 text-center backdrop-blur-md">
              <div className="p-4 rounded-xl bg-brand-orange/10 border border-brand-orange/20 mb-4">
                <Activity className={`w-8 h-8 ${colorClass}`} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Session Complete</h3>
              <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                Outstanding performance! You completed <span className="text-white font-bold">{reps} {type}</span> in <span className="text-white font-bold">{formattedTime}</span>.
              </p>
              <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-xl px-5 py-2.5 mb-6 flex items-center gap-3">
                <Trophy className="w-5 h-5 text-brand-orange" />
                <div className="text-left">
                  <p className="text-[9px] font-bold text-brand-orange uppercase tracking-wider">Metabolic Points</p>
                  <p className="text-xl font-bold text-white">+{reps * (type === 'pushups' ? 10 : 5)} <span className="text-xs font-medium text-slate-500">PTS</span></p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                <button 
                  onClick={handleReset}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-border hover:bg-brand-surface transition-all border border-white/5"
                >
                  Repeat Session
                </button>
                <button 
                  onClick={() => navigate('/history')}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-md ${bgClass} ${hoverClass}`}
                >
                  View Records
                </button>
              </div>
            </div>
          )}

          <div className="relative flex-grow bg-black flex items-center justify-center overflow-hidden min-h-[400px]">
            <video 
              ref={videoRef} 
              onEnded={handleVideoEnded}
              className={`absolute top-4 left-4 w-44 h-32 object-cover border-2 border-brand-orange/30 rounded-xl z-30 shadow-2xl ${isVideoMirrored ? 'transform scale-x-[-1]' : ''}`} 
              playsInline
              autoPlay
              muted
            />
            <canvas 
              ref={canvasRef} 
              className={`w-full h-full object-cover ${isVideoMirrored ? 'transform scale-x-[-1]' : ''}`} 
              width={1280} 
              height={720}
            />
            
            {workoutState === 'RUNNING' && !isLoaded && !errorMsg && (
              <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/60 z-10 backdrop-blur-sm">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-brand-orange"></div>
              </div>
            )}
            
            {errorMsg && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-dark/90 z-20 p-6 text-center">
                <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20 max-w-md shadow-2xl">
                  <h4 className="text-xl font-bold mb-2 text-red-500 tracking-tight uppercase">System Error</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{errorMsg}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Stats & Controls */}
        <div className="flex flex-col gap-6">
          <div className="premium-glass-card rounded-2xl p-5 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20">
                <Activity className="w-4 h-4 text-brand-orange" />
              </div>
              <h2 className="text-lg font-bold capitalize text-white tracking-tight">
                {type === 'pushups' ? 'Push-up Tracking' : 'Squat Tracking'}
              </h2>
            </div>
            
            <div className="space-y-3">
              <StatCard 
                title="Repetitions" 
                value={reps} 
                icon={Activity} 
                colorClass="text-white" 
              />
              
              <StatCard 
                title="Elapsed Time" 
                value={formattedTime} 
                icon={Clock} 
                colorClass="text-slate-300" 
              />

              <div className="p-4 rounded-xl bg-brand-dark border border-brand-border flex items-center justify-between group transition-all hover:border-brand-orange/30">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors ${status === 'UP' ? 'bg-blue-500/10' : 'bg-brand-orange/10'}`}>
                    {status === 'UP' ? (
                      <ArrowUpCircle className={`w-5 h-5 ${status === 'UP' ? 'text-blue-400' : 'text-brand-orange'}`} />
                    ) : (
                      <ArrowDownCircle className={`w-5 h-5 ${status === 'UP' ? 'text-blue-400' : 'text-brand-orange'}`} />
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Status</p>
                    <p className={`text-lg font-bold ${status === 'UP' ? 'text-blue-400' : 'text-brand-orange'}`}>{status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="premium-glass-card rounded-2xl p-5 mt-auto">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">Session Controls</h3>
            <div className="flex flex-col gap-3">
              {workoutState === 'RUNNING' ? (
                <button 
                  onClick={handleStop}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-red-500 hover:bg-red-600 transition-all shadow-md active:scale-95"
                >
                  <Square fill="currentColor" className="w-4 h-4" /> END SESSION
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={handleStart}
                    disabled={workoutState === 'FINISHED'}
                    className={`flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-20 shadow-md ${bgClass} ${hoverClass} active:scale-95`}
                  >
                    <Play fill="currentColor" className="w-4 h-4" /> LIVE
                  </button>
                  
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={workoutState === 'FINISHED'}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-20 bg-indigo-600 hover:bg-indigo-500 shadow-md active:scale-95"
                  >
                    UPLOAD
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    accept="video/mp4,video/quicktime,video/webm" 
                    className="hidden" 
                  />
                </div>
              )}
              
              <button 
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-400 bg-brand-dark hover:bg-brand-border hover:text-white transition-all border border-brand-border"
              >
                <RotateCcw className="w-4 h-4" /> Reset Counters
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Workout;
