import {
  CLEAR_ERROR_USER,
  LOGIN_USER_FAILURE, LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS, LOGOUT_USER,
} from "../actions/usersActions";

export const initialState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginError: null,
  loginLoading: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {...state, loginLoading: true}
    case LOGIN_USER_SUCCESS:
      return {...state, loginError: null, loginLoading: false, user: action.payload};
    case LOGIN_USER_FAILURE:
      return {...state, loginError: action.payload, loginLoading: false};
    case CLEAR_ERROR_USER:
      return {...state, registerError: null, loginError: null};
    case LOGOUT_USER:
      return {...state, user: null};
    default:
      return state;
  }
};

export default usersReducer;