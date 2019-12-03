import React from 'react';
import {fetches} from '../data/fetches';

class MatchTable extends React.Component {

    getTableHeaders() {
        return (
            <thead>
                <tr>
                    <th>Round</th>
                    <th>Home Team</th>
                    <th>Away Team</th>
                    <th>Score</th>
                    <th>Match Time</th>
                </tr>
            </thead>
        );
    }

    getMatches() {
        fetches.getMatches().then( (eachDataset) => {
            console.log("EACH DA", eachDataset.data);

            // return matchCollection.map( (eachMatch, idx) => {
            //     return this.formatMatchRow( eachMatch, idx );
            // })
        });

    }

    formatMatchRow( match, idx ) {
        const keyString = `match_${idx}`;
        return (
            <tr key={keyString}>
                <td>{ match.round_id }</td>
                <td>{ match.home_team }</td>
                <td>{ match.away_team }</td>
                <td>{ match.score }</td>
                <td>{ match.match_time }</td>
            </tr>
        )
    }

    getTableBody() {
        return (
            <tbody>
                { this.getMatches() }
            </tbody>
        )
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
