// components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
    <h2>Home Page</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Link to="/google-id-token">
        <button style={buttonStyle}>Google ID Token</button>
      </Link>
      <Link to="/okto-auth-token">
        <button style={buttonStyle}>Okto Auth Token</button>
      </Link>
      <Link to="/abi-encoder">
        <button style={buttonStyle}>ABI Encoder</button>
      </Link>
    </div>
  </div>
);

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Home;
