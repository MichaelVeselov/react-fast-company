import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { Router } from 'react-router-dom';
import history from './utils/history';

import 'bootstrap/dist/css/bootstrap.css';

import { createStore } from './store/createStore';

import App from './App';

const store = createStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
