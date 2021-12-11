import {
    FETCH_AUTHORS_REQUEST,
    FETCH_AUTHORS_SUCCESS,
    FETCH_AUTHORS_FAILURE,
    FETCH_AUTHOR_REQUEST,
    FETCH_AUTHOR_SUCCESS,
    FETCH_AUTHOR_FAILURE,
} from '../actions/authorActions';

const initialState = {
    fetchLoading: false,
    authors: [],
    author: null,
};

const authorReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AUTHORS_REQUEST:
            return { ...state, fetchLoading: true };
        case FETCH_AUTHORS_SUCCESS:
            return { ...state, fetchLoading: false, authors: action.payload };
        case FETCH_AUTHORS_FAILURE:
            return { ...state, fetchLoading: false };
        case FETCH_AUTHOR_REQUEST:
            return { ...state, fetchLoading: true };
        case FETCH_AUTHOR_SUCCESS:
            return { ...state, fetchLoading: false, author: action.payload };
        case FETCH_AUTHOR_FAILURE:
            return { ...state, fetchLoading: false };
        default:
            return state;
    }
};

export default authorReducer;