import React from 'react';
import {fetches} from '../data/fetches';

class MatchTable extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            matches: []
        }
    }

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
        if ( this.state.matches && this.state.matches.length > 0 ) {
            console.log("GOOD!");
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
                
                console.log("MAtches rEady", fullMatches);
                
                this.setState({
                    matches: fullMatches
                });
            })

        // const matches = fetches.getMatches()
        //     .then( (matches) => {
        //         fetches.getTeams().then( (teams) => {
        // 
        // 
        // 
        // 
        // 
        //             const fullMatchData = matches.data;
        //             const teamData = teams.data;
        //             console.log("TEAM 1", fullMatchData.team1_id);
        // 
        //             fullMatchData.home_team = teamData[fullMatchData.team1_id];
        //             fullMatchData.away_team = teamData[fullMatchData.team2_id];
        // 
        //             console.log("DULL@2", fullMatchData);
        //             return fullMatchData;
        //         });
        // 
        //         // return matchCollection.map( (eachMatch, idx) => {
        //         //     return this.formatMatchRow( eachMatch, idx );
        //         // })
        //     });
    }

    formatMatchRow( match, idx ) {
        const keyString = `match_${idx}`;
        console.log("MATCH", match);
        return (
            <tr key={keyString}>
                <td>{ match.round_id }</td>
                <td>{ match.team1.title }</td>
                <td>{ match.team2.title }</td>
                <td>{ `${ match.score1 } - ${ match.score2 }` }</td>
                    <td>{ match.play_at }</td>
            </tr>
        )
    }

    getTableBody() {
        const matches = this.getMatches();
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
