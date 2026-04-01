import { useState, useRef, useCallback } from 'react';
import type { DataSet } from './types';
import { DataInput } from './components/DataInput';
import { GameBoard } from './components/GameBoard';
import { Cards } from './components/Cards';
import { ScoreSheet } from './components/ScoreSheet';
import './App.css';

type Tab = 'data' | 'board' | 'cards' | 'sheet';

export default function App() {
  const [data, setData] = useState<DataSet | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('data');
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const tabs: { id: Tab; label: string; needsData: boolean }[] = [
    { id: 'data', label: 'Data Set', needsData: false },
    { id: 'board', label: 'Game Board', needsData: true },
    { id: 'cards', label: 'Cards', needsData: true },
    { id: 'sheet', label: 'Score Sheet', needsData: true },
  ];

  return (
    <div className="app">
      <header className="app-header no-print">
        <h1>Dream Phone Card Generator</h1>
        <p>Load or create a data set, then print game boards, cards, and score sheets.</p>
      </header>

      <nav className="tabs no-print">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''} ${tab.needsData && !data ? 'disabled' : ''}`}
            onClick={() => {
              if (!tab.needsData || data) setActiveTab(tab.id);
            }}
            disabled={tab.needsData && !data}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main ref={printRef}>
        {activeTab === 'data' && (
          <DataInput
            onDataLoaded={(d) => {
              setData(d);
              setActiveTab('board');
            }}
            currentData={data}
          />
        )}

        {activeTab === 'board' && data && (
          <>
            <div className="print-controls no-print">
              <button onClick={handlePrint} className="primary">Print Game Board</button>
            </div>
            <GameBoard data={data} />
          </>
        )}

        {activeTab === 'cards' && data && (
          <>
            <div className="print-controls no-print">
              <button onClick={handlePrint} className="primary">Print Cards</button>
            </div>
            <Cards data={data} />
          </>
        )}

        {activeTab === 'sheet' && data && (
          <>
            <div className="print-controls no-print">
              <button onClick={handlePrint} className="primary">Print Score Sheets</button>
            </div>
            <ScoreSheet data={data} />
          </>
        )}
      </main>
    </div>
  );
}
