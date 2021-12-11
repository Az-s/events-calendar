import axiosApi from '../../axiosApi';

export const FETCH_AUTHORS_REQUEST = 'FETCH_AUTHORS_REQUEST';
export const FETCH_AUTHORS_SUCCESS = 'FETCH_AUTHORS_SUCCESS';
export const FETCH_AUTHORS_FAILURE = 'FETCH_AUTHORS_FAILURE';

export const FETCH_AUTHOR_REQUEST = 'FETCH_AUTHOR_REQUEST';
export const FETCH_AUTHOR_SUCCESS = 'FETCH_AUTHOR_SUCCESS';
export const FETCH_AUTHOR_FAILURE = 'FETCH_AUTHOR_FAILURE';

export const fetchAuthorsRequest = () => ({ type: FETCH_AUTHORS_REQUEST });
export const fetchAuthorsSuccess = authors => ({ type: FETCH_AUTHORS_SUCCESS, payload: authors });
export const fetchAuthorsFailure = () => ({ type: FETCH_AUTHORS_FAILURE });

export const fetchAuthorRequest = () => ({ type: FETCH_AUTHOR_REQUEST });
export const fetchAuthorSuccess = author => ({ type: FETCH_AUTHOR_SUCCESS, payload: author });
export const fetchAuthorFailure = () => ({ type: FETCH_AUTHOR_FAILURE });

export const fetchAuthors = () => {
  return async dispatch => {
    try {
      dispatch(fetchAuthorsRequest());
      const response = await axiosApi.get('/artists');
      dispatch(fetchAuthorsSuccess(response.data));
    } catch (e) {
      dispatch(fetchAuthorsFailure());
    }
  };
};

export const fetchAuthor = (id) => {
  return async dispatch => {
    try {
      dispatch(fetchAuthorRequest());
      const response = await axiosApi.get('/artists?id=' + id);
      dispatch(fetchAuthorSuccess(response.data));
    } catch (e) {
      dispatch(fetchAuthorFailure());
    }
  };
};