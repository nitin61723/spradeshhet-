import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Toolbar from './components/Toolbar';
import SpreadsheetGrid from './components/SpreadsheetGrid';
import DashboardCanvas from './components/DashboardCanvas';

export default function App() {
  const [viewMode, setViewMode] = useState('grid');
  const [activeRibbonTab, setActiveRibbonTab] = useState('Home');

  // Home Tab Ribbon Formatting States
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [textAlign, setTextAlign] = useState('left');

  // New Number Formatting States
  const [numberFormat, setNumberFormat] = useState('Normal'); // Normal, Currency, Percent, Scientific
  const [decimalPlaces, setDecimalPlaces] = useState(2);

  // Central Sheet Data Matrix & History Management
  const initialData = Array(100).fill(null).map(() => Array(10).fill(''));
  const [sheetData, setSheetData] = useState(initialData);
  const [history, setHistory] = useState([initialData]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateSheetData = (newData) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    setSheetData(newData);
    setHistory([...updatedHistory, newData]);
    setHistoryIndex(updatedHistory.length);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSheetData(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSheetData(history[historyIndex + 1]);
    }
  };

  const handlePrint = () => window.print();

  const handleClearSheet = () => {
    if (window.confirm("Clear all rows?")) {
      updateSheetData(Array(100).fill(null).map(() => Array(10).fill('')));
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans print:bg-white print:text-black">
      <Navbar />
      
      <Toolbar 
        currentTab={activeRibbonTab} setCurrentTab={setActiveRibbonTab}
        isBold={isBold} setIsBold={setIsBold}
        isItalic={isItalic} setIsItalic={setIsItalic}
        isUnderline={isUnderline} setIsUnderline={setIsUnderline}
        isStrike={isStrike} setIsStrike={setIsStrike}
        textAlign={textAlign} setTextAlign={setTextAlign}
        numberFormat={numberFormat} setNumberFormat={setNumberFormat}
        decimalPlaces={decimalPlaces} setDecimalPlaces={setDecimalPlaces}
        onClearSheet={handleClearSheet}
        viewMode={viewMode} setViewMode={setViewMode}
        onUndo={handleUndo} onRedo={handleRedo} onPrint={handlePrint}
        canUndo={historyIndex > 0} canRedo={historyIndex < history.length - 1}
      />

      <main className="flex-1 flex flex-col min-h-0 overflow-hidden print:overflow-visible">
        {viewMode === 'grid' ? (
          <SpreadsheetGrid 
            gridData={sheetData} setGridData={updateSheetData}
            isBold={isBold} isItalic={isItalic}
            isUnderline={isUnderline} isStrike={isStrike}
            textAlign={textAlign}
            numberFormat={numberFormat}
            decimalPlaces={decimalPlaces}
          />
        ) : (
          <DashboardCanvas gridData={sheetData} />
        )}
      </main>
    </div>
  );
}