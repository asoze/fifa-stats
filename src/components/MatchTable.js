import React from 'react';
import {fetches} from '../data/fetches';
import moment from 'moment';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {initDataAction} from '../actions/actions';

class MatchTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            matches: [],
            sortOrder: 'round'
        }
        this.changeSortOrder = this.changeSortOrder.bind(this);
        this.compare = this.compare.bind(this);
    }

    componentDidMount() {
        this.initializeMatches();
        const something = 'xxx';
        this.props.initDataAction(something);
    }

    changeSortOrder( evt ) {
        const sortBy = evt.target.id;
        this.setState( {
            sortOrder: sortBy
        })
    }

    getTableHeaders() {
        return (
            <thead>
                <tr>
                    <th id='round' onClick={this.changeSortOrder}>Round</th>
                    <th id='team1' onClick={this.changeSortOrder}>Home Team</th>
                    <th id='team2' onClick={this.changeSortOrder}>Away Team</th>
                    <th id='score' onClick={this.changeSortOrder}>Score</th>
                    <th id='matchDate' onClick={this.changeSortOrder}>Match Date</th>
                    <th id='matchTime' onClick={this.changeSortOrder}>Match Time</th>
                </tr>
            </thead>
        );
    }

    getSortTerm( sortBy, field ) {
        // There's so many better ways to do this...
        if ( sortBy === 'team1' ) {
            return field.team1.title;
        } else if ( sortBy === 'team2' ) {
            return field.team2.title;
        } else if ( (sortBy === 'matchDate') || (sortBy === 'matchTime') ) {
            // Could separate out the date and time with moment, but I don't feel like it right now
            const matchDay = moment(field.play_at);
            return matchDay.toDate();
        } else if ( sortBy === 'score' ) {
            return field.score1;
        }

        return field;
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

    compare(a, b) {
        const sortBy = this.state.sortOrder;
        let sortA = '';
        let sortB = '';

        if ( sortBy ) {
            sortA = this.getSortTerm(sortBy, a);
            sortB = this.getSortTerm(sortBy, b);
        }

        if (sortA > sortB) return 1;
        else if ( sortB > sortA ) return -1;
        else return 0;
    }

    getTableBody() {
        const matches = this.state.matches;

        if ( matches ) {
            if( this.state.sortOrder ) {
                matches.sort(this.compare );
            }
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
            <table className='matchTable'>
                { this.getTableHeaders() }
                { this.getTableBody() }
            </table>
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({initDataAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchTable);
