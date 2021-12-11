import {
  FETCH_ALBUMS_REQUEST,
  FETCH_ALBUMS_SUCCESS,
  FETCH_ALBUMS_FAILURE,
  FETCH_ALBUM_REQUEST,
  FETCH_ALBUM_SUCCESS,
  FETCH_ALBUM_FAILURE,
  FETCH_TRACKS_SUCCESS,
} from '../actions/albumActions';

const initialState = {
  fetchLoading: false,
  singleLoading: false,
  albums: [],
  album: null,
  tracks: null,
};

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALBUMS_REQUEST:
      return { ...state, fetchLoading: true };
    case FETCH_ALBUMS_SUCCESS:
      return { ...state, fetchLoading: false, albums: action.payload };
    case FETCH_ALBUMS_FAILURE:
      return { ...state, fetchLoading: false };
    case FETCH_ALBUM_REQUEST:
      return { ...state, singleLoading: true };
    case FETCH_ALBUM_SUCCESS:
      return { ...state, singleLoading: false, album: action.payload };
    case FETCH_ALBUM_FAILURE:
      return { ...state, singleLoading: false };
    case FETCH_TRACKS_SUCCESS:
      return { ...state, tracks: action.tracks };
    default:
      return state;
  }
};

export default albumReducer;