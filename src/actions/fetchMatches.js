import { fetchMatchesSuccess, fetchMatchesError, fetchMatchesPending } from './actions';
import fetches from '../data/fetches';

function fetchMatchesAction() {
    return dispatch => {
        dispatch(fetchMatchesPending());

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

                dispatch( fetchMatchesSuccess(fullMatches));
            })
            .catch( (err) => {
                dispatch(fetchMatchesError(err) );
            } );
    }
}

export default fetchMatchesAction;
