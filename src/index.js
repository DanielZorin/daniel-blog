import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

import GA4React from "ga-4-react";
import LanguageManager from './components/language-manager.component.js';

const ga4react = new GA4React('G-W5VKV9FG1S');


(async () => {
  await ga4react.initialize();

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <LanguageManager />
          <App />
        </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
})();
