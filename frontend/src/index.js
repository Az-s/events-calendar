import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import history from "./history";
import theme from './theme';
import store from './store/configureStore';
import App from './App';
import './index.css';

const app = (
  <Provider store={store}>
    <BrowserRouter history={history}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
