import React from 'react';
// import MatchTable from './components/MatchTable';
// import MatchTable from './components/MatchTable';
import MatchTableView from './components/MatchTableView';
import PersonTable from './components/PersonTable';
import GoalTable from './components/GoalTable';
import FifaBoundary from './components/common/FifaBoundary';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { connect } from 'react-redux';

import 'react-tabs/style/react-tabs.css';
import './App.css';

class App extends React.Component {
    componentDidMount() {
        console.log("STATE", this.state);
        console.log("PROPR", this.props);
    }

    render() {
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
                      <FifaBoundary>
                          <MatchTableView />
                      </FifaBoundary>
                  </TabPanel>
                  <TabPanel>
                      <h2>People</h2>
                      <FifaBoundary>
                          <PersonTable />
                      </FifaBoundary>
                  </TabPanel>
                  <TabPanel>
                      <h2>Goals</h2>
                      <FifaBoundary>
                          <GoalTable />
                      </FifaBoundary>
                  </TabPanel>
                </Tabs>
            </section>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    const xxx = '11111';
    return {
        prop1: state.propOne,
        prop2: xxx
    }
}
export default connect(mapStateToProps)(App);
