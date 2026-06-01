import { useState } from 'react';

export default function SpreadsheetGrid({ gridData, setGridData, isBold, isItalic, isUnderline, isStrike, textAlign }) {
  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const [showPaywall, setShowPaywall] = useState(false);

  const handleCellChange = (rowIndex, colIndex, value) => {
    if (rowIndex >= 10) {
      setShowPaywall(true);
      return;
    }

    const updatedData = gridData.map((row, currentRowIndex) =>
      currentRowIndex === rowIndex
        ? row.map((cell, currentColIndex) => (currentColIndex === colIndex ? value : cell))
        : row
    );

    setGridData(updatedData);
  };

  const alignmentClass =
    textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left';

  return (
    <div className="flex-1 w-full h-full p-4 overflow-auto bg-slate-950 flex flex-col min-h-0">
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            aria-label="Close upgrade dialog"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowPaywall(false)}
          />

          <div className="relative z-10 w-full max-w-md mx-4 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
            <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500" />

            <div className="flex flex-col items-center p-8 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-500 shadow-lg shadow-indigo-900/50">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h2 className="mb-2 text-xl font-extrabold tracking-tight text-white">Row Limit Reached</h2>

              <span className="mb-4 inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                Free Tier - 10 Row Limit
              </span>

              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                Row limit reached on Free Tier. Upgrade to{' '}
                <span className="font-semibold text-indigo-400">Premium</span> to unlock full
                enterprise row data structures and unlimited spreadsheet scale.
              </p>

              <ul className="mb-7 w-full space-y-2 text-left">
                {[
                  'Unlimited rows and columns',
                  'Real-time cloud sync and collaboration',
                  'Advanced formula engine',
                  'Priority customer support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-slate-300">
                    <svg className="mr-2.5 h-4 w-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex w-full flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/40 transition-all duration-200 hover:scale-[1.02] hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98]"
                  onClick={() => setShowPaywall(false)}
                >
                  Upgrade to Premium
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-400 transition-all duration-200 hover:bg-slate-700 hover:text-slate-200"
                  onClick={() => setShowPaywall(false)}
                >
                  Stay on Free
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
        <table className="w-full table-fixed border-collapse select-none">
          <thead className="sticky top-0 z-20 bg-slate-950 shadow-sm">
            <tr>
              <th className="w-12 border border-slate-800 bg-slate-950 p-2 text-center text-xs font-bold text-slate-500">
                #
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  className="w-28 border border-slate-800 p-2 text-center text-xs font-bold tracking-wider text-slate-400"
                >
                  {col}
                </th>
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
                  <td
                    className={`sticky left-0 z-10 border border-slate-800 p-1.5 text-center font-mono text-xs font-medium ${
                      isLocked ? 'bg-rose-950/30 text-rose-700' : 'bg-slate-950/50 text-slate-600'
                    }`}
                  >
                    {isLocked ? 'Locked' : rowIndex + 1}
                  </td>

                  {row.map((cellValue, colIndex) => (
                    <td
                      key={colIndex}
                      className={`border border-slate-800 p-0 ${
                        isLocked
                          ? 'cursor-not-allowed bg-slate-900/30'
                          : 'bg-slate-900 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-500'
                      }`}
                    >
                      <input
                        type="text"
                        value={cellValue}
                        readOnly={isLocked}
                        onChange={(event) => handleCellChange(rowIndex, colIndex, event.target.value)}
                        onClick={() => isLocked && setShowPaywall(true)}
                        className={`w-full h-full px-3 py-1.5 text-sm outline-none border-none bg-transparent ${
                          isBold ? 'font-bold' : ''
                        } ${isItalic ? 'italic' : ''} ${isUnderline ? 'underline' : ''} ${
                          isStrike ? 'line-through' : ''
                        } ${alignmentClass} ${
                          isLocked
                            ? 'cursor-not-allowed select-none text-slate-600'
                            : 'text-slate-200 focus:bg-slate-950/40'
                        }`}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg border border-indigo-900/60 bg-indigo-950/40 px-4 py-2">
        <p className="text-xs font-medium tracking-wide text-indigo-300">
          <span className="font-semibold text-indigo-200">Free Tier:</span> Rows 11-100 are locked.
          Upgrade to Premium to unlock unlimited rows.
        </p>
        <button
          type="button"
          onClick={() => setShowPaywall(true)}
          className="rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-150 hover:from-violet-500 hover:to-indigo-500"
        >
          Upgrade
        </button>
      </div>
    </div>
  );
}
