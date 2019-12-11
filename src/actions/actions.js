export const FETCH_MATCHES_PENDING = 'FETCH_MATCHES_PENDING';
export const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS';
export const FETCH_MATCHES_ERROR = 'FETCH_MATCHES_ERROR';

export function fetchMatchesPending() {
    return {
        type: FETCH_MATCHES_PENDING
    }
}

export function fetchMatchesSuccess(matches) {
    return {
        type: FETCH_MATCHES_SUCCESS,
        matches: matches
    }
}

export function fetchMatchesError(error) {
    return {
        type: FETCH_MATCHES_ERROR,
        error: error
    }
}

export const sortMatches = (sortData) => ({
    type: 'SORT_MATCHES',
    payload: sortData
});

export const initDataAction = (data) => ({
    type: 'INIT_DATA',
    payload: data
});
