import React from 'react';

export default function Toolbar({ viewMode, setViewMode, isBold, setIsBold, isItalic, setIsItalic }) {
  return (
    <div className="bg-slate-900/50 border-b border-slate-800/80 px-6 py-2.5 flex items-center justify-between gap-4 backdrop-blur-sm">
      
      {/* Left Side: Formatting Options */}
      <div className="flex items-center space-x-1">
        <button 
          onClick={() => setIsBold(!isBold)}
          className={`p-2 rounded-md font-bold text-sm transition-all ${isBold ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
          title="Bold"
        >
          B
        </button>
        <button 
          onClick={() => setIsItalic(!isItalic)}
          className={`p-2 rounded-md italic font-serif text-sm transition-all ${isItalic ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
          title="Italic"
        >
          I
        </button>
        <div className="h-4 w-[1px] bg-slate-800 mx-2"></div>
        <button className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-md text-xs font-medium text-slate-300 hover:bg-slate-700 transition-all">
          💾 Save Worksheet
        </button>
      </div>

      {/* Right Side: Tab View Switcher */}
      <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center space-x-1">
        <button
          onClick={() => setViewMode('grid')}
          className={`px-4 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all duration-200 ${viewMode === 'grid' ? 'bg-indigo-600 text-white font-semibold shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
        >
          📊 Grid Sheet
        </button>
        <button
          onClick={() => setViewMode('dashboard')}
          className={`px-4 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all duration-200 ${viewMode === 'dashboard' ? 'bg-indigo-600 text-white font-semibold shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
        >
          📈 Dashboard Canvas
        </button>
      </div>

    </div>
  );
}