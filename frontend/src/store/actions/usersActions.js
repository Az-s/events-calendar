import axiosApi from "../../axiosApi";
import { historyPush } from './historyActions';
import { toast } from "react-toastify";

export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS';

export const signupUserSuccess = user => ({ type: SIGNUP_USER_SUCCESS, payload: user });
export const signupUserFailure = error => ({ type: SIGNUP_USER_FAILURE, payload: error });

export const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST });
export const loginUserSuccess = user => ({ type: LOGIN_USER_SUCCESS, payload: user });
export const loginUserFailure = error => ({ type: LOGIN_USER_FAILURE, payload: error });

const getHistorySuccess = history => ({ type: GET_HISTORY_SUCCESS, history });

export const SignUpUser = userData => {
    return async dispatch => {
        try {
            const response = await axiosApi.post('/users', userData);
            dispatch(signupUserSuccess(response.data));
            dispatch(historyPush('/'));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(signupUserFailure(error.response.data));
            } else {
                dispatch(signupUserFailure({ global: 'No internet' }));
            }
        }
    };
};

export const SignInUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data.user));
            dispatch(historyPush('/'));
            toast.success('Login successful');
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(loginUserFailure(error.response.data));
            } else {
                dispatch(loginUserFailure({ global: 'No internet' }));
            }
        }
    };
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const headers = {
            'Authorization': getState().users.user.token,
        };
        await axiosApi.delete('/users/sessions', { headers });
        dispatch({ type: LOGOUT_USER });
        dispatch(historyPush('/'));
    };
};

export const saveTrack = trackId => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            axiosApi.post('/tracks_history', { trackId: trackId }, { headers: { "Authorization": state.users.token } });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
            } else {
                dispatch(loginUserFailure({ global: "No network connection " }))
            }
        }
    };
};

export const getHistory = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const response = axiosApi.get('/tracks_history', { headers: { "Authorization": state.users.token } });
            dispatch(getHistorySuccess(response.data));
        } catch (error) {
            if (error.response) {
                dispatch(historyPush('/'));
            } else {
                dispatch(loginUserFailure({ global: "No network connection " }))
            }
        }
    };
};

export const facebookLogin = data => {
    return async dispatch => {
      try {
        const response = await axiosApi.post('/users/facebookLogin', data);
        dispatch(loginUserSuccess(response.data.user));
        dispatch(historyPush('/'));
        toast.success('Login successful');
      } catch (error) {
        toast.error(error.response.data.global);
        dispatch(loginUserFailure(error.response.data));
      }
    };
  };