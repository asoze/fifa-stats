import { FETCH_MATCHES_ERROR, FETCH_MATCHES_PENDING, FETCH_MATCHES_SUCCESS } from '../actions/actions';

const defaultState = {
    pending: false,
    matches: [],
    error: null
};

export function matchesReducer( state = defaultState, action ) {
    switch( action.type ) {
        case FETCH_MATCHES_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_MATCHES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case FETCH_MATCHES_SUCCESS:
            return {
                ...state,
                pending: false,
                matches: action.payload
            }
        default:
            return state;
    }
}

export const fetchMatchesSuccess = state => state.matches;
export const fetchMatchesPending = state => state.pending;
export const fetchMatchesError = state => state.error;

const reducers = ( state = defaultState, action ) => {
    switch( action.type ) {
        case 'SORT_MATCHES':
            return {
                ...state,
                sortData: 'score'
            }

        default: return state;
    }
}

export default reducers;
