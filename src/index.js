import ReactDOM from 'react-dom/client';
import React from 'react';
import { App } from 'components/App';
import './index.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/goit-react-hw-08-phonebook'>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);



