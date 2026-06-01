import { useState } from 'react';

export default function SpreadsheetGrid({ gridData, setGridData, isBold, isItalic, isUnderline, isStrike, textAlign }) {
  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  // Controls the premium paywall modal visibility
  const [showPaywall, setShowPaywall] = useState(false);

  const handleCellChange = (rowIndex, colIndex, value) => {
    // PAYWALL GUARD: Block edits on row index >= 10 (simulates Row 11+ barrier)
    if (rowIndex >= 10) {
      setShowPaywall(true); // Show premium upgrade modal instead
      return;              // Stop: do NOT save the typed value
    }

    // Rows 1-10 (indices 0-9) remain fully editable
    const updatedData = [...gridData];
    updatedData[rowIndex][colIndex] = value;
    setGridData(updatedData);
  };

  const getInputClassName = (isLocked) => {
    const alignmentClass =
      textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left';

    return [
      'w-full h-full px-3 py-1.5 text-sm outline-none border-none bg-transparent',
      isBold ? 'font-bold' : '',
      isItalic ? 'italic' : '',
      isUnderline ? 'underline' : '',
      isStrike ? 'line-through' : '',
      alignmentClass,
      isLocked ? 'cursor-not-allowed text-slate-600 select-none' : 'text-slate-200 focus:bg-slate-950/40',
    ]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <div className="flex-1 w-full h-full p-4 overflow-auto bg-slate-950 flex flex-col min-h-0">

      {/* ============================================================
          PREMIUM PAYWALL MODAL OVERLAY
          ============================================================ */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowPaywall(false)}
          />

          {/* Modal Panel */}
          <div className="relative z-10 w-full max-w-md mx-4 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
            
            {/* Glowing top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500" />

            {/* Content */}
            <div className="p-8 flex flex-col items-center text-center">
              
              {/* Icon Badge */}
              <div className="flex items-center justify-center w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-500 shadow-lg shadow-indigo-900/50">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-xl font-extrabold tracking-tight text-white mb-2">
                Row Limit Reached
              </h2>

              {/* Tier Badge */}
              <span className="mb-4 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                Free Tier · 10 Row Limit
              </span>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Row limit reached on Free Tier! Upgrade to{' '}
                <span className="font-semibold text-indigo-400">Premium</span> to unlock full
                enterprise row data structures and unlimited spreadsheet scale.
              </p>

              {/* Feature list */}
              <ul className="w-full text-left space-y-2 mb-7">
                {[
                  'Unlimited rows & columns',
                  'Real-time cloud sync & collaboration',
                  'Advanced formula engine',
                  'Priority customer support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-slate-300">
                    <svg className="w-4 h-4 mr-2.5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  className="flex-1 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-indigo-900/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => setShowPaywall(false)}
                >
                  Upgrade to Premium →
                </button>
                <button
                  className="flex-1 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-slate-200 border border-slate-700 transition-all duration-200"
                  onClick={() => setShowPaywall(false)}
                >
                  Stay on Free
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          SPREADSHEET TABLE
          ============================================================ */}
      <div className="flex-1 overflow-auto border border-slate-800 rounded-xl bg-slate-900 shadow-2xl">
        <table className="w-full border-collapse table-fixed select-none">
          <thead className="sticky top-0 z-20 bg-slate-950 shadow-sm">
            <tr>
              <th className="w-12 p-2 border border-slate-800 text-center text-xs font-bold text-slate-500 bg-slate-950">#</th>
              {columns.map((col) => (
                <th key={col} className="w-28 p-2 border border-slate-800 text-center text-xs font-bold text-slate-400 tracking-wider">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gridData.map((row, rowIndex) => {
              const isLocked = rowIndex >= 10;
              return (
                <tr
                  key={rowIndex}
                  className={`transition-colors ${isLocked ? 'bg-slate-950/80 opacity-50' : 'hover:bg-slate-800/30'}`}
                >
                  {/* Row Number Header */}
                  <td className={`p-1.5 border border-slate-800 text-center text-xs font-mono font-medium sticky left-0 z-10 ${isLocked ? 'text-rose-700 bg-rose-950/30' : 'text-slate-600 bg-slate-950/50'}`}>
                    {isLocked ? '🔒' : rowIndex + 1}
                  </td>

                  {/* Data Cells */}
                  {row.map((cellValue, colIndex) => (
                    <td
                      key={colIndex}
                      className={`p-0 border border-slate-800 ${isLocked ? 'bg-slate-900/30 cursor-not-allowed' : 'bg-slate-900 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:z-10'}`}
                    >
                      <input
                        type="text"
                        value={cellValue}
                        readOnly={isLocked}
                        onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                        onClick={() => isLocked && setShowPaywall(true)}
                        className={getInputClassName(isLocked)}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer info bar */}
      <div className="mt-3 flex items-center justify-between bg-indigo-950/40 border border-indigo-900/60 rounded-lg px-4 py-2">
        <p className="text-xs text-indigo-300 font-medium tracking-wide">
          🔒 <span className="font-semibold text-indigo-200">Free Tier:</span> Rows 11–100 are locked. Upgrade to Premium to unlock unlimited rows.
        </p>
        <button
          onClick={() => setShowPaywall(true)}
          className="text-[10px] bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm hover:from-violet-500 hover:to-indigo-500 transition-all duration-150"
        >
          Upgrade
        </button>
      </div>
    </div>
  );
}
