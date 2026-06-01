import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, History } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 bg-transparent">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-2xl mb-2 border border-brand-orange/20 shadow-[0_0_30px_rgba(255,126,51,0.08)]">
            <Activity className="w-8 h-8 text-brand-orange" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ff4b1f]">Fitness Tracking</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
            Revolutionize your workout with real-time posture detection. Precision tracking for push-ups and squats using just your camera.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Link to="/instructions/pushups" className="group">
            <div className="relative overflow-hidden rounded-2xl premium-glass-card p-7 transform hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                <Activity className="w-24 h-24 text-brand-orange" />
              </div>
              <div className="relative z-10 text-left space-y-4">
                <div className="w-9 h-9 rounded-xl bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20">
                  <Activity className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1.5">Push-ups</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Master your form with real-time elbow angle tracking.</p>
                </div>
                <div className="flex items-center text-brand-orange font-semibold text-sm">
                  Start Session <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          <Link to="/instructions/squats" className="group">
            <div className="relative overflow-hidden rounded-2xl premium-glass-card p-7 transform hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                <Activity className="w-24 h-24 text-brand-orange" />
              </div>
              <div className="relative z-10 text-left space-y-4">
                <div className="w-9 h-9 rounded-xl bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20">
                  <Activity className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1.5">Squats</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Optimize your lower body power with hip and knee analysis.</p>
                </div>
                <div className="flex items-center text-brand-orange font-semibold text-sm">
                  Start Session <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="pt-8 border-t border-brand-border">
          <Link to="/history" className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-all premium-glass-card rounded-xl hover:scale-[1.02] group">
            <History className="w-4 h-4 mr-2 text-brand-orange group-hover:rotate-[-10deg] transition-transform" />
            View Personal History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
