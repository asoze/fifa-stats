import React from 'react';
import {fetches} from '../data/fetches';
import moment from 'moment';
import ReactTable from "react-table";

class MatchTable2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            matches: []
        }
    }

    getHeaders() {
        const columns = [{
                Header: 'Round',
                accessor: 'round'
            }, {
                Header: 'Home Team',
                accessor: 'home_team',
            // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            }, {
                Header: 'Away Team',
                accessor: 'away_team'
            }, {
                Header: 'Score',
                accessor: 'score'
            }, {
                Header: 'Match Date',
                accessor: 'match_date'
            },{
                Header: 'Match time',
                accessor: 'match_time'
            }
        ];

        return columns;
    }

    getMatches() {
        if ( this.state.matches && this.state.matches.length > 0 ) {
            return this.state.matches;
        }

        const matches = fetches.getMatches();
        const teams = fetches.getTeams();

        Promise.all( [matches, teams] )
            .then( (values) => {
                const matches = values[0].data;
                const teams = values[1].data;

                const fullMatches = matches.map( (eachMatch) => {
                    eachMatch.team1 = teams[ eachMatch.team1_id-1 ];
                    eachMatch.team2 = teams[ eachMatch.team2_id-1 ];

                    return eachMatch;
                });

                this.setState({
                    matches: fullMatches
                });
            })
    }

    render() {
        return (
            <ReactTable
                data={this.getMatches()}
                columns={this.getHeaders()} />
        );
    }
}

export default MatchTable2;
