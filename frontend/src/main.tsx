import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { FileProvider } from './components/ui/file/FileProvider';
import ListFiles from './pages/ListFiles';


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ListFiles />} />
        </Routes>
      </BrowserRouter>
    </FileProvider>
  </React.StrictMode>
);
