import React from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass = "text-emerald-500" }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-4 shadow-md border border-slate-700/50 flex items-center justify-between transition-transform hover:scale-[1.01]">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
      </div>
      <div className={`p-2.5 rounded-lg bg-slate-900/50 ${colorClass} shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default StatCard;
