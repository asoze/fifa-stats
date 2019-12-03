import React from 'react';
import MatchTable from './components/MatchTable';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        FIFA Stats
      </header>
      <section className="game-stats">
          <h1>Game stuff</h1>
          <MatchTable />
      </section>
    </div>
  );
}

export default App;
