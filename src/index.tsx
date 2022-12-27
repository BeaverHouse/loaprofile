import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/reset.css';
import App from './App';
import ReactGA from "react-ga4";
import { LoaProvider } from './contexts';

ReactGA.initialize("G-NRVQ017P0B");
ReactGA.send("pageview");

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <LoaProvider>
        <App />
      </LoaProvider>
  </React.StrictMode>
);