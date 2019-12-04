import React from 'react';
// import MatchTable from './components/MatchTable';
import MatchTable from './components/MatchTable';
import PersonTable from './components/PersonTable';
import GoalTable from './components/GoalTable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        FIFA Stats
      </header>
      <section className="game-stats">
          <Tabs>
            <TabList>
                <Tab>Match</Tab>
                <Tab>Person</Tab>
                <Tab>Goal</Tab>
            </TabList>

            <TabPanel>
                <h2>Matches</h2>
                <MatchTable />
            </TabPanel>
            <TabPanel>
                <h2>People</h2>
                <PersonTable />
            </TabPanel>
            <TabPanel>
                <h2>Goals</h2>
                <GoalTable />
            </TabPanel>
          </Tabs>
      </section>
    </div>
  );
}

export default App;
