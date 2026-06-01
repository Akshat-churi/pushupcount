import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Camera, Smartphone, ChevronRight } from 'lucide-react';

const Instructions = () => {
  const { type } = useParams();
  
  const config = {
    pushups: {
      title: "Push-ups Training",
      instruction: "Position your device at floor level, about 3-5 feet away. Your full side profile from head to toe should be visible.",
    },
    squats: {
      title: "Squats Training",
      instruction: "Place your device at hip height or floor level. Ensure your entire side profile (hips, knees, and ankles) is visible.",
    }
  };

  const { title, instruction } = config[type] || config.pushups;
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-transparent">
      <div className="max-w-2xl w-full premium-glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <h2 className="text-3xl font-bold mb-6 text-white tracking-tight leading-tight">
          System <span className="text-brand-orange">Calibration</span>
          <p className="text-sm font-bold text-slate-400 mt-1.5 tracking-wider uppercase">{title}</p>
        </h2>
        
        <div className="space-y-6 relative z-10">
          <div className="flex items-start gap-4 bg-brand-dark/50 p-5 rounded-xl border border-brand-border transition-all hover:border-brand-orange/30 group">
            <div className="p-2.5 rounded-lg bg-brand-orange/10 border border-brand-orange/20 group-hover:scale-110 transition-transform shrink-0">
              <Smartphone className="w-5 h-5 text-brand-orange" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Device Alignment</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{instruction}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 bg-brand-dark/50 p-5 rounded-xl border border-brand-border transition-all hover:border-brand-orange/30 group">
            <div className="p-2.5 rounded-lg bg-brand-orange/10 border border-brand-orange/20 group-hover:scale-110 transition-transform shrink-0">
              <Camera className="w-5 h-5 text-brand-orange" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Vision Privacy</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                FitTrack AI processes all visual data locally on your device hardware. No video feed ever leaves your browser.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link 
              to={`/workout/${type}`}
              className="w-full flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-all rounded-xl bg-brand-orange hover:bg-[#ff8f4d] shadow-[0_4px_12px_rgba(255,126,51,0.15)] hover:shadow-[0_6px_20px_rgba(255,126,51,0.3)] hover:-translate-y-0.5 active:translate-y-0"
            >
              INITIALIZE CAMERA
              <ChevronRight className="ml-1.5 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
