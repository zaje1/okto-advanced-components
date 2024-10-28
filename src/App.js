// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import GoogleIDToken from './components/GoogleIDToken';
import OktoAuthToken from './components/OktoAuthToken';
import AbiEncoder from './components/AbiEncoder';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/google-id-token" element={<GoogleIDToken />} />
            <Route path="/okto-auth-token" element={<OktoAuthToken />} />
            <Route path="/abi-encoder" element={<AbiEncoder />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
