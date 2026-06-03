const MENU_ITEMS = ['File', 'Edit', 'View', 'Insert', 'Format', 'Data', 'Tools', 'Extensions', 'Help'];

const toolButtonBase =
  'h-8 min-w-8 rounded border px-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40';

const activeToolButton =
  'border-emerald-500/70 bg-emerald-600/25 text-white shadow-[inset_0_-1px_0_rgba(16,185,129,0.55)]';

const idleToolButton =
  'border-slate-700 bg-slate-950/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800 hover:text-slate-100';

function AlignmentIcon({ align }) {
  return (
    <span
      className={`flex w-5 flex-col gap-1 ${
        align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start'
      }`}
      aria-hidden="true"
    >
      <span className="h-0.5 w-5 rounded-full bg-current" />
      <span className="h-0.5 w-3.5 rounded-full bg-current" />
      <span className="h-0.5 w-4 rounded-full bg-current" />
    </span>
  );
}

export default function Toolbar({
  currentTab,
  setCurrentTab,
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
  viewMode,
  setViewMode,
  onUndo,
  onRedo,
  onPrint,
  canUndo,
  canRedo,
}) {
  const isFormattingTab = currentTab === 'Format' || currentTab === 'Home';

  const formatButtonClass = (isActive) =>
    `${toolButtonBase} ${isActive ? activeToolButton : idleToolButton}`;

  const alignButtonClass = (align) =>
    `${toolButtonBase} flex items-center justify-center ${
      textAlign === align ? activeToolButton : idleToolButton
    }`;

  const viewButtonClass = (mode) =>
    `h-7 rounded-md px-3 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
      viewMode === mode
        ? 'bg-indigo-600 text-white shadow-sm'
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`;

  return (
    <div className="w-full border-b border-slate-800 bg-slate-950 text-slate-200 shadow-sm">
      <div className="flex min-h-9 items-center justify-between gap-3 border-b border-slate-800/80 px-3 py-1">
        <nav className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
          {MENU_ITEMS.map((item) => {
            const isActive = currentTab === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setCurrentTab(item)}
                className={`cursor-pointer rounded px-3 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 p-1">
          <button type="button" onClick={() => setViewMode('grid')} className={viewButtonClass('grid')}>
            📊 Grid Sheet
          </button>
          <button type="button" onClick={() => setViewMode('dashboard')} className={viewButtonClass('dashboard')}>
            📈 Dashboard Canvas
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-900 px-4 py-2">
        {isFormattingTab ? (
          <div className="flex flex-wrap items-center gap-2">
            <section className="flex items-center gap-1 border-r border-slate-800 pr-2">
              <button
                type="button"
                onClick={onUndo}
                disabled={!canUndo}
                className={`${toolButtonBase} ${idleToolButton} ${!canUndo ? 'cursor-not-allowed opacity-40' : ''}`}
                title="Undo"
              >
                ↶ Undo
              </button>
              <button
                type="button"
                onClick={onRedo}
                disabled={!canRedo}
                className={`${toolButtonBase} ${idleToolButton} ${!canRedo ? 'cursor-not-allowed opacity-40' : ''}`}
                title="Redo"
              >
                ↷ Redo
              </button>
              <button
                type="button"
                onClick={onPrint}
                className={`${toolButtonBase} ${idleToolButton}`}
                title="Print"
              >
                🖨️ Print
              </button>
            </section>

            <section className="flex items-center gap-1 border-r border-slate-700 pr-2">
              <button
                type="button"
                onClick={() => setIsBold(!isBold)}
                className={formatButtonClass(isBold)}
                title="Bold"
                aria-pressed={isBold}
              >
                B
              </button>
              <button
                type="button"
                onClick={() => setIsItalic(!isItalic)}
                className={`${formatButtonClass(isItalic)} italic`}
                title="Italic"
                aria-pressed={isItalic}
              >
                I
              </button>
              <button
                type="button"
                onClick={() => setIsUnderline(!isUnderline)}
                className={`${formatButtonClass(isUnderline)} underline underline-offset-2`}
                title="Underline"
                aria-pressed={isUnderline}
              >
                U
              </button>
              <button
                type="button"
                onClick={() => setIsStrike(!isStrike)}
                className={`${formatButtonClass(isStrike)} line-through`}
                title="Strikethrough"
                aria-pressed={isStrike}
              >
                S
              </button>
            </section>

            <section className="flex items-center gap-1 border-r border-slate-700 pr-2">
              <button
                type="button"
                onClick={() => setTextAlign('left')}
                className={alignButtonClass('left')}
                title="Align left"
                aria-label="Align left"
                aria-pressed={textAlign === 'left'}
              >
                <AlignmentIcon align="left" />
              </button>
              <button
                type="button"
                onClick={() => setTextAlign('center')}
                className={alignButtonClass('center')}
                title="Align center"
                aria-label="Align center"
                aria-pressed={textAlign === 'center'}
              >
                <AlignmentIcon align="center" />
              </button>
              <button
                type="button"
                onClick={() => setTextAlign('right')}
                className={alignButtonClass('right')}
                title="Align right"
                aria-label="Align right"
                aria-pressed={textAlign === 'right'}
              >
                <AlignmentIcon align="right" />
              </button>
            </section>

            <section className="flex min-w-0 items-center">
              <button
                type="button"
                onClick={onClearSheet}
                className="h-8 max-w-full truncate rounded border border-emerald-500/50 bg-emerald-500/10 px-3 text-xs font-semibold text-emerald-100 transition-colors hover:border-emerald-400/80 hover:bg-emerald-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                title="Clear Active Canvas"
              >
                Clear Active Canvas
              </button>
            </section>
          </div>
        ) : (
          <div className="flex h-8 items-center text-xs font-medium text-slate-500">
            {currentTab} tools
          </div>
        )}

        <div className="hidden text-xs text-slate-500 sm:block">Ready</div>
      </div>
    </div>
  );
}
