import {
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  GET_HISTORY_SUCCESS,
  LOGOUT_USER,
} from '../actions/usersActions';



const initialState = {
  registerError: null,
  loginError: null,
  loginLoading: false,
  user: null,
  history: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER_SUCCESS:
      return { ...state, user: action.payload, registerError: null };
    case SIGNUP_USER_FAILURE:
      return { ...state, registerError: action.payload };
    case LOGIN_USER_REQUEST:
      return { ...state, loginLoading: true }
    case LOGIN_USER_SUCCESS:
      return { ...state, loginError: null, loginLoading: false, user: action.payload };
    case LOGIN_USER_FAILURE:
      return { ...state, loginError: action.payload, loginLoading: false };
    case LOGOUT_USER:
      return { ...state, user: null };
    case GET_HISTORY_SUCCESS:
      return { ...state, history: action.history };
    default:
      return state;
  }
};

export default usersReducer;