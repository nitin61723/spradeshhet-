import { useState } from 'react';

const RIBBON_TABS = [
  'File',
  'Home',
  'Insert',
  'Draw',
  'Page Layout',
  'Formulas',
  'Data',
  'Review',
  'View',
  'Help',
];

const formatButtonBase =
  'h-8 min-w-8 rounded-sm border px-2 text-xs font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500/40';

const alignmentButtonBase =
  'flex h-8 w-9 items-center justify-center rounded-sm border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500/40';

function AlignmentGlyph({ align }) {
  const widths = {
    left: ['w-5', 'w-3.5', 'w-4.5'],
    center: ['w-4', 'w-5', 'w-3.5'],
    right: ['w-5', 'w-3.5', 'w-4.5'],
  };

  return (
    <span
      className={`flex w-5 flex-col gap-1 ${
        align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start'
      }`}
      aria-hidden="true"
    >
      {widths[align].map((width, index) => (
        <span key={index} className={`block h-0.5 rounded-full bg-current ${width}`} />
      ))}
    </span>
  );
}

export default function Toolbar({
  currentTab: controlledTab,
  setCurrentTab: setControlledTab,
  isBold,
  setIsBold,
  isItalic,
  setIsItalic,
  isUnderline,
  setIsUnderline,
  isStrike,
  setIsStrike,
  textAlign,
  setTextAlign,
  onClearSheet,
}) {
  const [currentTab, setCurrentTab] = useState('Home');
  const activeTab = controlledTab ?? currentTab;
  const updateTab = setControlledTab ?? setCurrentTab;

  const toggleButtonClass = (isActive) =>
    `${formatButtonBase} ${
      isActive
        ? 'border-emerald-500/60 bg-emerald-500/15 text-white shadow-[inset_0_-1px_0_rgba(16,185,129,0.45)]'
        : 'border-slate-700/80 bg-slate-950/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800 hover:text-slate-100'
    }`;

  const alignButtonClass = (align) =>
    `${alignmentButtonBase} ${
      textAlign === align
        ? 'border-emerald-500/60 bg-emerald-500/15 text-white shadow-[inset_0_-1px_0_rgba(16,185,129,0.45)]'
        : 'border-slate-700/80 bg-slate-950/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800 hover:text-slate-100'
    }`;

  return (
    <div className="w-full border-b border-slate-800 bg-slate-950/95 text-slate-200 shadow-sm">
      <div className="flex min-h-10 items-end gap-1 overflow-x-auto border-b border-slate-800/90 px-3 pt-1">
        {RIBBON_TABS.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => updateTab(tab)}
              className={`relative h-9 shrink-0 px-3 text-xs font-medium transition-colors duration-150 focus:outline-none ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
              <span
                className={`absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-emerald-500 transition-opacity duration-150 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          );
        })}
      </div>

      {activeTab === 'Home' && (
        <div className="flex flex-wrap items-stretch gap-2 border-t border-slate-800 bg-slate-900 px-3 py-2">
          <section className="flex items-center gap-1 rounded border border-slate-800 bg-slate-950/45 px-2 py-1">
            <button
              type="button"
              onClick={() => setIsBold?.(!isBold)}
              className={toggleButtonClass(isBold)}
              title="Bold"
              aria-pressed={isBold}
            >
              B
            </button>
            <button
              type="button"
              onClick={() => setIsItalic?.(!isItalic)}
              className={`${toggleButtonClass(isItalic)} italic`}
              title="Italic"
              aria-pressed={isItalic}
            >
              I
            </button>
            <button
              type="button"
              onClick={() => setIsUnderline?.(!isUnderline)}
              className={`${toggleButtonClass(isUnderline)} underline underline-offset-2`}
              title="Underline"
              aria-pressed={isUnderline}
            >
              U
            </button>
            <button
              type="button"
              onClick={() => setIsStrike?.(!isStrike)}
              className={`${toggleButtonClass(isStrike)} line-through`}
              title="Strikethrough"
              aria-pressed={isStrike}
            >
              S
            </button>
          </section>

          <section className="flex items-center gap-1 rounded border border-slate-800 bg-slate-950/45 px-2 py-1">
            {['left', 'center', 'right'].map((align) => (
              <button
                key={align}
                type="button"
                onClick={() => setTextAlign?.(align)}
                className={alignButtonClass(align)}
                title={`Align ${align}`}
                aria-label={`Align ${align}`}
                aria-pressed={textAlign === align}
              >
                <AlignmentGlyph align={align} />
              </button>
            ))}
          </section>

          <section className="flex min-w-0 items-center rounded border border-slate-800 bg-slate-950/45 px-2 py-1">
            <button
              type="button"
              onClick={onClearSheet}
              className="h-8 max-w-full truncate rounded-sm border border-emerald-500/50 bg-emerald-500/10 px-3 text-xs font-semibold text-emerald-100 shadow-[inset_0_-1px_0_rgba(16,185,129,0.35)] transition-all duration-150 hover:border-emerald-400/80 hover:bg-emerald-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              title="Clear Selected Active Bounds"
            >
              🧹 Clear Selected Active Bounds
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
