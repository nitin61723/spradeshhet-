import React from 'react';

export default function Navbar() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        {/* Logo Icon */}
        <div className="bg-indigo-600 p-2 rounded-lg text-white font-bold text-lg shadow-md shadow-indigo-500/20">
          ⚡
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            VibeSheets <span className="text-xs bg-indigo-500/10 text-indigo-400 font-medium px-2 py-0.5 rounded-full border border-indigo-500/20">B.Tech Edition</span>
          </h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Local Engine Active
        </span>
        <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center font-bold text-sm text-slate-300">
          PN
        </div>
      </div>
    </header>
  );
}