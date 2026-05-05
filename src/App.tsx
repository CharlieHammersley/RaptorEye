import React, { useState } from 'react';
import ScoutingForm from './components/matchScoutingForm.tsx';
import BarcodeCompiler from './components/compiler.tsx';

export default function App() {
  const [view, setView] = useState<'scout' | 'admin'>('scout');

  return (
    <div>
      <nav className="top-nav">
        <button 
          className={view === 'scout' ? 'active' : ''} 
          onClick={() => setView('scout')}
        >
          Scouting Form
        </button>
        <button 
          className={view === 'admin' ? 'active' : ''} 
          onClick={() => setView('admin')}
        >
        Compiler
        </button>
      </nav>
      <main className="content">
        {view === 'scout' ? <ScoutingForm /> : <BarcodeCompiler />}
      </main>
    </div>
  );
}