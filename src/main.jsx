// ============================================================
// main.jsx - Vite entry point
// This is the file Vite starts with.
// It mounts the React app into the <div id="root"> in index.html
// ============================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Mount the App component into #root div in index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
