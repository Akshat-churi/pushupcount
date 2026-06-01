import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, History, Home, BookOpen, MessageCircle, Trophy } from 'lucide-react';
import { useUserPoints } from '../hooks/useUserPoints';

const Navbar = () => {
  const location = useLocation();
  const points = useUserPoints();

  return (
    <nav className="bg-brand-dark/80 backdrop-blur-md border-b border-brand-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-brand-orange p-2 rounded-lg group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,126,51,0.3)]">
                <Activity className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                FitTrack <span className="text-brand-orange">AI</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 shadow-[0_0_20px_rgba(255,126,51,0.1)]">
              <Trophy className="w-4 h-4 text-brand-orange" />
              <span className="text-sm font-black text-white uppercase tracking-tighter">
                {points.toLocaleString()} <span className="text-brand-orange ml-0.5">PTS</span>
              </span>
            </div>
          </div>
          
          <div className="flex space-x-2 sm:space-x-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                location.pathname === '/' 
                  ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' 
                  : 'text-slate-400 hover:text-white hover:bg-brand-surface border-transparent'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/history"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                location.pathname === '/history' 
                  ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' 
                  : 'text-slate-400 hover:text-white hover:bg-brand-surface border-transparent'
              }`}
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </Link>
            <Link
              to="/guide"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                location.pathname === '/guide' 
                  ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' 
                  : 'text-slate-400 hover:text-white hover:bg-brand-surface border-transparent'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Guide</span>
            </Link>
            <Link
              to="/chat"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                location.pathname === '/chat' 
                  ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' 
                  : 'text-slate-400 hover:text-white hover:bg-brand-surface border-transparent'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Chat</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
