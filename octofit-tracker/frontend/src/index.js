import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Ustawienie domyślnej zmiennej środowiskowej jeśli nie jest ustawiona
if (!process.env.REACT_APP_CODESPACE_URL) {
  // Przykład: https://nazwakodspace-8000.app.github.dev
  process.env.REACT_APP_CODESPACE_URL = window._env_?.REACT_APP_CODESPACE_URL || '';
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
