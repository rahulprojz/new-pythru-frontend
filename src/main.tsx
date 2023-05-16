import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
// import "rc-tree-select/assets/index.less";
// import "rc-tree-select/assets/index.css";

import Providers from './components/Hoc/providers/provider';
import Toaster from './components/toaster/toaster';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <ThemeProvider > */}
      <Providers>
        <Toaster />
        <App />
      </Providers>
    {/* </ThemeProvider> */}
  </React.StrictMode>
)
