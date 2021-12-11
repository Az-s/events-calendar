import axiosApi from "../../axiosApi";
import { toast } from "react-toastify";

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const FETCH_ALBUM_REQUEST = 'FETCH_ALBUM_REQUEST';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const FETCH_ALBUM_FAILURE = 'FETCH_ALBUM_FAILURE';

export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const FETCH_TRACKSBYARTIST_SUCCESS = 'FETCH_TRACKSBYARTIST_SUCCESS';
export const FETCH_TRACKSBYARTIST_FAILURE = 'FETCH_TRACKSBYARTIST_FAILURE';

export const FETCH_TRACKSBYALBUM_SUCCESS = 'FETCH_TRACKSBYALBUM_SUCCESS';
export const FETCH_TRACKSBYALBUM_FAILURE = 'FETCH_TRACKSBYALBUM_FAILURE';

export const CREATE_ALBUM_REQUEST = 'CREATE_ALBUM_REQUEST';
export const CREATE_ALBUM_SUCCESS = 'CREATE_ALBUM_SUCCESS';
export const CREATE_ALBUM_FAILURE = 'CREATE_ALBUM_FAILURE';

export const CREATE_ARTIST_REQUEST = 'CREATE_ARTIST_REQUEST';
export const CREATE_ARTIST_SUCCESS = 'CREATE_ARTIST_SUCCESS';
export const CREATE_ARTIST_FAILURE = 'CREATE_ARTIST_FAILURE';

export const CREATE_TRACK_REQUEST = 'CREATE_TRACK_REQUEST';
export const CREATE_TRACK_SUCCESS = 'CREATE_TRACK_SUCCESS';
export const CREATE_TRACK_FAILURE = 'CREATE_TRACK_FAILURE';

export const fetchALbumsRequest = () => ({ type: FETCH_ALBUMS_REQUEST });
export const fetchALbumsSuccess = albums => ({ type: FETCH_ALBUMS_SUCCESS, payload: albums });
export const fetchALbumsFailure = () => ({ type: FETCH_ALBUMS_FAILURE });

export const fetchAlbumRequest = () => ({ type: FETCH_ALBUM_REQUEST });
export const fetchAlbumSuccess = album => ({ type: FETCH_ALBUM_SUCCESS, payload: album });
export const fetchAlbumFailure = () => ({ type: FETCH_ALBUM_FAILURE });

export const fetchTracksSuccess = tracks => ({ type: FETCH_TRACKS_SUCCESS, tracks });
export const fetchTracksFailure = () => ({ type: FETCH_TRACKS_FAILURE });

export const fetchTracksByArtistSuccess = tracks => ({ type: FETCH_TRACKSBYARTIST_SUCCESS, tracks });
export const fetchTracksByArtistFailure = () => ({ type: FETCH_TRACKSBYARTIST_FAILURE });

export const fetchTracksByAlbumSuccess = tracks => ({ type: FETCH_TRACKSBYALBUM_SUCCESS, tracks });
export const fetchTracksByAlbumFailure = () => ({ type: FETCH_TRACKSBYALBUM_FAILURE });

export const createAlbumRequest = () => ({ type: CREATE_ALBUM_REQUEST });
export const createAlbumSuccess = () => ({ type: CREATE_ALBUM_SUCCESS });
export const createAlbumFailure = () => ({ type: CREATE_ALBUM_FAILURE });

export const createArtistRequest = () => ({ type: CREATE_ARTIST_REQUEST });
export const createArtistSuccess = () => ({ type: CREATE_ARTIST_SUCCESS });
export const createArtistFailure = () => ({ type: CREATE_ARTIST_FAILURE });

export const createTrackRequest = () => ({ type: CREATE_TRACK_REQUEST });
export const createTrackSuccess = () => ({ type: CREATE_TRACK_SUCCESS });
export const createTrackFailure = () => ({ type: CREATE_TRACK_FAILURE });

