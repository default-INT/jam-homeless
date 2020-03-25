import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header'
import App from './App';
import * as serviceWorker from './serviceWorker';
import Menu from "./components/Menu";

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

 */

ReactDOM.render(
    <React.StrictMode>
        <Menu />
    </React.StrictMode>,
    document.getElementById('menu')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
