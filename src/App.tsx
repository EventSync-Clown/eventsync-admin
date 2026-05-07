import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SelectionPortal from './assets/pages/SelectionPortal';
import AdminApp from './assets/pages/LoginPage'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectionPortal />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;