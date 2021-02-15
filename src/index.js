import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import reducer, { initialState } from './context/reducer';
import { CartProvider } from './context/CartProvider';
// global.jQuery = require('jquery');
// require('popper.js');

ReactDOM.render(
  <CartProvider initialState={initialState} reducer={reducer}>
    <App />
  </CartProvider>,
  document.getElementById('root')
);
