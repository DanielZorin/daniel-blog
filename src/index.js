import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store.js'

ReactGA.initialize('G-W5VKV9FG1S');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
