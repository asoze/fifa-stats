import React from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import fetchMatchesAction from '../actions/fetchMatches';
import { fetchMatchesError, fetchMatchesSuccess, fetchMatchesPending} from '../reducers/reducers';

class MatchTableView extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentRender = this.shouldComponentRender.bind(this);
    }

    componentDidMount() {
        const { matches } = this.props;
        console.log("MATCHES", matches);
        // matches();
    }

    shouldComponentRender() {
        return this.props.pending;
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

    render() {
        fetchMatchesAction();
        const { pending, error, matches } = this.props;
        console.log("STUFF", pending, error, matches);
        if ( !this.shouldComponentRender() ) return 'Loading...';

        const formattedMatches = matches.map( (eachMatch, idx) => {
            return this.formatMatchRow( eachMatch, idx );
        })

        return (
            <table>
                <thead>
                    { this.getTableHeaders() }
                </thead>
                <tbody>
                    { formattedMatches }
                </tbody>
            </table>
        )
    }
}

function mapStateToProps(state) {
    const error = fetchMatchesError(state);
    const pending = fetchMatchesPending(state);
    const matches = fetchMatchesSuccess(state);

    console.log("MAP STATE TOPROPS", error, pending, matches);

    return {
        error,
        pending,
        matches
    }
}

const mapDispatchToProps = ( (dispatch) => {
    return {
        fetchMatchesSuccess: () => dispatch({ type: 'FETCH_MATCHES_SUCCESS'}),
        fetchMatchesError: () => dispatch({ type: 'FETCH_MATCHES_ERROR'}),
        fetchMatchesPending: () => dispatch({ type: 'FETCH_MATCHES_PENDING'})
    }
});

export default connect( mapStateToProps, mapDispatchToProps)(MatchTableView);
