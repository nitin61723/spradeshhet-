import React from 'react';

export default function FormulaBar({ activeCell, cellValue, onCellValueChange }) {
  return (
    <div className="flex items-center px-4 py-1.5 border-b bg-slate-900 border-slate-800 text-slate-300">
      
      {/* Active Cell Address Indicator */}
      <div className="flex items-center justify-center min-w-[50px] px-2 py-1 text-xs font-bold font-mono tracking-wide bg-slate-950/60 border border-slate-850 rounded text-indigo-400 select-none shadow-inner">
        {activeCell}
      </div>

      {/* Vertical divider */}
      <div className="w-px h-5 mx-3 bg-slate-800"></div>

      {/* Formula Icon Label "fx" */}
      <div className="flex items-center mr-2 select-none">
        <span className="text-xs font-extrabold italic text-slate-500 font-mono select-none">fx</span>
      </div>

      {/* Formula Input Field */}
      <div className="relative flex-1">
        <input
          type="text"
          value={cellValue || ''}
          onChange={(e) => onCellValueChange(e.target.value)}
          placeholder="Enter text, numbers, or a formula starting with ="
          className="w-full h-7 px-3 text-xs bg-slate-950 border border-slate-800/80 rounded-md text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-650 transition-all duration-200"
        />
        
        {/* Subtle glow border when input has content */}
        {cellValue && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="text-[10px] font-semibold text-indigo-500 bg-indigo-950/40 border border-indigo-900/60 px-1.5 py-0.2 rounded-full">
              fx Mode
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
