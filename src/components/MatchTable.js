import React from 'react';
import {fetches} from '../data/fetches';
import moment from 'moment';

class MatchTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            matches: []
        }
    }

    componentDidMount() {
        this.initializeMatches();
    }

    getTableHeaders() {
        return (
            <thead>
                <tr>
                    <th>Round</th>
                    <th>Home Team</th>
                    <th>Away Team</th>
                    <th>Score</th>
                    <th>Match Date</th>
                    <th>Match Time</th>
                </tr>
            </thead>
        );
    }

    initializeMatches() {
        if ( this.state.matches && this.state.matches.length > 0 ) return this.state.matches;

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

    formatMatchRow( match, idx ) {
        const keyString = `match_${idx}`;
        const matchPlayAt = moment( match.play_at ); // 2014-06-12 17:00:00.000000
        const matchDate = matchPlayAt.format('MMM Do');
        const matchTime = matchPlayAt.format('h:mm a');
        return (
            <tr key={keyString}>
                <td>{ match.round_id }</td>
                <td>{ match.team1.title }</td>
                <td>{ match.team2.title }</td>
                <td>{ `${ match.score1 } - ${ match.score2 }` }</td>
                <td>{ matchDate }</td>
                <td>{ matchTime }</td>
            </tr>
        )
    }

    getTableBody() {
        const matches = this.state.matches;
        if ( matches ) {
            const renderedRows = matches.map( (eachMatch, idx) => {
                return this.formatMatchRow( eachMatch, idx );
            })

            return (
                <tbody>
                    { renderedRows }
                </tbody>
            )
        };

        return (
            <tbody>
                <tr><td colSpan='5'>Loading...</td></tr>
            </tbody>
        );
    }

    render() {
        return (
            <table>
                { this.getTableHeaders() }
                { this.getTableBody() }
            </table>
        );
    }
}

export default MatchTable;
