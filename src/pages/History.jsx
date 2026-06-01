import React, { useState, useEffect } from 'react';
import { Trash2, Calendar, Clock, Activity, Target } from 'lucide-react';
import { getWorkoutHistory, clearWorkoutHistory } from '../utils/storage';

const History = () => {
  const [history, setHistory] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setHistory(getWorkoutHistory());
  }, []);

  const handleClear = () => {
    if (showConfirm) {
      clearWorkoutHistory();
      setHistory([]);
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-transparent p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1.5 tracking-tight">Activity <span className="text-brand-orange">Logs</span></h1>
            <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase">Historical performance and metabolic tracking.</p>
          </div>
          {history.length > 0 && (
            <button 
              onClick={handleClear}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-500/5 text-red-500 rounded-xl hover:bg-red-500/10 transition-all border border-red-500/20 text-xs font-semibold"
            >
              <Trash2 className="w-4 h-4" />
              {showConfirm ? 'Confirm Clear' : 'Reset All Logs'}
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="premium-glass-card rounded-2xl p-10 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-brand-dark rounded-2xl mb-4 border border-brand-border">
              <Activity className="w-10 h-10 text-slate-700" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1.5">No Data Recorded</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed font-medium">
              Your metabolic history is empty. Complete a workout session to begin tracking.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((session) => (
              <div 
                key={session.id} 
                className="premium-glass-card rounded-2xl p-5 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full -mr-6 -mt-6 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-brand-orange/10 border border-brand-orange/20">
                      <Target className="w-4 h-4 text-brand-orange" />
                    </div>
                    <span className="font-bold text-base text-white tracking-tight">{session.exerciseType}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white">{session.reps}</span>
                    <p className="text-[8px] font-bold text-brand-orange uppercase tracking-wider -mt-1">Reps</p>
                  </div>
                </div>
                
                <div className="space-y-2.5 relative z-10">
                  <div className="flex items-center text-slate-400 text-xs font-semibold bg-brand-dark p-3 rounded-xl border border-brand-border/50 group-hover:border-brand-orange/10 transition-colors">
                    <Clock className="w-4 h-4 mr-3 text-brand-orange/60 shrink-0" />
                    <span className="tracking-wide">Duration: {session.duration}</span>
                  </div>
                  <div className="flex items-center text-slate-400 text-xs font-semibold bg-brand-dark p-3 rounded-xl border border-brand-border/50 group-hover:border-brand-orange/10 transition-colors">
                    <Calendar className="w-4 h-4 mr-3 text-brand-orange/60 shrink-0" />
                    <span className="tracking-wide">{session.date} • {session.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
