import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import './styles/global.css';
import './styles/language-gate.css';

const App = lazy(() => import('./App.jsx'));

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="app-loader" aria-label="Đang tải trang">
          <span />
        </div>
      }
    >
      <App />
    </Suspense>
  </React.StrictMode>
);
