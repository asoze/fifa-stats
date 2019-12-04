import React from 'react';
// import MatchTable from './components/MatchTable';
import MatchTable2 from './components/MatchTable2';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        FIFA Stats
      </header>
      <section className="game-stats">
          <h1>Game stuff</h1>
          <MatchTable2 />
      </section>
    </div>
  );
}

export default App;
