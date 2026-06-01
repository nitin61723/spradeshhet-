import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Toolbar from './components/Toolbar';
import SpreadsheetGrid from './components/SpreadsheetGrid';
import DashboardCanvas from './components/DashboardCanvas';

const STORAGE_KEY = 'vibe_sheet_cache';
const EMPTY_GRID = Array(100).fill(null).map(() => Array(10).fill(''));

// ── Helper: safely parse JSON from localStorage ──────────────────────────────
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Basic shape validation: must be a non-empty array of arrays
    if (Array.isArray(parsed) && Array.isArray(parsed[0])) return parsed;
  } catch {
    // Corrupted cache – fall back to empty grid
  }
  return null;
}

export default function App() {
  const [viewMode] = useState('grid');
  const [currentTab, setCurrentTab] = useState('Home');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [textAlign, setTextAlign] = useState('left');

  // ── Effect 1: LOAD ────────────────────────────────────────────────────────
  // Runs once on mount. Restores the user's previous session from localStorage
  // if a valid cache exists; otherwise initialises with the empty 100×10 grid.
  const [sheetData, setSheetData] = useState(() => {
    const cached = loadFromStorage();
    return cached ?? EMPTY_GRID;
  });

  // ── Effect 2: SAVE ────────────────────────────────────────────────────────
  // Runs every time sheetData changes (i.e. on every single cell edit).
  // Serialises the full matrix to JSON and persists it under our storage key.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sheetData));
    } catch {
      // Quota exceeded or private-browsing restriction – fail silently
    }
  }, [sheetData]);

  const handleClearSheet = () => {
    setSheetData(EMPTY_GRID);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">

      {/* 1. Top Header Navbar */}
      <Navbar />

      {/* 2. Formatting & Action Toolbar */}
      <Toolbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isBold={isBold}
        setIsBold={setIsBold}
        isItalic={isItalic}
        setIsItalic={setIsItalic}
        isUnderline={isUnderline}
        setIsUnderline={setIsUnderline}
        isStrike={isStrike}
        setIsStrike={setIsStrike}
        textAlign={textAlign}
        setTextAlign={setTextAlign}
        onClearSheet={handleClearSheet}
      />

      {/* 3. Main Workspace — both views draw from the same synced sheetData */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {viewMode === 'grid' ? (
          <SpreadsheetGrid
            gridData={sheetData}
            setGridData={setSheetData}
            isBold={isBold}
            isItalic={isItalic}
            isUnderline={isUnderline}
            isStrike={isStrike}
            textAlign={textAlign}
          />
        ) : (
          <DashboardCanvas gridData={sheetData} />
        )}
      </main>

    </div>
  );
}
