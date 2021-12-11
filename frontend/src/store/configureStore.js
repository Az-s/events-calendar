import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import authorReducer from './reducers/authorReducer';
import albumReducer from './reducers/albumReducer';
import usersReducer from './reducers/usersREducer';
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axiosApi from "../axiosApi";


const rootReducer = combineReducers({
    authors: authorReducer,
    albums: albumReducer,
    users: usersReducer,
  });
  

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveToLocalStorage({
    users: store.getState().users,
  });
});

axiosApi.interceptors.request.use(config => {
  try {
    config.headers['Authorization'] = store.getState().users.user.token
  } catch (e) {}

  return config;
});

export default store;