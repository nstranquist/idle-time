import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from './store'
import 'bulma/css/bulma.css'
import 'bulma-switch/dist/css/bulma-switch.min.css'
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv'
dotenv.config()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