export const fetchAlbums = (artistId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchALbumsRequest());
            const response = await axiosApi.get('/albums?artist=' + artistId);
            dispatch(fetchALbumsSuccess(response.data));
        } catch (error) {
            dispatch(fetchALbumsFailure());
        }
    };
};

export const fetchAlbum = id => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumRequest());
            const response = await axiosApi.get('/albums/' + id);
            dispatch(fetchAlbumSuccess(response.data));
        } catch (error) {
            dispatch(fetchAlbumFailure());
        }
    };
};

export const getTracks = () => {
    return async dispatch => {
        try {
            const response = axiosApi.get('/tracks');
            dispatch(fetchTracksSuccess(response.data));
        } catch (error) {
            dispatch(fetchAlbumFailure());
        }
    };
};

export const getTracksByArtist = artistId => {
    return async dispatch => {
        try {
            const response = axiosApi.get('/tracks?artist=' + artistId);
            dispatch(fetchTracksByArtistSuccess(response.data));
        } catch (error) {
            dispatch(fetchAlbumFailure());
        }
    };
};

export const getTracksByAlbum = (albumId) => {
    return async dispatch => {
        try {
            const response = axiosApi.get('/tracks?album=' + albumId);
            dispatch(fetchTracksByArtistSuccess(response.data));
        } catch (error) {
            dispatch(fetchAlbumFailure());
        }
    };
};

export const createAlbum = albumData => {
    return async dispatch => {
        try {
            dispatch(createAlbumRequest());
            await axiosApi.post('/albums', albumData);
            dispatch(createAlbumSuccess());
            toast.success('Album created');
        } catch (e) {
            dispatch(createAlbumFailure());
            throw e;
        }
    };
};

export const deleteAlbum = (id) => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumRequest());
            await axiosApi.delete('/albums/' + id);
            dispatch(fetchALbumsSuccess());
            toast.success('Album deleted');
        } catch (e) {
            dispatch(fetchAlbumFailure());
            throw e;
        }
    };
};

export const createArtist = artistData => {
    return async dispatch => {
        try {
            dispatch(createArtistRequest());
            await axiosApi.post('/artists', artistData);
            dispatch(createArtistSuccess());
            toast.success('Artist created');
        } catch (e) {
            dispatch(createArtistFailure());
            throw e;
        }
    };
};

export const deleteArtist = (id) => {
    return async dispatch => {
        try {
            dispatch(createArtistRequest());
            await axiosApi.delete('/artists/' + id);
            dispatch(createArtistSuccess());
            toast.success('Artist deleted');
        } catch (e) {
            dispatch(createArtistFailure());
            throw e;
        }
    };
};

export const createTrack = trackData => {
    return async dispatch => {
        try {
            dispatch(createTrackRequest());
            await axiosApi.post('/tracks', trackData);
            dispatch(createTrackSuccess());
            toast.success('Track created');
        } catch (e) {
            dispatch(createTrackFailure());
            throw e;
        }
    };
};

export const deleteTrack = (id) => {
    return async dispatch => {
        try {
            dispatch(createTrackRequest());
            await axiosApi.delete('/tracks/' + id);
            dispatch(createTrackSuccess());
            toast.success('Track deleted');
        } catch (e) {
            dispatch(createTrackFailure());
            throw e;
        }
    };
};

export const toggleTrackPublish = id => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const config = { headers: { 'Authorization': token } };
            await axiosApi.post('/tracks/' + id + '/toggle_published', config)
            dispatch(createTrackSuccess());
        } catch (e) {
            throw e;
        }
    };
};

export const toggleAlbumPublish = id => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const config = { headers: { 'Authorization': token } };
            await axiosApi.post('/albums/' + id + '/toggle_published', config);
            dispatch(fetchALbumsSuccess());
        } catch (e) {
            throw e;
        }
    };
};

export const toggleArtistPublish = id => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const config = { headers: { 'Authorization': token } };
            await axiosApi.post('/artists/' + id + '/toggle_published', config);
            dispatch(createArtistSuccess());
        } catch (e) {
            throw e;
        }
    };
};