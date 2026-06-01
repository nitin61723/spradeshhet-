import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Toolbar from './components/Toolbar';
import SpreadsheetGrid from './components/SpreadsheetGrid';
import DashboardCanvas from './components/DashboardCanvas';

const STORAGE_KEY = 'vibe_sheet_cache';
const EMPTY_GRID = Array(100)
  .fill(null)
  .map(() => Array(10).fill(''));

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && Array.isArray(parsed[0])) return parsed;
  } catch {
    return null;
  }

  return null;
}

export default function App() {
  const [viewMode, setViewMode] = useState('grid');
  const [activeRibbonTab, setActiveRibbonTab] = useState('Home');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [textAlign, setTextAlign] = useState('left');
  const [sheetData, setSheetData] = useState(() => loadFromStorage() ?? EMPTY_GRID);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sheetData));
    } catch {
      // Local storage can fail in private mode or when quota is exceeded.
    }
  }, [sheetData]);

  const handleClearSheet = () => {
    setSheetData(EMPTY_GRID);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <Toolbar 
        currentTab={activeRibbonTab} setCurrentTab={setActiveRibbonTab}
        isBold={isBold} setIsBold={setIsBold}
        isItalic={isItalic} setIsItalic={setIsItalic}
        isUnderline={isUnderline} setIsUnderline={setIsUnderline}
        isStrike={isStrike} setIsStrike={setIsStrike}
        textAlign={textAlign} setTextAlign={setTextAlign}
        onClearSheet={handleClearSheet}
        viewMode={viewMode} setViewMode={setViewMode}
      />

      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {viewMode === 'grid' ? (
          <SpreadsheetGrid 
            gridData={sheetData} setGridData={setSheetData}
            isBold={isBold} isItalic={isItalic}
            isUnderline={isUnderline} isStrike={isStrike}
            textAlign={textAlign}
          />
        ) : (
          <DashboardCanvas gridData={sheetData} />
        )}
      </main>
    </div>
  );
}
