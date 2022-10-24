import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from 'components/App';
import { ThemeProvider } from 'styled-components';
import { theme } from './constans';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);